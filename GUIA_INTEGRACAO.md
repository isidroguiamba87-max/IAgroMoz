# 🚀 Guia de Integração com a API

Este guia mostra como integrar seu projeto com a API do IAGROMOZ.

## 📋 Pré-requisitos

1. URL da API funcionando
2. Acesso aos endpoints
3. Conhecimento básico de JavaScript

## 🔧 Passo 1: Configurar a URL da API

### Para JavaScript Vanilla

Abra o arquivo `api/config.js` e altere a URL:

```javascript
const API_CONFIG = {
    baseURL: 'https://sua-api-real.com/api',  // ← Coloque sua URL aqui
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
};
```

### Para React + Vite

Abra o arquivo `react-app/src/services/api.js` e altere:

```javascript
const API_BASE_URL = 'https://sua-api-real.com/api';  // ← Coloque sua URL aqui
```

## 🔐 Passo 2: Testar Autenticação

### Teste de Login

```javascript
import apiService from './api/apiService.js';

// Testar login
async function testarLogin() {
    try {
        const resultado = await apiService.login(
            'seu-email@teste.com',
            'sua-senha'
        );
        console.log('Login bem-sucedido!', resultado);
    } catch (erro) {
        console.error('Erro no login:', erro.message);
    }
}

testarLogin();
```

### Teste de Registro

```javascript
async function testarRegistro() {
    try {
        const novoUsuario = {
            email: 'novo@email.com',
            first_name: 'João',
            last_name: 'Silva',
            password: 'Senha123!',
            id_distrito: 1,
            tipos: ['agricultor']
        };
        
        const resultado = await apiService.register(novoUsuario);
        console.log('Registro bem-sucedido!', resultado);
    } catch (erro) {
        console.error('Erro no registro:', erro.message);
    }
}
```

## 📍 Passo 3: Integrar Localização

### Carregar Províncias e Distritos

```javascript
import LocationHandler from './js/location-handler.js';

// No seu HTML, tenha:
// <select id="province"></select>
// <select id="district"></select>

// Inicializar
const locationHandler = new LocationHandler('province', 'district');
await locationHandler.init();

// Obter valores selecionados
const provinciaId = locationHandler.getSelectedProvince();
const distritoId = locationHandler.getSelectedDistrict();
```

## 💬 Passo 4: Integrar Chat

```javascript
// Criar nova sessão de chat
const sessao = await apiService.createChatSession('Minha dúvida sobre milho');

// Enviar mensagem
const resposta = await apiService.sendChatMessage(
    sessao.id,
    'Qual o melhor adubo para milho?'
);

// Ver mensagens antigas
const mensagens = await apiService.getChatMessages(sessao.id);
```

## 👥 Passo 5: Integrar Comunidade

```javascript
// Criar nova discussão
const discussao = await apiService.createCommunitySession(
    'Problema com pragas',
    'Estou com muitos pulgões na plantação'
);

// Responder em uma discussão
const resposta = await apiService.sendCommunityMessage(
    discussao.id,
    'Experimente usar calda de fumo!'
);

// Listar discussões
const discussoes = await apiService.getCommunitySessions();
```

## 🛒 Passo 6: Integrar Marketplace

```javascript
// Pedir para ser vendedor
const pedido = await apiService.requestSeller(
    '+258841234567',
    'Quero vender minhas verduras'
);

// Verificar status do pedido
const meuPedido = await apiService.getMySellerRequest();

// Criar produto (após aprovação)
const produto = await apiService.createProduct({
    nome: 'Tomates Orgânicos',
    descricao: 'Tomates frescos colhidos hoje',
    preco: '50.00'
});

// Listar produtos
const produtos = await apiService.getProducts();
```

## 📚 Passo 7: Integrar Técnicas Agrícolas

```javascript
// Listar técnicas
const tecnicas = await apiService.getTechniques();

// Sugerir nova técnica
const novaTecnica = await apiService.createTechnique(
    'Irrigação por gotejamento',
    'Técnica que economiza água...'
);

// Votar em uma técnica
await apiService.voteTechnique(1, 'APROVA'); // ou 'REPROVA'
```

## 🔄 Passo 8: Gerenciar Tokens

Os tokens são gerenciados automaticamente, mas você pode:

```javascript
import authManager from './api/auth.js';

// Verificar se está autenticado
if (authManager.isAuthenticated()) {
    console.log('Usuário está logado');
}

// Obter token de acesso
const token = authManager.getAccessToken();

// Fazer logout
authManager.clearTokens();
```

## 🎯 Exemplo Completo: Formulário de Registro

```html
<!DOCTYPE html>
<html>
<head>
    <title>Registro</title>
</head>
<body>
    <form id="registerForm">
        <input type="text" id="firstName" placeholder="Nome" required>
        <input type="text" id="lastName" placeholder="Sobrenome" required>
        <input type="email" id="email" placeholder="Email" required>
        <input type="password" id="password" placeholder="Senha" required>
        
        <select id="province" required>
            <option value="">Selecione a província</option>
        </select>
        
        <select id="district" required disabled>
            <option value="">Selecione o distrito</option>
        </select>
        
        <button type="submit">Registrar</button>
    </form>

    <script type="module">
        import apiService from './api/apiService.js';
        import LocationHandler from './js/location-handler.js';

        // Inicializar localização
        const locationHandler = new LocationHandler('province', 'district');
        await locationHandler.init();

        // Gerenciar formulário
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const dados = {
                email: document.getElementById('email').value,
                first_name: document.getElementById('firstName').value,
                last_name: document.getElementById('lastName').value,
                password: document.getElementById('password').value,
                id_distrito: parseInt(locationHandler.getSelectedDistrict()),
                tipos: ['agricultor']
            };

            try {
                await apiService.register(dados);
                await apiService.login(dados.email, dados.password);
                window.location.href = '/dashboard.html';
            } catch (erro) {
                alert('Erro: ' + erro.message);
            }
        });
    </script>
</body>
</html>
```

## 🐛 Tratamento de Erros

Sempre use try-catch:

```javascript
try {
    const resultado = await apiService.login(email, senha);
    // Sucesso
} catch (erro) {
    // Tratar erro
    if (erro.status === 401) {
        alert('Email ou senha incorretos');
    } else if (erro.status === 400) {
        alert('Dados inválidos: ' + erro.message);
    } else {
        alert('Erro: ' + erro.message);
    }
}
```

## 📱 Exemplo React

```jsx
import { useState } from 'react';
import api from './services/api';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await api.login(email, password);
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
            />
            
            <button type="submit">Entrar</button>
        </form>
    );
}
```

## ✅ Checklist de Integração

- [ ] Configurar URL da API
- [ ] Testar login
- [ ] Testar registro
- [ ] Testar localização (províncias/distritos)
- [ ] Testar chat
- [ ] Testar comunidade
- [ ] Testar marketplace
- [ ] Testar técnicas
- [ ] Implementar tratamento de erros
- [ ] Testar renovação de token
- [ ] Testar logout

## 🆘 Problemas Comuns

### Erro CORS
Se receber erro de CORS, configure o backend para aceitar requisições do seu domínio.

### Token Expirado
O sistema renova automaticamente. Se não funcionar, verifique se o refresh token está válido.

### 401 Unauthorized
Verifique se o token está sendo enviado corretamente no header `Authorization: Bearer {token}`.

### Dados não aparecem
Verifique o console do navegador para ver erros. Use `console.log()` para debugar.

## 📞 Suporte

Dúvidas? Entre em contato:
- Email: sheltonTomas@gmail.com
- Telefone: +258 87 807 0526
