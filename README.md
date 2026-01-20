# Cortex Bank - Microfrontend de Autenticação

## Sobre o Projeto

Este projeto faz parte do trabalho de pós-graduação em Engenharia de Software Frontend e consiste em um **microfrontend de autenticação** para o sistema Cortex Bank. O módulo é responsável por gerenciar o fluxo de login e cadastro de usuários, integrando-se a uma arquitetura de microfrontends utilizando Single-SPA.

## Arquitetura

Este microfrontend foi desenvolvido seguindo os princípios de **Micro Frontends**, utilizando a biblioteca **Single-SPA** para integração com outros módulos da aplicação. A arquitetura permite que este módulo seja desenvolvido, testado e deployado de forma independente, mantendo a capacidade de se integrar perfeitamente com outros microfrontends do sistema.

### Características da Arquitetura

- **Isolamento**: Desenvolvido de forma independente com suas próprias dependências
- **Integração**: Utiliza Single-SPA para comunicação com o shell application
- **Reutilização**: Componentes e lógica podem ser compartilhados via design system
- **Escalabilidade**: Facilita a manutenção e evolução do módulo

## Tecnologias Utilizadas

- **React 19.2.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Single-SPA** - Framework para construção de microfrontends
- **Webpack 5** - Bundler e ferramenta de build
- **CSS Modules** - Estilização com escopo local
- **Design System** - `@grupo10-pos-fiap/design-system` para componentes reutilizáveis
- **ESLint & Prettier** - Ferramentas de qualidade de código

## Estrutura do Projeto

```
auth/
├── src/
│   ├── assets/              # Imagens e recursos estáticos
│   ├── components/          # Componentes React reutilizáveis
│   │   ├── LoginForm.tsx
│   │   ├── SignUpForm.tsx
│   │   ├── EmailInput.tsx
│   │   ├── PasswordInput.tsx
│   │   └── ...
│   ├── hooks/               # Custom hooks
│   │   ├── useLoginForm.ts
│   │   └── useSignUpForm.ts
│   ├── pages/               # Páginas principais
│   │   ├── Login.tsx
│   │   └── SignUp.tsx
│   ├── services/            # Serviços de API
│   │   └── authService.ts
│   ├── types/               # Definições de tipos TypeScript
│   ├── utils/               # Funções utilitárias
│   │   └── validation.ts
│   └── cortex-bank-auth.tsx # Entry point do microfrontend
├── public/                  # Arquivos públicos
├── webpack.config.cjs       # Configuração do Webpack
├── tsconfig.json           # Configuração do TypeScript
├── package.json            # Dependências e scripts
└── Dockerfile              # Configuração Docker
```

## Instalação

### Pré-requisitos

- Node.js (versão 22 ou superior)

### Passos para Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd auth
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente para desenvolvimento local (crie um arquivo `.env` na raiz do projeto):

```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_REDIRECT_URL=http://localhost:3000/dashboard
```

