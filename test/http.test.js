// Teste de integração: passa pelo Controller via HTTP (rota -> Controller -> Model -> View).
const test = require('node:test');
const assert = require('node:assert');
const app = require('../app');
const repo = require('../repositories/visitaRepo');

function post(base, dados) {
  return fetch(`${base}/visitas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(dados),
    redirect: 'manual',
  });
}

test('fluxo HTTP: 400 formato inválido, 302 sucesso, 409 conflito', async () => {
  await repo.limpar();
  const server = app.listen(0);
  const base = `http://127.0.0.1:${server.address().port}`;

  try {
    const invalida = await post(base, { imovelId: '1', corretor: 'Ana', inicio: 'lixo' });
    assert.strictEqual(invalida.status, 400);

    const ok = await post(base, { imovelId: '1', corretor: 'Ana', inicio: '2026-10-20T10:00', duracaoMin: '60' });
    assert.strictEqual(ok.status, 302);

    const conflito = await post(base, { imovelId: '1', corretor: 'Leo', inicio: '2026-10-20T10:30', duracaoMin: '60' });
    assert.strictEqual(conflito.status, 409);
    assert.match(await conflito.text(), /Horário ocupado/);

    const lista = await fetch(`${base}/visitas`);
    assert.strictEqual(lista.status, 200);
    assert.match(await lista.text(), /Ana/);
  } finally {
    server.close();
  }
});
