// Teste do Model SEM HTTP: sem Express, sem requisição, sem banco.
// Roda com: npm test
const test = require('node:test');
const assert = require('node:assert');
const Visita = require('../models/visita');

const visita = (imovelId, corretor, inicio, duracaoMin) =>
  new Visita({ imovelId, corretor, inicio, duracaoMin });

test('recusa visita que bate com outra no mesmo imóvel', () => {
  const a = visita(1, 'Ana', '2026-10-20T10:00');
  const b = visita(1, 'Leo', '2026-10-20T10:30');
  assert.strictEqual(b.cabeNa([a]), false);
});

test('aceita o mesmo horário em outro imóvel', () => {
  const a = visita(1, 'Ana', '2026-10-20T10:00');
  const c = visita(2, 'Leo', '2026-10-20T10:30');
  assert.strictEqual(c.cabeNa([a]), true);
});

test('aceita visita que começa exatamente quando a outra termina', () => {
  const a = visita(1, 'Ana', '2026-10-20T10:00'); // termina 11:00
  const b = visita(1, 'Leo', '2026-10-20T11:00');
  assert.strictEqual(b.cabeNa([a]), true);
});

test('aceita visita em agenda vazia', () => {
  const a = visita(1, 'Ana', '2026-10-20T10:00');
  assert.strictEqual(a.cabeNa([]), true);
});
