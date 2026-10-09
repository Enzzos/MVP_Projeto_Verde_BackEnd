-- Criar banco de dados (execute separadamente se necessário)
-- CREATE DATABASE circuito_tere_verde;

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    login VARCHAR(80) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    senha VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS agendamentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(20),
    pessoas INTEGER NOT NULL DEFAULT 1,
    data DATE NOT NULL,
    trilha VARCHAR(150) NOT NULL,
    horario VARCHAR(10) NOT NULL,
    preco VARCHAR(20),
    status VARCHAR(30) DEFAULT 'confirmado',
    data_reserva TIMESTAMP DEFAULT NOW()
);
