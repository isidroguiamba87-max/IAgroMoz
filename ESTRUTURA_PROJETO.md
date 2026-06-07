# 📂 Estrutura do Projeto IAGROMOZ

## 🎯 Visão Geral

Este projeto oferece duas implementações:
1. **JavaScript Vanilla** - Para usar com HTML puro
2. **React + Vite** - Para aplicação moderna SPA

---

## 📁 Estrutura de Arquivos

```
iagromoz-project/
│
├── 📁 api/                          # Serviços de API (JavaScript Vanilla)
│   ├── auth.js                      # Gerenciamento de tokens e autenticação
│   ├── apiService.js                # Serviço principal com todos os endpoints
│   └── config.js                    # Configurações (URL da API, endpoints)
│
├── 📁 js/                           # Scripts auxiliares
│   ├── auth-handler.js              # Handlers de login/registro/logout
│   ├── location-handler.js          # Gerenciamento de províncias/distritos
│   ├── login-form.js                # Script do formulário de login
│   └── register-form.js             # Script do formulário de registro
│
├── 📁 react-app/                    # Aplicação React + Vite
│   ├── 📁 src/
│   │   ├── 📁 components/           # Componentes reutilizáveis
│   │   │   └── ProtectedRoute.jsx   # Proteção de rotas autenticadas
│   │   │
│   │   ├── 📁 pages/                # Páginas da aplicação
│   │   │   ├── Home.jsx             # Página inicial
│   │   │   ├── Login.jsx            # Página de login
│   │   │   ├── Register.jsx         # Página de registro
│   │   │   └── Dashboard.jsx        # Dashboard do usuário
│   │   │
│   │   ├── 📁 services/             # Serviços
│   │   │   └── api.js               # Serviço de API para React
│   │   │
│   │   ├── App.jsx                  # Componente principal
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Estilos globais
│   │
│   ├── index.html                   # HTML principal
│   ├── package.json                 # Dependências do projeto
│   ├── vite.config.js               # Configuração do Vite
│   └── .gitignore                   # Arquivos ignorados pelo Git
│
├── 📁 foto/                         # Imagens
│   └── log.png.png
│
├── 📁 kki/                          # Imagens
│   ├── Agr.img.png
│   └── log.img.png
│
├── 📁 iagromoz-site/                # Site antigo (legado)
│   └── ...
│
├── 📄 index.html                    # Página inicial (HTML)
├── 📄 login.html                    # Página de login (HTML)
├── 📄 login-integrado.html          # Exemplo de login integrado com API
├── 📄 assistente.html               # Página do assistente IA
├── 📄 Comunidade.html               # Página da comunidade
├── 📄 marketplace.html              # Página do marketplace
├── 📄 satellite.html                # Página de satélite
├── 📄 Reco.html                     # Página de recomendações
├── 📄 Ima.html                      # Página de imagens
│
├── 📄 README.md                     # Documentação principal
├── 📄 GUIA_INTEGRACAO.md           # Guia de integração com API
├── 📄 INSTALACAO.md                # Guia de instalação
├── 📄 exemplos-uso.md              # Exemplos práticos de uso
├── 📄 ESTRUTURA_PROJETO.md         # Este arquivo
└── 📄 .env.example                 # Exemplo de variáveis de ambiente
```

---

## 🔧 Componentes Principais

### 1. Sistema de Autenticação

```
api/auth.js
├── AuthManager (classe)
│   ├── loadTokens()          # Carrega tokens do localStorage
│   ├── saveTokens()          # Salva tokens
│   ├── clearTokens()         # Remove tokens (logout)
│   ├── isAuthenticated()     # Verifica se está logado
│   └── getAuthHeaders()      # Retorna headers com token
```

### 2. Serviço de API

```
api/apiService.js
├── APIService (classe)
│   ├── request()             # Método genérico de requisição
│   ├── get()                 # Requisição GET
│   ├── post()                # Requisição POST
│   ├── put()                 # Requisição PUT
│   ├── delete()              # Requisição DELETE
│   │
│   ├── 🔐 Autenticação
│   │   ├── login()
│   │   ├── logout()
│   │   ├── register()
│   │   ├── refreshToken()
│   │   └── changePassword()
│   │
│   ├── 📍 Localização
│   │   ├── getProvinces()
│   │   └── getDistricts()
│   │
│   ├── 💬 Chat
│   │   ├── createChatSession()
│   │   ├── sendChatMessage()
│   │   └── getChatMessages()
│   │
│   ├── 👥 Comunidade
│   │   ├── getCommunitySessions()
│   │   ├── createCommunitySession()
│   │   └── sendCommunityMessage()
│   │
│   ├── 🛒 Marketplace
│   │   ├── requestSeller()
│   │   ├── getMySellerRequest()
│   │   ├── createProduct()
│   │   └── getProducts()
│   │
│   └── 📚 Técnicas
│       ├── getTechniques()
│       ├── createTechnique()
│       └── voteTechnique()
```

