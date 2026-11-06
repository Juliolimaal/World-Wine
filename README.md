# World Wines Web — Angular 22

Migração acadêmica da loja World Wines Web para Angular 22. A organização dos componentes segue a estrutura pedida: `container-wines`, `wine-card`, `wine-detail`, `wine-form`, `cart-button` e `cart-sidebar`. Cada pasta contém arquivos `.ts`, `.html`, `.css` e `.spec.ts`.

## Executar

1. Instale Node.js 22 ou superior.
2. Nesta pasta, rode `npm install`.
3. Inicie o projeto com `npm start` e abra o endereço local exibido pelo Angular.
4. Para executar os testes de componentes, use `npm test`.

As imagens do projeto estão em `public/images` e são servidas localmente. O Tailwind CSS 4 está configurado com PostCSS e é utilizado diretamente nos templates. Os estados da vitrine e do carrinho usam Signals, e os formulários usam Reactive Forms.

## Supabase

Edite `src/environments/environment.ts` e informe a URL do projeto e a chave pública (`publishable` ou `anon`) do Supabase. Nunca use a `service_role` no navegador.

O serviço consulta a tabela `products` usando `GET`, cadastra com `POST` e remove com `DELETE` por meio do `HttpClient`, seguindo o padrão do serviço `database.ts` do exemplo Angular do professor. A tabela deve ter campos compatíveis com `id`, `name`, `price`, `category`, `image`, `subtitle`, `description` e `region`. O POST e o DELETE precisam de políticas RLS apropriadas.

Sem URL e chave do Supabase, o projeto carrega cinco vinhos de demonstração, com imagens locais e preços. Com o Supabase configurado, os registros do banco atualizam os rótulos correspondentes e produtos novos são acrescentados ao catálogo; os vinhos de demonstração continuam disponíveis para a apresentação. Cadastro e remoção funcionam localmente nessa demonstração, sem persistência no banco.

## Rotas

- `/`: vitrine
- `/red`, `/white` e `/rose`: vitrine filtrada por categoria
- `/vinhos/:id`: detalhes do vinho
- `/carrinho`: carrinho
- `/pagamento`: formulário de demonstração sem cobrança
- `/admin/vinhos/novo`: cadastro e remoção do catálogo
