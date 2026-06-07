# 💡 Exemplos Práticos de Uso da API

## 1. Fluxo Completo de Registro e Login

```javascript
import apiService from './api/apiService.js';
import LocationHandler from './js/location-handler.js';

// 1. Carregar localização
const locationHandler = new LocationHandler('province', 'district');
await locationHandler.init();

// 2. Usuário preenche formulário e submete
async function registrarUsuario(formData) {
    try {
        // Registrar
        const usuario = await apiService.register({
            email: formData.email,
            first_name: formData.nome,
            last_name: formData.sobrenome,
            password: formData.senha,
            id_distrito: parseInt(formData.distritoId),
            tipos: ["agricultor"]
        });
        
        console.log('Usuário registrado:', usuario);
        
        // Login automático
        await apiService.login(formData.email, formData.senha);
        
        // Redirecionar
        window.location.href = '/dashboard.html';
        
    } catch (erro) {
        console.error('Erro:', erro.message);
        alert('Erro ao registrar: ' + erro.message);
    }
}
```

## 2. Chat com Assistente IA

```javascript
// Criar nova sessão de chat
async function iniciarChat() {
    try {
        // Criar sessão
        const sessao = await apiService.createChatSession(
            'Dúvidas sobre plantação de milho'
        );
        
        console.log('Sessão criada:', sessao);
        
        // Enviar primeira mensagem
        const resposta = await apiService.sendChatMessage(
            sessao.id,
            'Qual o melhor período para plantar milho em Moçambique?'
        );
        
        console.log('Resposta da IA:', resposta);
        
        // Buscar histórico de mensagens
        const mensagens = await apiService.getChatMessages(sessao.id);
        console.log('Histórico:', mensagens);
        
    } catch (erro) {
        console.error('Erro no chat:', erro);
    }
}
```

## 3. Participar da Comunidade

```javascript
// Criar nova discussão
async function criarDiscussao() {
    try {
        const discussao = await apiService.createCommunitySession(
            'Problema com pragas no tomate',
            'Olá pessoal, estou com um problema de pulgões nos meus tomateiros. Alguém tem alguma dica?'
        );
        
        console.log('Discussão criada:', discussao);
        return discussao.id;
        
    } catch (erro) {
        console.error('Erro ao criar discussão:', erro);
    }
}

// Responder em uma discussão
async function responderDiscussao(sessaoId) {
    try {
        const resposta = await apiService.sendCommunityMessage(
            sessaoId,
            'Experimente usar calda de fumo! Funciona muito bem contra pulgões.'
        );
        
        console.log('Resposta enviada:', resposta);
        
    } catch (erro) {
        console.error('Erro ao responder:', erro);
    }
}

// Listar todas as discussões
async function listarDiscussoes() {
    try {
        const discussoes = await apiService.getCommunitySessions();
        
        discussoes.forEach(discussao => {
            console.log(`${discussao.titulo} - ${discussao.autor}`);
        });
        
    } catch (erro) {
        console.error('Erro ao listar:', erro);
    }
}
```

## 4. Marketplace - Vender Produtos

```javascript
// Passo 1: Pedir para ser vendedor
async function pedirParaSerVendedor() {
    try {
        const pedido = await apiService.requestSeller(
            '+258841234567',
            'Gostaria de vender meus produtos orgânicos na plataforma'
        );
        
        console.log('Pedido enviado:', pedido);
        alert('Pedido enviado! Aguarde aprovação do administrador.');
        
    } catch (erro) {
        if (erro.status === 400) {
            alert('Você já tem um pedido pendente');
        } else {
            console.error('Erro:', erro);
        }
    }
}

// Passo 2: Verificar status do pedido
async function verificarPedido() {
    try {
        const pedido = await apiService.getMySellerRequest();
        
        if (pedido.aprovado) {
            console.log('Parabéns! Você foi aprovado como vendedor');
            return true;
        } else {
            console.log('Pedido ainda pendente');
            return false;
        }
        
    } catch (erro) {
        console.error('Erro:', erro);
        return false;
    }
}

// Passo 3: Criar produto (após aprovação)
async function criarProduto() {
    try {
        const produto = await apiService.createProduct({
            nome: 'Tomates Orgânicos',
            descricao: 'Tomates frescos colhidos hoje, sem agrotóxicos',
            preco: '50.00'
            // foto: 'base64...' (opcional por enquanto)
        });
        
        console.log('Produto criado:', produto);
        alert('Produto anunciado com sucesso!');
        
    } catch (erro) {
        if (erro.status === 403) {
            alert('Você precisa ser aprovado como vendedor primeiro');
        } else {
            console.error('Erro:', erro);
        }
    }
}

// Listar todos os produtos
async function listarProdutos() {
    try {
        const produtos = await apiService.getProducts();
        
        produtos.forEach(produto => {
            console.log(`${produto.nome} - ${produto.preco} MT`);
            console.log(`Vendedor: ${produto.vendedor}`);
        });
        
    } catch (erro) {
        console.error('Erro:', erro);
    }
}
```

## 5. Técnicas Agrícolas

