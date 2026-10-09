const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
    const { nome, email, login, telefone, senha } = req.body;
    if (!nome || !email || !login || !senha) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
    }

    try {
        const hash = await bcrypt.hash(senha, 10);
        const result = await pool.query(
            'INSERT INTO usuarios (nome, email, login, telefone, senha) VALUES ($1,$2,$3,$4,$5) RETURNING id, nome, email, login, telefone, created_at',
            [nome, email, login, telefone, hash]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Email ou login já cadastrado.' });
        }
        res.status(500).json({ error: 'Erro interno.' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { login, senha } = req.body;

    // Login admin fixo
    if (login === 'admin' && senha === process.env.ADMIN_PASSWORD || (login === 'admin' && senha === 'admin123')) {
        const token = jwt.sign({ type: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' });
        return res.json({ type: 'admin', token });
    }

    try {
        const result = await pool.query(
            'SELECT * FROM usuarios WHERE login=$1 OR email=$1',
            [login]
        );
        const user = result.rows[0];
        if (!user) return res.status(401).json({ error: 'Credenciais inválidas.' });

        const valid = await bcrypt.compare(senha, user.senha);
        if (!valid) return res.status(401).json({ error: 'Credenciais inválidas.' });

        const token = jwt.sign({ type: 'user', id: user.id, nome: user.nome }, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.json({ type: 'user', token, user: { id: user.id, nome: user.nome, email: user.email, login: user.login, telefone: user.telefone } });
    } catch (err) {
        res.status(500).json({ error: 'Erro interno.' });
    }
});

// GET /api/auth/usuarios  (admin only)
router.get('/usuarios', async (req, res) => {
    const auth = req.headers.authorization?.split(' ')[1];
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        if (decoded.type !== 'admin') return res.status(403).json({ error: 'Acesso negado.' });

        const result = await pool.query('SELECT id, nome, email, login, telefone, created_at FROM usuarios ORDER BY created_at DESC');
        res.json(result.rows);
    } catch {
        res.status(401).json({ error: 'Token inválido.' });
    }
});

// DELETE /api/auth/usuarios/:id  (admin only)
router.delete('/usuarios/:id', async (req, res) => {
    const auth = req.headers.authorization?.split(' ')[1];
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        if (decoded.type !== 'admin') return res.status(403).json({ error: 'Acesso negado.' });

        await pool.query('DELETE FROM usuarios WHERE id=$1', [req.params.id]);
        res.json({ success: true });
    } catch {
        res.status(401).json({ error: 'Token inválido.' });
    }
});

module.exports = router;
