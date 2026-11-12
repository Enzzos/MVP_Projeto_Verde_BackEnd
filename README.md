# Circuito Terê Verde — MVP BackEnd

Projeto acadêmico de uma plataforma de agendamento de trilhas ecológicas em Teresópolis/RJ.

---

## Estrutura do Projeto

```
├── backend/          # API REST (Node.js + Express)
│   ├── routes/
│   │   ├── auth.js           # Autenticação (registro/login)
│   │   └── agendamentos.js   # CRUD de agendamentos
│   ├── db.js                 # Conexão com PostgreSQL
│   ├── server.js             # Entrada da aplicação
│   └── schema.sql            # Estrutura do banco de dados
├── Projeto_MVP/      # Frontend (HTML/CSS/JS)
└── docs/             # Auditoria de segurança
```

---

## Tecnologias

- **Backend:** Node.js, Express, JWT, bcryptjs
- **Banco de dados:** PostgreSQL (Neon)
- **Frontend:** HTML, CSS, JavaScript puro

---

## Pré-requisitos

- Node.js 18+
- PostgreSQL (ou conta no [Neon](https://neon.tech))

---

## Configuração

1. Clone o repositório
2. Crie o arquivo `.env.local` na raiz com as variáveis:

```env
DATABASE_URL=sua_connection_string_postgresql
JWT_SECRET=sua_chave_secreta
PORT=3000
```

3. Execute o schema no banco:

```bash
psql -d seu_banco -f backend/schema.sql
```

---

## Rodando o BackEnd

```bash
cd backend
npm install
npm run dev     # desenvolvimento (nodemon)
npm start       # produção
```

A API ficará disponível em `http://localhost:3000`.

---

## Endpoints da API

### Autenticação — `/api/auth`

| Método | Rota        | Descrição              |
| ------ | ----------- | ---------------------- |
| POST   | `/register` | Cadastro de usuário    |
| POST   | `/login`    | Login e geração de JWT |

| PUT    | `/usuarios/:id/senha` | Atualiza senha do usuário  |

### Agendamentos — `/api/agendamentos`

| Método | Rota   | Descrição                   |
| ------ | ------ | --------------------------- |
| GET    | `/`    | Lista todos os agendamentos |
| POST   | `/`    | Cria novo agendamento       |
| PUT    | `/:id` | Atualiza agendamento        |
| DELETE | `/:id` | Remove agendamento          |

---

## Equipe

- Enzzo Rodrigues Fadiga (06015368)
- Matheus Victor Veríssimo de Jesus (06013169)
