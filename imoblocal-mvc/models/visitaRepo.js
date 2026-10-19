// Acesso a dados (camada extra, fora do MVC da aula).
// Em memória para a demonstração; no ImóbLocal real seria o PostgreSQL.
const Visita = require('./visita');

const imoveis = [
  { id: '1', endereco: 'Apto 302, Centro' },
  { id: '2', endereco: 'Casa, Praia Grande' },
  { id: '3', endereco: 'Sala comercial, Av. Central' }
];

const visitas = [
  // visita de exemplo para demonstrar o conflito: imóvel 1, 20/10, 10:00 às 11:00
  new Visita({ imovelId: '1', corretor: 'Ana', inicio: '2026-10-20T10:00' })
];

async function porImovel(imovelId) {
  return visitas.filter(v => v.imovelId === String(imovelId));
}

async function salvar(visita) {
  visitas.push(visita);
}

async function todas() {
  return [...visitas].sort((a, b) => a.inicio - b.inicio);
}

module.exports = { imoveis, porImovel, salvar, todas };
