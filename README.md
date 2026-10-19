# ImóbLocal MVC

Agenda de visitas com conflito de horário, feita com **Express + EJS** (Node.js) para a apresentação de MVC da disciplina de Arquitetura de Software (ULBRA Campus Torres).

Autores: Ulisses Guimarães e Leonardo Borba

## Estrutura (onde mora cada parte)

```
imoblocal-mvc/
  app.js                       rotas: liga a URL ao Controller
  controllers/
    visitaController.js        CONTROLLER (valida formato, chama o Model, escolhe a View)
  models/
    visita.js                  MODEL (dados + regra de conflito de horário)
  repositories/
    visitaRepo.js              acesso a dados (camada extra, fora do MVC da aula)
    imovelRepo.js              lista de imóveis de exemplo
  views/visitas/
    nova.ejs                   VIEW: formulário
    lista.ejs                  VIEW: agenda
  public/style.css
  test/
    visita.test.js             testa o Model sem HTTP
    http.test.js               testa o fluxo completo via HTTP (400, 302, 409)
```

## Como rodar

Pré-requisito: Node.js 18 ou superior.

```bash
npm install
npm start
```

Abra http://localhost:3000

Para rodar os testes:

```bash
npm test
```

## Como ver a regra funcionando

1. Em `/visitas/nova`, agende o Imóvel 1 em 20/10/2026 às 10:00 (60 min). Redireciona para a agenda.
2. Tente agendar o Imóvel 1 em 20/10/2026 às 10:30. A tela mostra "Horário ocupado." e o servidor responde **409**.
3. Agende o Imóvel 2 às 10:30. Funciona, porque o conflito só vale no mesmo imóvel.

## Sobre o MVC aqui

- **Model** (`models/visita.js`): guarda a visita e decide se ela cabe na agenda (`conflitaCom`, `cabeNa`).
- **View** (`views/visitas/*.ejs`): só exibe o que o Controller manda.
- **Controller**: valida o formato (campo vazio, data inválida), delega ao Model e escolhe a View (400, 409 ou redirect).
- **Repositório**: camada extra que o MVC da aula não nomeia. O Model não fala com o banco.
- O Express não impõe MVC: a organização em pastas é convenção do projeto.
