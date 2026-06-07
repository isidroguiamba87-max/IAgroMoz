# 📦 Guia de Instalação

## Opção 1: JavaScript Vanilla (HTML Puro)

### Passo 1: Não precisa instalar nada!
Os arquivos já estão prontos para uso.

### Passo 2: Configurar a API
1. Abra `api/config.js`
2. Altere a URL da API:
```javascript
const API_CONFIG = {
    baseURL: 'https://sua-api.com/api',  // ← Coloque sua URL aqui
    // ...
};
```

### Passo 3: Usar um servidor local
Você precisa de um servidor local para testar (por causa dos módulos ES6).

#### Opção A: Live Server (VS Code)
1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

#### Opção B: Python
```bash
# Python 3
python -m http.server 8000

# Acesse: http://localhost:8000
```

#### Opção C: Node.js (http-server)
```bash
# Instalar globalmente
npm install -g http-server

# Executar
http-server

# Acesse: http://localhost:8080
```

### Passo 4: Testar
1. Abra `login-integrado.html` no navegador
2. Tente fazer login com credenciais válidas
3. Verifique o console do navegador (F12) para ver logs

---

## Opção 2: React + Vite

### Passo 1: Pré-requisitos
Certifique-se de ter instalado:
- Node.js (versão 16 ou superior)
- npm ou yarn

Verificar versões:
```bash
node --version
npm --version
```

### Passo 2: Navegar para a pasta React
```bash
cd react-app
```

### Passo 3: Instalar dependências
```bash
npm install
```

Isso instalará:
- React
- React DOM
- React Router DOM
- Vite
- Plugin React para Vite

### Passo 4: Configurar a API
1. Abra `react-app/src/services/api.js`
2. Altere a URL da API:
```javascript
const API_BASE_URL = 'https://sua-api.com/api';  // ← Coloque sua URL aqui
```

### Passo 5: Iniciar servidor de desenvolvimento
```bash
npm run dev
```

O servidor iniciará em `http://localhost:3000`

### Passo 6: Build para produção
Quando estiver pronto para publicar:
```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`

---

## 🔧 Configuração Adicional

### Configurar TailwindCSS (Opcional para React)

Se quiser usar TailwindCSS no React:

1. Instalar TailwindCSS:
```bash
cd react-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Configurar `tailwind.config.js`:
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. Adicionar ao `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🌐 Configurar CORS (Backend)

Se tiver problemas de CORS, configure seu backend Django:

```python
# settings.py
INSTALLED_APPS = [
    # ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ...
]

# Desenvolvimento
CORS_ALLOW_ALL_ORIGINS = True

# Produção (mais seguro)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:8000",
    "https://seu-dominio.com",
]
```

---

## 📱 Testar em Dispositivos Móveis

### Opção 1: Usar IP local
1. Descubra seu IP local:
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

2. Acesse pelo celular:
```
http://SEU_IP:3000
```

### Opção 2: Usar ngrok
```bash
# Instalar ngrok
npm install -g ngrok

# Expor porta local
ngrok http 3000
```

---

## 🐛 Solução de Problemas

### Erro: "Cannot use import statement outside a module"
- Certifique-se de usar `type="module"` nas tags script
- Use um servidor local (não abra o HTML diretamente)

### Erro: "CORS policy"
- Configure CORS no backend
- Verifique se a URL da API está correta

### Erro: "npm command not found"
- Instale Node.js: https://nodejs.org/

### Erro: "Port 3000 already in use"
```bash
# Matar processo na porta 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Página em branco no React
- Abra o console do navegador (F12)
- Verifique erros no terminal
- Certifique-se de que todas as dependências foram instaladas

---

## 📂 Estrutura de Arquivos Após Instalação

```
projeto/
├── api/                    # Serviços de API (JS Vanilla)
│   ├── auth.js
│   ├── apiService.js
│   └── config.js
│
├── js/                     # Scripts auxiliares
│   ├── auth-handler.js
│   ├── location-handler.js
│   ├── login-form.js
│   └── register-form.js
│
├── react-app/             # Aplicação React
│   ├── node_modules/      # Dependências (após npm install)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── *.html                 # Páginas HTML
├── README.md
├── GUIA_INTEGRACAO.md
└── INSTALACAO.md
```

---

## ✅ Checklist de Instalação

### JavaScript Vanilla
- [ ] Configurar URL da API em `api/config.js`
- [ ] Iniciar servidor local
- [ ] Testar página de login
- [ ] Verificar console do navegador

### React + Vite
- [ ] Instalar Node.js
- [ ] Navegar para `react-app/`
- [ ] Executar `npm install`
- [ ] Configurar URL da API em `src/services/api.js`
- [ ] Executar `npm run dev`
- [ ] Testar no navegador

---

## 🚀 Próximos Passos

Após a instalação:
1. Leia o `GUIA_INTEGRACAO.md` para aprender a usar a API
2. Teste todos os endpoints
3. Personalize o design conforme necessário
4. Implemente funcionalidades adicionais

---

## 📞 Precisa de Ajuda?

- Email: sheltonTomas@gmail.com
- Telefone: +258 87 807 0526

Boa sorte com seu projeto! 🌱
