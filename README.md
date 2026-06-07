# IAGROMOZ - Plataforma Agrícola

Plataforma de agricultura inteligente conectando agricultores com tecnologia.

## 📁 Estrutura do Projeto

```
├── api/                    # Serviços de API (JavaScript Vanilla)
│   ├── auth.js            # Gerenciamento de autenticação
│   ├── apiService.js      # Serviço principal da API
│   └── config.js          # Configurações da API
│
├── js/                     # Scripts JavaScript
│   ├── auth-handler.js    # Handler de autenticação
│   ├── location-handler.js # Handler de localização
│   ├── login-form.js      # Script do formulário de login
│   └── register-form.js   # Script do formulário de registro
│
├── react-app/             # Aplicação React + Vite
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── services/      # Serviços (API)
│   │   └── App.jsx        # Componente principal
│   ├── package.json
│   └── vite.config.js
│
└── *.html                 # Páginas HTML estáticas
```

## 🚀 Como Usar

### Opção 1: HTML + JavaScript Vanilla

1. **Configurar a URL da API**
   - Abra `api/config.js`
   - Altere `baseURL` para a URL da sua API

2. **Incluir scripts nas páginas HTML**
   ```html
   <script type="module" src="api/config.js"></script>
   <script type="module" src="api/auth.js"></script>
   <script type="module" src="api/apiService.js"></script>
   <script type="module" src="js/register-form.js"></script>
   ```

3. **Abrir no navegador**
   - Use um servidor local (Live Server, http-server, etc.)

### Opção 2: React + Vite

1. **Instalar dependências**
   ```bash
   cd react-app
   npm install
   ```

2. **Configurar a URL da API**
   - Abra `react-app/src/services/api.js`
   - Altere `API_BASE_URL` para a URL da sua API

3. **Iniciar o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Build para produção**
   ```bash
   npm run build
   ```

## 🔧 Configuração da API

Antes de usar, configure a URL base da API:

### JavaScript Vanilla
Arquivo: `api/config.js`
```javascript
const API_CONFIG = {
    baseURL: 'https://sua-api.com/api',  // ← Altere aqui
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
};
```

### React
Arquivo: `react-app/src/services/api.js`
```javascript
const API_BASE_URL = 'https://sua-api.com/api';  // ← Altere aqui
```

## 📡 Endpoints Disponíveis

### Autenticação
- `POST /token/` - Login
- `POST /token/refresh/` - Renovar token
- `POST /auth/logout/` - Logout
- `POST /usuarios/` - Registrar usuário
- `PUT /usuarios/alterar-senha/` - Alterar senha

### Localização
- `GET /provincias/` - Listar províncias
- `GET /distritos/?id_provincia={id}` - Listar distritos

### Chat
- `POST /chat/sessoes/` - Criar sessão de chat
- `POST /chat/mensagens/` - Enviar mensagem
- `GET /chat/mensagens/?session_id={id}` - Ver mensagens

### Comunidade
- `GET /comunidade/sessoes/` - Listar discussões
- `POST /comunidade/sessoes/` - Criar discussão
- `POST /comunidade/mensagens/` - Responder discussão

### Marketplace
- `POST /marketplace/pedido-vendedor/` - Pedir para ser vendedor
- `GET /marketplace/meu-pedido/` - Ver meu pedido
- `POST /marketplace/produtos/` - Criar produto
- `GET /marketplace/produtos/` - Listar produtos

### Técnicas
- `GET /tecnicas/` - Listar técnicas
- `POST /tecnicas/` - Sugerir técnica
- `POST /tecnicas/{id}/votar/` - Votar em técnica

## 🔐 Autenticação

O sistema usa JWT (JSON Web Tokens) para autenticação:

1. **Login**: Recebe `access` e `refresh` tokens
2. **Access Token**: Usado em todas as requisições (expira rápido)
3. **Refresh Token**: Usado para renovar o access token
4. **Armazenamento**: Tokens salvos no `localStorage`

### Exemplo de uso:
```javascript
// Login
const result = await apiService.login('email@exemplo.com', 'senha123');

// Fazer requisição autenticada
const products = await apiService.getProducts();

// Logout
await apiService.logout();
```

## 📝 Fluxo de Registro

1. Usuário preenche formulário
2. Seleciona Província → Carrega Distritos
3. Seleciona Distrito
4. Envia dados para API:
   ```json
   {
     "email": "usuario@email.com",
     "first_name": "João",
     "last_name": "Silva",
     "password": "senha123",
     "id_distrito": 5,
     "tipos": ["agricultor"]
   }
   ```
5. Após registro, faz login automático
6. Redireciona para dashboard

## 🎨 Tecnologias

### JavaScript Vanilla
- Fetch API para requisições
- LocalStorage para tokens
- ES6 Modules

### React + Vite
- React 18
- React Router DOM
- Vite (build tool)
- TailwindCSS (opcional)

## 🛠️ Desenvolvimento

### Adicionar novo endpoint

1. **JavaScript Vanilla**
   ```javascript
   // Em api/config.js
   const API_ENDPOINTS = {
       // ...
       newEndpoint: '/novo-endpoint/'
   };

   // Em api/apiService.js
   async getNewData() {
       return this.get(API_ENDPOINTS.newEndpoint);
   }
   ```

2. **React**
   ```javascript
   // Em react-app/src/services/api.js
   getNewData() {
       return this.get('/novo-endpoint/');
   }
   ```

## 📦 Dependências React

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.8"
  }
}
```

## 🚨 Tratamento de Erros

Todos os métodos da API retornam erros estruturados:

```javascript
try {
    const data = await apiService.login(email, password);
} catch (error) {
    console.error('Status:', error.status);
    console.error('Mensagem:', error.message);
    console.error('Dados:', error.data);
}
```

## 📱 Responsividade

Ambas as versões (HTML e React) são responsivas e funcionam em:
- Desktop
- Tablet
- Mobile

## 🔄 Renovação Automática de Token

O sistema renova automaticamente o token quando expira:

1. Requisição retorna 401 (não autorizado)
2. Sistema tenta renovar com refresh token
3. Se sucesso, repete a requisição original
4. Se falha, faz logout e redireciona para login

## 📄 Licença

MIT

## 👥 Suporte

Para dúvidas ou problemas:
- Email: sheltonTomas@gmail.com
- Telefone: +258 87 807 0526
