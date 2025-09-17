const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));


// Health
app.get('/health', (req, res) => res.json({ ok: true }));


// In‑memory mock DB (will be replaced by feature/database-connection)
const db = { users: [{ id: 1, email: 'demo@example.com', password: 'pass123' }] };


// Basic API (will be expanded by feature/api-endpoints)
app.get('/api/users', (req, res) => res.json(db.users));
const { requireFields } = require('./validators');
app.post('/api/echo', (req, res) => {
try { requireFields(req.body, 'message'); }
catch(err){ return res.status(400).json({ ok:false, error: err.message }); }
res.json({ ok:true, echo: req.body.message });
});

// Basic auth handler (will be replaced by feature/user-authentication)
const { Users, seedUsers } = require('./db');
const users = new Users(seedUsers);
app.get('/api/users', (req, res) => res.json(users.all()));
app.post('/auth/login', (req, res) => {
const { email, password } = req.body;
const u = users.byEmail(email);
if (u && u.password === password) return res.json({ ok: true, user: { id: u.id, email: u.email } });
return res.status(401).json({ ok: false, error: 'Invalid credentials' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Additional API routes (feature/api-endpoints)
app.get('/api/healthz', (req, res) => res.json({ status: 'ok', ts: Date.now() }));
app.get('/api/version', (req, res) => res.json({ version: '1.0.0' }));