```javascript
// Listar técnicas disponíveis
async function listarTecnicas() {
    try {
        const tecnicas = await apiService.getTechniques();
        
        tecnicas.forEach(tecnica => {
            console.log(`${tecnica.titulo}`);
            console.log(`Votos: ${tecnica.votos_aprova} aprovações, ${tecnica.votos_reprova} reprovações`);
        });
        
    } catch (erro) {
        console.error('Erro:', erro);
    }
}

// Sugerir nova técnica
async function sugerirTecnica() {
    try {
        const tecnica = await apiService.createTechnique(
            'Irrigação por gotejamento',
            'Técnica que economiza até 60% de água. Consiste em...'
        );
        
        console.log('Técnica sugerida:', tecnica);
        alert('Técnica enviada para aprovação!');
        
    } catch (erro) {
        console.error('Erro:', erro);
    }
}

// Votar em uma técnica
async function votarTecnica(tecnicaId, aprovar) {
    try {
        const voto = aprovar ? 'APROVA' : 'REPROVA';
        
        await apiService.voteTechnique(tecnicaId, voto);
        
        console.log('Voto registrado!');
        
    } catch (erro) {
        if (erro.status === 400) {
            alert('Você já votou nesta técnica');
        } else {
            console.error('Erro:', erro);
        }
    }
}
```

## 6. Exemplo Completo: Página de Produtos

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Marketplace</title>
    <style>
        .produto {
            border: 1px solid #ddd;
            padding: 20px;
            margin: 10px;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1>Marketplace</h1>
    <div id="produtos"></div>

    <script type="module">
        import apiService from './api/apiService.js';

        async function carregarProdutos() {
            try {
                const produtos = await apiService.getProducts();
                const container = document.getElementById('produtos');
                
                if (produtos.length === 0) {
                    container.innerHTML = '<p>Nenhum produto disponível</p>';
                    return;
                }
                
                produtos.forEach(produto => {
                    const div = document.createElement('div');
                    div.className = 'produto';
                    div.innerHTML = `
                        <h3>${produto.nome}</h3>
                        <p>${produto.descricao}</p>
                        <p><strong>Preço:</strong> ${produto.preco} MT</p>
                        <p><small>Vendedor: ${produto.vendedor}</small></p>
                    `;
                    container.appendChild(div);
                });
                
            } catch (erro) {
                console.error('Erro ao carregar produtos:', erro);
                document.getElementById('produtos').innerHTML = 
                    '<p>Erro ao carregar produtos</p>';
            }
        }

        // Carregar ao abrir a página
        carregarProdutos();
    </script>
</body>
</html>
```

## 7. Gerenciar Autenticação

```javascript
import authManager from './api/auth.js';

// Verificar se usuário está logado
function verificarLogin() {
    if (!authManager.isAuthenticated()) {
        alert('Você precisa fazer login');
        window.location.href = '/login.html';
        return false;
    }
    return true;
}

// Proteger uma página
function paginaProtegida() {
    if (!verificarLogin()) {
        return;
    }
    
    // Código da página protegida
    console.log('Usuário autenticado!');
}

// Fazer logout
async function logout() {
    try {
        await apiService.logout();
        alert('Logout realizado com sucesso');
        window.location.href = '/login.html';
    } catch (erro) {
        console.error('Erro no logout:', erro);
    }
}
```

## 8. Tratamento de Erros Avançado

```javascript
async function exemploComTratamentoDeErros() {
    try {
        const resultado = await apiService.login(email, senha);
        
        // Sucesso
        console.log('Login bem-sucedido');
        
    } catch (erro) {
        // Tratar diferentes tipos de erro
        switch (erro.status) {
            case 400:
                alert('Dados inválidos. Verifique os campos.');
                break;
                
            case 401:
                alert('Email ou senha incorretos.');
                break;
                
            case 403:
                alert('Você não tem permissão para esta ação.');
                break;
                
            case 404:
                alert('Recurso não encontrado.');
                break;
                
            case 500:
                alert('Erro no servidor. Tente novamente mais tarde.');
                break;
                
            default:
                alert('Erro: ' + erro.message);
        }
        
        // Log detalhado para debug
        console.error('Erro completo:', {
            status: erro.status,
            message: erro.message,
            data: erro.data
        });
    }
}
```

## 9. Exemplo React: Hook Customizado

```jsx
// hooks/useAPI.js
import { useState, useEffect } from 'react';
import api from '../services/api';

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await api.getProducts();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    return { products, loading, error };
}

// Usar no componente
function ProductList() {
    const { products, loading, error } = useProducts();

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div>
            {products.map(product => (
                <div key={product.id}>
                    <h3>{product.nome}</h3>
                    <p>{product.preco} MT</p>
                </div>
            ))}
        </div>
    );
}
```

## 10. Dicas de Performance

```javascript
// Cache de dados
const cache = new Map();

async function getProdutosComCache() {
    // Verificar cache
    if (cache.has('produtos')) {
        const cached = cache.get('produtos');
        const agora = Date.now();
        
        // Cache válido por 5 minutos
        if (agora - cached.timestamp < 5 * 60 * 1000) {
            return cached.data;
        }
    }
    
    // Buscar da API
    const produtos = await apiService.getProducts();
    
    // Salvar no cache
    cache.set('produtos', {
        data: produtos,
        timestamp: Date.now()
    });
    
    return produtos;
}

// Debounce para busca
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Usar em campo de busca
const buscarProdutos = debounce(async (termo) => {
    const produtos = await apiService.getProducts();
    const filtrados = produtos.filter(p => 
        p.nome.toLowerCase().includes(termo.toLowerCase())
    );
    mostrarProdutos(filtrados);
}, 300);
```

Esses exemplos cobrem os casos de uso mais comuns. Adapte conforme necessário!
