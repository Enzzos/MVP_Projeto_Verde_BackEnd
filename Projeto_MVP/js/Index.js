// Função para adicionar evento de clique na logo
function addLogoClickEvent() {
    const logos = document.querySelectorAll('.logo_Dedo_Deus, .nav-logo img, .nav_logo img');
    
    logos.forEach(logo => {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function() {
            const currentPath = window.location.pathname;
            const isSubProject = currentPath.includes('Sub_Projects');
            
            if (isSubProject) {
                window.location.href = '../Index.html';
            } else {
                window.location.href = 'Index.html';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav_toggle');
    const navContent = document.getElementById('nav_content');
    
    if (navToggle && navContent) {
        navToggle.addEventListener('click', () => {
            navContent.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav_menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navContent) navContent.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    });
    
    // Controlar active nos links de navegação
    document.querySelectorAll('.nav_menu a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav_menu a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Adicionar evento de clique na logo
    addLogoClickEvent();
});
/* marca D'agua Fnsso F4jiga */
// Sistema de login
document.addEventListener('click', function(e) {
    if (e.target && e.target.matches('.login_button')) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const result = login(username, password);
        if (result.success) {
            if (result.type === 'admin') {
                alert('Login de administrador realizado com sucesso!');
            } else {
                alert(`Bem-vindo, ${result.user.nome}!`);
            }
            toggleAdminLink();
            updateLoginInterface();
        } else {
            alert('Credenciais inválidas!');
        }
    }
});

// Prevenir submit do formulário
document.addEventListener('submit', function(e) {
    if (e.target && e.target.matches('#login-form')) {
        e.preventDefault();
    }
});
