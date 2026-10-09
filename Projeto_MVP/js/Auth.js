const API_URL = 'https://mvp-projeto-verde-backend.onrender.com/api';

function getToken() { return sessionStorage.getItem('token'); }
function getTokenType() { return sessionStorage.getItem('tokenType'); }
function getCurrentUser() { return JSON.parse(sessionStorage.getItem('currentUser') || 'null'); }

function isAdminLoggedIn() { return getTokenType() === 'admin'; }
function isUserLoggedIn() { return getTokenType() === 'user'; }

async function login(username, password) {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login: username, senha: password })
        });
        const data = await res.json();
        if (!res.ok) return { success: false };

        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('tokenType', data.type);
        if (data.user) sessionStorage.setItem('currentUser', JSON.stringify(data.user));

        return { success: true, type: data.type, user: data.user };
    } catch {
        return { success: false };
    }
}

function logoutAdmin() {
    sessionStorage.clear();
    toggleAdminLink();
    updateLoginInterface();
}

function logoutUser() {
    sessionStorage.clear();
    updateLoginInterface();
}

async function createUser(nome, email, login, telefone, senha) {
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, login, telefone, senha })
        });
        return res.ok;
    } catch {
        return false;
    }
}

function toggleAdminLink() {
    const adminLink = document.getElementById('admin-link');
    if (adminLink) {
        adminLink.style.display = isAdminLoggedIn() ? 'block' : 'none';
    }
}

function updateLoginInterface() {
    const navLogin = document.querySelector('.nav_login');
    if (!navLogin) return;

    if (isAdminLoggedIn()) {
        navLogin.innerHTML = `
            <div style="display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,rgba(56,161,105,.15),rgba(167,243,208,.1));padding:8px 16px;border-radius:25px;border:1px solid rgba(167,243,208,.3);">
                <div style="display:flex;align-items:center;gap:6px;">
                    <div style="width:8px;height:8px;background:#10b981;border-radius:50%;box-shadow:0 0 6px #10b981;"></div>
                    <span style="color:#a7f3d0;font-weight:700;font-size:.9rem;">Administrador</span>
                </div>
                <button onclick="logoutAdmin()" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;padding:6px 12px;border-radius:15px;font-size:.8rem;font-weight:600;cursor:pointer;">Sair</button>
            </div>`;
    } else if (isUserLoggedIn()) {
        const user = getCurrentUser();
        navLogin.innerHTML = `
            <div style="display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,rgba(255,107,53,.15),rgba(255,165,0,.1));padding:8px 16px;border-radius:25px;border:1px solid rgba(255,165,0,.3);">
                <div style="display:flex;align-items:center;gap:6px;">
                    <div style="width:8px;height:8px;background:#ff6b35;border-radius:50%;box-shadow:0 0 6px #ff6b35;"></div>
                    <span style="color:#ff6b35;font-weight:700;font-size:.9rem;">${user?.nome || 'Usuário'}</span>
                </div>
                <button onclick="logoutUser()" style="background:linear-gradient(135deg,#ef4444,#dc2626);color:white;border:none;padding:6px 12px;border-radius:15px;font-size:.8rem;font-weight:600;cursor:pointer;">Sair</button>
            </div>`;
    } else {
        const currentPath = window.location.pathname;
        const isSubProject = currentPath.includes('Sub_Projects');
        const createAccountPath = isSubProject ? 'CriarConta.html' : 'Sub_Projects/CriarConta.html';
        navLogin.innerHTML = `
            <form class="login_form" id="login-form">
                <input type="text" placeholder="Login" class="login_input" id="username">
                <input type="password" placeholder="Senha" class="login_input" id="password">
                <button type="submit" class="login_button">Entrar</button>
                <button type="button" class="create_account_button" onclick="window.location.href='${createAccountPath}'">Criar Conta</button>
            </form>`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    toggleAdminLink();
    updateLoginInterface();
});
