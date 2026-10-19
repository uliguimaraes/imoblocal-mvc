// CONTROLLER: recebe a requisição, valida o FORMATO, delega ao Model
// e escolhe a View. A regra de negócio (conflito de horário) NÃO fica aqui.
const Visita = require('../models/visita');
const repo = require('../repositories/visitaRepo');
const imovelRepo = require('../repositories/imovelRepo');

function renderNova(res, status, erro, valores = {}) {
  return res.status(status).render('visitas/nova', {
    erro,
    valores,
    imoveis: imovelRepo.todos(),
  });
}

exports.nova = (req, res) => {
  renderNova(res, 200, null);
};

exports.listar = async (req, res) => {
  const visitas = await repo.todas();
  res.render('visitas/lista', { visitas });
};

exports.criar = async (req, res) => {
  const { imovelId, corretor, inicio, duracaoMin } = req.body;

  // Validação de FORMATO (campo vazio, data inválida): Controller
  if (!imovelId || !corretor || isNaN(Date.parse(inicio))) {
    return renderNova(res, 400, 'Dados inválidos.', req.body);
  }

  const nova = new Visita({
    imovelId,
    corretor,
    inicio,
    duracaoMin: Number(duracaoMin) || 60,
  });

  // Regra de NEGÓCIO (conflito de horário): Model decide
  const agenda = await repo.porImovel(nova.imovelId);
  if (!nova.cabeNa(agenda)) {
    return renderNova(res, 409, 'Horário ocupado.', req.body);
  }

  await repo.salvar(nova);
  res.redirect('/visitas');
};
