const path = require('path');
const express = require('express');
const ctrl = require('./controllers/visitaController');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas: ligam a URL ao Controller
app.get('/', (req, res) => res.redirect('/visitas'));
app.get('/visitas', ctrl.listar);
app.get('/visitas/nova', ctrl.nova);
app.post('/visitas', ctrl.criar);

const PORT = process.env.PORT || 3000;

// Só sobe o servidor quando executado direto (node app.js),
// assim o app pode ser importado em testes sem abrir porta.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`ImóbLocal rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;