### 3. Handlers

```
js/location-handler.js
└── LocationHandler (classe)
    ├── init()                # Inicializa e carrega províncias
    ├── loadProvinces()       # Busca províncias da API
    ├── loadDistricts()       # Busca distritos de uma província
    ├── getSelectedProvince() # Retorna província selecionada
    ├── getSelectedDistrict() # Retorna distrito selecionado
    └── validate()            # Valida seleção

js/auth-handler.js
├── handleLogin()             # Processa login
├── handleRegister()          # Processa registro
├── handleLogout()            # Processa logout
├── checkAuth()               # Verifica autenticação
└── requireAuth()             # Redireciona se não autenticado
```

---

## 🔄 Fluxo de Dados

### Fluxo de Autenticação

```
1. Usuário preenche formulário
   ↓
2. JavaScript captura submit
   ↓
3. Chama apiService.login(email, password)
   ↓
4. API retorna tokens (access + refresh)
   ↓
5. authManager.saveTokens() salva no localStorage
   ↓
6. Redireciona para dashboard
```

### Fluxo de Requisição Autenticada

```
1. Componente chama apiService.getProducts()
   ↓
2. apiService.request() adiciona token no header
   ↓
3. Faz requisição para API
   ↓
4. Se retornar 401 (token expirado):
   ├── Tenta renovar com refreshToken()
   ├── Se sucesso: repete requisição
   └── Se falha: faz logout
   ↓
5. Retorna dados para componente
```

### Fluxo de Localização

```
1. Página carrega
   ↓
2. LocationHandler.init()
   ↓
3. Carrega províncias da API
   ↓
4. Renderiza no <select>
   ↓
5. Usuário seleciona província
   ↓
6. Carrega distritos daquela província
   ↓
7. Renderiza distritos no <select>
   ↓
8. Usuário seleciona distrito
   ↓
9. ID do distrito é usado no registro
```

---

## 🎨 Páginas HTML

### Páginas Principais
- `index.html` - Landing page
- `login.html` - Login/Registro (formulário multi-step)
- `login-integrado.html` - Exemplo de login integrado com API

### Páginas de Funcionalidades
- `assistente.html` - Chat com IA
- `Comunidade.html` - Fórum de discussões
- `marketplace.html` - Compra/venda de produtos
- `Reco.html` - Recomendações agrícolas
- `satellite.html` - Visualização de satélite

---

## ⚛️ Estrutura React

```
react-app/
├── src/
│   ├── App.jsx                    # Rotas principais
│   │   ├── / → Home
│   │   ├── /login → Login
│   │   ├── /register → Register
│   │   └── /dashboard → Dashboard (protegido)
│   │
│   ├── components/
│   │   └── ProtectedRoute.jsx     # HOC para rotas protegidas
│   │
│   ├── pages/
│   │   ├── Home.jsx               # Landing page
│   │   ├── Login.jsx              # Formulário de login
│   │   ├── Register.jsx           # Formulário de registro
│   │   └── Dashboard.jsx          # Área do usuário
│   │
│   └── services/
│       └── api.js                 # Mesma API do vanilla JS
```

---

## 🔐 Segurança

### Armazenamento de Tokens
```
localStorage
├── access_token    # Token de acesso (curta duração)
└── refresh_token   # Token de renovação (longa duração)
```

### Headers de Requisição
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

---

## 📦 Dependências

### JavaScript Vanilla
- Nenhuma! Usa apenas APIs nativas do navegador
- Fetch API
- LocalStorage
- ES6 Modules

### React + Vite
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "vite": "^5.0.8"
}
```

---

## 🚀 Como Começar

### Opção 1: JavaScript Vanilla
1. Configure `api/config.js` com URL da API
2. Abra `login-integrado.html` em um servidor local
3. Teste login/registro

### Opção 2: React + Vite
1. `cd react-app`
2. `npm install`
3. Configure `src/services/api.js` com URL da API
4. `npm run dev`

---

## 📝 Arquivos de Documentação

- `README.md` - Visão geral e instruções básicas
- `GUIA_INTEGRACAO.md` - Como integrar com a API
- `INSTALACAO.md` - Guia de instalação passo a passo
- `exemplos-uso.md` - Exemplos práticos de código
- `ESTRUTURA_PROJETO.md` - Este arquivo

---

## 🎯 Próximos Passos

1. ✅ Configurar URL da API
2. ✅ Testar autenticação
3. ✅ Testar localização
4. ⬜ Implementar chat
5. ⬜ Implementar comunidade
6. ⬜ Implementar marketplace
7. ⬜ Implementar técnicas
8. ⬜ Deploy em produção

---

## 📞 Suporte

- Email: sheltonTomas@gmail.com
- Telefone: +258 87 807 0526
- Localização: Inhambane, Moçambique
