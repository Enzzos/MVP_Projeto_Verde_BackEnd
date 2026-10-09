const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

// POST /api/agendamentos
router.post('/', async (req, res) => {
    const { nome, email, telefone, pessoas, data, trilha, horario, preco } = req.body;
    if (!nome || !email || !data || !trilha || !horario) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO agendamentos (nome, email, telefone, pessoas, data, trilha, horario, preco) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
            [nome, email, telefone, pessoas || 1, data, trilha, horario, preco]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro interno.' });
    }
});

// GET /api/agendamentos  (admin only)
router.get('/', async (req, res) => {
    const auth = req.headers.authorization?.split(' ')[1];
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        if (decoded.type !== 'admin') return res.status(403).json({ error: 'Acesso negado.' });

        const result = await pool.query('SELECT * FROM agendamentos ORDER BY data_reserva DESC');
        res.json(result.rows);
    } catch {
        res.status(401).json({ error: 'Token inválido.' });
    }
});

// DELETE /api/agendamentos/:id  (admin only)
router.delete('/:id', async (req, res) => {
    const auth = req.headers.authorization?.split(' ')[1];
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        if (decoded.type !== 'admin') return res.status(403).json({ error: 'Acesso negado.' });

        await pool.query('DELETE FROM agendamentos WHERE id=$1', [req.params.id]);
        res.json({ success: true });
    } catch {
        res.status(401).json({ error: 'Token inválido.' });
    }
});

module.exports = router;
