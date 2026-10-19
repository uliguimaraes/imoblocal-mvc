// MODEL: dados + comportamento (a regra de conflito de horário).
// Não conhece Express, req/res nem banco de dados.
class Visita {
  constructor({ imovelId, corretor, inicio, duracaoMin = 60 }) {
    this.imovelId = Number(imovelId);
    this.corretor = corretor;
    this.inicio = new Date(inicio);
    this.duracaoMin = duracaoMin;
    this.fim = new Date(this.inicio.getTime() + duracaoMin * 60000);
  }

  // Duas visitas conflitam se são no mesmo imóvel e os intervalos se sobrepõem.
  conflitaCom(outra) {
    return (
      this.imovelId === outra.imovelId &&
      this.inicio < outra.fim &&
      outra.inicio < this.fim
    );
  }

  // A visita cabe na agenda se não conflita com nenhuma já marcada.
  cabeNa(agenda) {
    return !agenda.some((v) => this.conflitaCom(v));
  }
}

module.exports = Visita;