> **Nota**: O arquivo `.env` é utilizado apenas para desenvolvimento local. Em produção, as variáveis de ambiente são configuradas diretamente na plataforma Vercel por questões de segurança. Veja a seção [Configuração](#-configuração) para mais detalhes.

## Configuração

### Variáveis de Ambiente

O projeto utiliza as seguintes variáveis de ambiente:

- `REACT_APP_API_URL`: URL base da API de autenticação (padrão: `http://localhost:3000`)
- `REACT_APP_REDIRECT_URL`: URL de redirecionamento após login bem-sucedido (padrão: `http://localhost:3000/dashboard`)

#### Importante: Segurança de Variáveis de Ambiente

**Para desenvolvimento local**, você pode criar um arquivo `.env` na raiz do projeto:

```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_REDIRECT_URL=http://localhost:3000/dashboard
```

**Para produção**, a aplicação está hospedada na **Vercel** e as variáveis de ambiente são configuradas diretamente na plataforma, **não utilizando arquivos `.env`**. Esta é uma prática de segurança essencial que:

- **Evita exposição de credenciais**: Arquivos `.env` não são versionados no repositório, mas podem ser acidentalmente commitados
- **Centraliza configuração**: Variáveis sensíveis são gerenciadas de forma segura na plataforma de hospedagem
- **Facilita gestão**: Permite diferentes valores para diferentes ambientes (staging, produção) sem alterar código
- **Segue melhores práticas**: Alinha-se com os requisitos de segurança para aplicações em produção

As variáveis de ambiente na Vercel são configuradas através do painel administrativo da plataforma e são injetadas durante o processo de build, garantindo que informações sensíveis não sejam expostas no código-fonte ou no bundle da aplicação.

### Configuração do Single-SPA

O microfrontend está configurado para ser registrado no Single-SPA com:

- **Organização**: `cortex-bank`
- **Nome do Projeto**: `auth`
- **Porta de Desenvolvimento**: `3005`

## Scripts Disponíveis

### Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento (modo microfrontend)
npm start

# Inicia o servidor de desenvolvimento (modo standalone)
npm run start:standalone
```

### Build

```bash
# Gera o build de produção
npm run build

# Gera o build e analisa o bundle
npm run analyze

# Gera apenas os tipos TypeScript
npm run build:types
```

### Qualidade de Código

```bash
# Executa o linter
npm run lint

# Formata o código
npm run format

# Verifica formatação sem alterar arquivos
npm run check-format
```

## Integração como Microfrontend

### Modo Standalone

Para executar o microfrontend de forma isolada, utilize:

```bash
npm run start:standalone
```

Isso iniciará a aplicação em modo standalone, permitindo desenvolvimento independente.

### Modo Integrado

Para integrar com o shell application do Single-SPA:

1. Certifique-se de que o shell application está configurado para carregar este microfrontend
2. O microfrontend será carregado automaticamente quando a rota correspondente for acessada
3. Utilize `npm start` para desenvolvimento integrado

### Lifecycle Hooks

O microfrontend exporta os seguintes lifecycle hooks do Single-SPA:

- `bootstrap`: Inicializa o microfrontend
- `mount`: Monta o componente React na DOM
- `unmount`: Remove o componente da DOM

## Funcionalidades

### Login

- Validação de email e senha
- Feedback visual de erros
- Integração com API de autenticação
- Armazenamento de token no localStorage
- Redirecionamento após login bem-sucedido

### Cadastro

- Validação de todos os campos (nome, email, senha, confirmação de senha)
- Validação em tempo real
- Feedback visual de erros e sucessos
- Integração com API de registro

### Validações Implementadas

- **Email**: Formato válido de email
- **Senha**: Mínimo de 8 caracteres
- **Nome**: Mínimo de 3 caracteres
- **Confirmação de Senha**: Deve coincidir com a senha

## Docker

O projeto inclui um `Dockerfile` para containerização:

```bash
# Build da imagem
docker build -t cortex-bank-auth .

# Executar o container
docker run -p 3005:3005 cortex-bank-auth
```

## Build de Produção

O build de produção gera os arquivos otimizados na pasta `dist/`:

```bash
npm run build
```

Os arquivos gerados podem ser servidos por qualquer servidor web estático ou integrados ao shell application do Single-SPA.

## Deploy e Hospedagem

### Vercel

A aplicação está hospedada na **Vercel**, uma plataforma de hospedagem moderna que oferece:

- **Deploy automático**: Integração com Git para deploy contínuo
- **CDN global**: Distribuição de conteúdo através de uma rede global
- **HTTPS automático**: Certificados SSL gerenciados automaticamente
- **Configuração de segurança**: Headers de segurança configurados via `vercel.json`

### Configuração de Variáveis de Ambiente na Vercel

As variáveis de ambiente são configuradas diretamente no painel da Vercel:

1. Acesse o projeto na plataforma Vercel
2. Navegue até **Settings** → **Environment Variables**
3. Configure as seguintes variáveis:
   - `REACT_APP_API_URL`: URL da API de autenticação em produção
   - `REACT_APP_REDIRECT_URL`: URL de redirecionamento após login

**⚠️ Requisito de Segurança**: As variáveis de ambiente **não devem** ser commitadas no repositório. Elas são gerenciadas exclusivamente através da plataforma Vercel, garantindo que informações sensíveis não sejam expostas no código-fonte ou histórico do Git.

### Headers de Segurança

O projeto inclui configuração de headers de segurança no arquivo `vercel.json`:

- **X-Content-Type-Options**: Previne MIME type sniffing
- **X-Frame-Options**: Previne clickjacking
- **X-XSS-Protection**: Proteção contra XSS
- **Content-Security-Policy**: Política de segurança de conteúdo
- **Referrer-Policy**: Controle de informações de referrer

Esses headers são aplicados automaticamente em todas as requisições, seguindo as melhores práticas de segurança para aplicações web.

## Segurança

### Medidas de Segurança Implementadas

- **Tokens de autenticação**: Armazenados no `localStorage` com validação adequada
- **Validação de dados**: Validação no cliente antes do envio para a API
- **HTTPS**: Comunicação com API via HTTPS em produção
- **Tratamento de erros**: Tratamento adequado de erros de autenticação sem expor informações sensíveis
- **Headers de segurança**: Configuração de headers HTTP de segurança via Vercel
- **Variáveis de ambiente**: Gerenciamento seguro de variáveis de ambiente através da plataforma Vercel, sem uso de arquivos `.env` em produção

### Requisitos de Segurança

Este projeto segue requisitos de segurança estabelecidos para aplicações em produção:

1. **Não versionamento de credenciais**: Variáveis de ambiente sensíveis não são commitadas no repositório
2. **Gestão centralizada**: Configurações sensíveis são gerenciadas através da plataforma de hospedagem (Vercel)
3. **Separação de ambientes**: Diferentes valores de variáveis para desenvolvimento e produção
4. **Proteção contra exposição**: Prevenção de vazamento de informações através de headers de segurança e boas práticas de desenvolvimento

## Dependências Principais

### Produção

- `react` e `react-dom`: Framework React
- `single-spa` e `single-spa-react`: Integração com Single-SPA
- `@grupo10-pos-fiap/design-system`: Design system compartilhado

### Desenvolvimento

- `typescript`: Tipagem estática
- `webpack` e plugins: Build e bundling
- `eslint` e `prettier`: Qualidade de código

## Contribuindo

Este é um projeto acadêmico desenvolvido como parte do trabalho de pós-graduação. Para contribuições:

1. Siga os padrões de código estabelecidos
2. Execute o linter antes de fazer commit (`npm run lint`)
3. Siga as convenções de commit do projeto

## Licença

Este projeto foi desenvolvido como parte do trabalho de pós-graduação em Engenharia de Software Frontend.

## Autores

- [Gabrielle Martins](https://github.com/Gabrielle-96)
- [Helen Cris](https://github.com/HelenCrisM)
