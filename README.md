<div align="center">

# 🍷 World Wines

### Uma experiência para descobrir, conhecer e escolher bons vinhos.

Loja virtual desenvolvida em **Angular 22**, com catálogo de vinhos, detalhes dos produtos, carrinho e integração com **Supabase**.

<br>

`Angular 22` · `Signals` · `Tailwind CSS 4` · `Supabase` · `HttpClient`

</div>

---

## ✨ Sobre o projeto

O **World Wines** reúne uma vitrine de vinhos tintos, brancos e rosés. A aplicação permite consultar os produtos, ver seus detalhes, adicionar itens ao carrinho e cadastrar ou remover vinhos.

O projeto foi organizado para praticar os principais recursos do Angular: componentes, templates, rotas, serviços, formulários reativos e estado com Signals.

## 🧭 O que você encontra

| Área | O que faz |
|---|---|
| **Vitrine** | Exibe os vinhos e permite navegar por categoria. |
| **Detalhes** | Apresenta as informações completas de um vinho. |
| **Carrinho** | Mantém os itens selecionados e atualiza quantidade e total. |
| **Cadastro** | Cadastra um vinho com imagem, descrição, preço, categoria e região. |
| **Supabase** | Armazena os produtos e as imagens enviadas pelo formulário. |

## 🛠️ Tecnologias

- **Angular 22** — componentes standalone e navegação por rotas
- **Signals** — estado do catálogo e do carrinho
- **Reactive Forms** — formulário de cadastro com validações
- **HttpClient** — comunicação assíncrona com a API REST
- **Supabase Database** — persistência dos produtos
- **Supabase Storage** — armazenamento das imagens
- **Tailwind CSS 4** — estilos utilitários nos templates

## 🚀 Começar

### Pré-requisitos

- Node.js compatível com Angular 22
- npm
- Um projeto Supabase

### Instalação

No terminal, dentro da pasta do projeto, execute:

```bash
npm install
npm start
```

A aplicação estará disponível em **http://localhost:4200/**.

Para gerar a versão de produção:

```bash
npm run build
```

## 🔌 Configurar o Supabase

As credenciais e URLs ficam em `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  supabaseUrl: 'https://SEU-PROJETO.supabase.co',
  supabasePublishableKey: 'SUA_CHAVE_PUBLICAVEL',
  supabaseStorageBucket: 'imagens-projeto',
  supabaseStorageUrl:
    'https://SEU-PROJETO.supabase.co/storage/v1/object/public/imagens-projeto',
};
```

Troque os valores de exemplo pelos dados do seu projeto. No frontend, use a chave publicável/anon. **Nunca coloque a chave `service_role` no código Angular.**

Depois, no painel do Supabase:

1. Abra **SQL Editor**.
2. Execute o conteúdo de [`supabase/schema.sql`](supabase/schema.sql).
3. Confira se a tabela `products` e o bucket `imagens-projeto` foram criados.

O script prepara a tabela, o bucket, as políticas de acesso e os produtos iniciais. O formulário envia imagens JPG, PNG ou WebP de até **5 MB** para `wines/` no Storage e depois grava os dados do vinho na tabela.

> **Atenção:** o cadastro está disponível sem tela de login, e as políticas do script permitem operações anônimas para a demonstração. Para publicar o projeto em uso real, restrinja o cadastro, a remoção e o envio de imagens com autenticação e políticas RLS adequadas.

## 🔄 Requisições e estado

| Operação | Uso no projeto |
|---|---|
| **GET** | Busca os produtos da tabela `products`. |
| **POST** | Cadastra um produto após enviar sua imagem ao Storage. |
| **DELETE** | Remove um produto da tabela. |
| **Signals** | Atualizam catálogo, carregamento, mensagens e carrinho. |
| **Local Storage** | Mantém o carrinho salvo no navegador. |

As chamadas HTTP ficam centralizadas em `src/app/services/database.ts`. A lógica do catálogo fica em `wine.service.ts`, e o estado do carrinho em `cart.service.ts`.

## 🗺️ Rotas

| Caminho | Página |
|---|---|
| `/` | Vitrine completa |
| `/red` | Vinhos tintos |
| `/white` | Vinhos brancos |
| `/rose` | Vinhos rosés |
| `/vinhos/:id` | Detalhes do vinho |
| `/carrinho` | Carrinho |
| `/pagamento` | Pagamento |
| `/admin/vinhos/novo` | Cadastro e remoção de vinhos |

## 📁 Estrutura do projeto

```text
src/
├── app/
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app.ts
│   ├── app.html
│   ├── components/
│   │   ├── container-wines/
│   │   ├── wine-card/
│   │   ├── wine-detail/
│   │   ├── wine-form/
│   │   ├── cart-button/
│   │   └── cart-sidebar/
│   ├── models/
│   └── services/
│       ├── database.ts
│       ├── wine.service.ts
│       └── cart.service.ts
├── environments/
│   └── environment.ts
├── main.ts
└── styles.css
supabase/
└── schema.sql
```

As imagens de produtos e imagens decorativas referenciadas pelos templates são carregadas a partir do Supabase Storage, usando `supabaseStorageUrl`. A pasta `public/` também está configurada no Angular para arquivos estáticos.

---

<div align="center">

**World Wines** · Projeto acadêmico de desenvolvimento web

</div>
