const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '32kb' }));

// the app itself
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1h' }));

// Render health check
app.get('/healthz', (_req, res) => res.type('text/plain').send('ok'));

// leads land here. Right now they go to the Render logs, which is enough to prove
// the wiring end to end. Forwarding to email or a CRM is a change to this handler
// only, nothing in the front end has to move.
app.post('/lead', (req, res) => {
  const b = req.body || {};
  if (!b.email || !b.company) return res.status(400).json({ ok: false });
  console.log('[LEAD] ' + JSON.stringify({
    at: b.at, name: (b.firstName || '') + ' ' + (b.surname || ''), email: b.email,
    company: b.company, role: b.role, route: b.route, verdict: b.verdict,
    weakest: b.weakestArea + ' ' + b.weakestScore, gaps: b.gaps,
    goal: b.goal, firstMove: b.firstMove
  }));
  res.json({ ok: true });
});

// single page app: anything else serves the check
app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, '0.0.0.0', () => console.log('listening on ' + PORT));
