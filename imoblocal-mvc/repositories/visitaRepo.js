// REPOSITÓRIO: acesso a dados (fora do MVC da aula, é uma camada extra).
// Aqui é em memória; num projeto real seria um banco de dados.
// Por ficar fora de models/, deixa claro que o Model não fala com o banco.
const visitas = [];

exports.todas = async () => [...visitas];

exports.porImovel = async (imovelId) =>
  visitas.filter((v) => v.imovelId === Number(imovelId));

exports.salvar = async (visita) => {
  visitas.push(visita);
  return visita;
};

// Usado nos testes para começar sempre com a agenda vazia.
exports.limpar = async () => {
  visitas.length = 0;
};
