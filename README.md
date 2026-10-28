# World Wine

Projeto da disciplina de Programação Web desenvolvido em Angular 21+.

Esta etapa organiza somente as pastas e a divisão das tarefas. Nenhum componente visual, página, serviço ou integração foi implementado nesta reorganização.

## Estrutura de trabalho

```text
src/
  app/
    components/
      header/
      footer/
      hero/
      product-card/
      cart-sidebar/
    pages/
      home/
      catalog/
      cart/
      checkout/
      admin/
    services/
    models/
    app.ts
    app.html
    app.scss
    app.config.ts
    app.routes.ts
  main.ts
  styles.scss
public/
  images/
```

As pastas novas contêm somente arquivos `.gitkeep`, para que o Git consiga mantê-las vazias.

## Divisão para três integrantes

### Pessoa 1 — Interface e navegação
- Implementar Header, Footer, Hero e ProductCard.
- Organizar as páginas Home e Catálogo.
- Configurar rotas e templates das páginas.
- Manter o visual do projeto original quando a implementação começar.

**Requisitos principais:** Components, Templates e Rotas.

### Pessoa 2 — Carrinho e checkout
- Implementar CartSidebar, página Carrinho e página Checkout.
- Usar Signals para o estado do carrinho.
- Criar um serviço para gerenciar itens, quantidades e total.
- Implementar os formulários do checkout.

**Requisitos principais:** Signals, Services e Formulários.

### Pessoa 3 — Supabase e operações HTTP
- Criar os modelos dos dados em `models/`.
- Criar os serviços de acesso a dados em `services/`.
- Integrar Supabase usando HttpClient.
- Implementar GET, POST e DELETE.
- Organizar a página Admin para demonstrar as operações, com acesso protegido.

**Requisitos principais:** Services e HttpClient (GET, POST e DELETE) com Supabase.

## Execução local

```bash
npm install
npm start
```

A versão inicial do Angular foi preservada. As funcionalidades descritas acima são tarefas futuras.
