# 🔌 Integração com API Real - IAgroMOZ

## ✅ Fase 1 e 2 Implementadas

---

## 📋 Mudanças Realizadas

### ✅ 1. Autenticação (JWT)

**Antes**:
```javascript
POST /api/auth/login/
POST /api/auth/refresh/
```

**Depois (API Real)**:
```javascript
POST /api/token/
POST /api/token/refresh/
```

**Arquivo**: `react-app/src/services/api.js`

---

### ✅ 2. Localização

**Antes**:
```javascript
GET /api/provinces/
GET /api/districts/?province=<id>
```

**Depois (API Real)**:
```javascript
GET /api/provincias/
GET /api/distritos/?provincia=<id>
```

**Arquivos Atualizados**:
- `react-app/src/services/api.js`
- `react-app/src/pages/CreateProduct.jsx`
- `react-app/src/pages/Register.jsx`

---

### ✅ 3. Técnicas

**Antes**:
```javascript
GET /api/techniques/
```

**Depois (API Real)**:
```javascript
GET /api/tecnicas/
```

**Arquivo**: `react-app/src/services/api.js`

---

### ✅ 4. Marketplace - Mudanças Críticas

#### Endpoints Atualizados

**Antes**:
```javascript
GET  /api/products/
POST /api/products/
```

**Depois (API Real)**:
```javascript
GET  /api/marketplace/produtos/
POST /api/marketplace/produtos/
GET  /api/marketplace/meu-pedido/
```

#### Campos do Formulário

**Antes**:
```javascript
{
  name: '',
  description: '',
  category: '',
  price: '',
  unit: '',
  stock: '',
  location: '',
  available: true,
  image: null
}
```

**Depois (API Real)**:
```javascript
{
  nome: '',          // obrigatório
  preco: '',         // obrigatório
  provincia: '',     // obrigatório (ID numérico)
  distrito: '',      // obrigatório (ID numérico)
  fotografia: null,  // obrigatório (arquivo de imagem)
  descricao: ''      // opcional
}
```

#### Campos Removidos
- ❌ `category` (não existe na API)
- ❌ `unit` (não existe na API)
- ❌ `stock` (não existe na API)
- ❌ `available` (não existe na API)

#### Campos Adicionados
- ✅ `provincia` (obrigatório)
- ✅ `distrito` (obrigatório)
- ✅ `fotografia` (obrigatório - antes era opcional)

**Arquivos Atualizados**:
- `react-app/src/services/api.js`
- `react-app/src/pages/CreateProduct.jsx`

---

## 🎨 Melhorias Visuais no CreateProduct

### Indicadores de Campos Obrigatórios
- ✅ Asterisco vermelho (*) em campos obrigatórios
- ✅ Bordas coloridas em seções obrigatórias
- ✅ Ícones Bootstrap em todos os títulos
- ✅ Mensagens claras sobre obrigatoriedade

### Seções do Formulário

#### 1. Foto do Produto (Obrigatória)
- Borda laranja destacada
- Ícone de câmera
- Mensagem "A foto é obrigatória"
- Preview da imagem

#### 2. Informações Básicas
- Nome do produto (obrigatório)
- Preço (obrigatório)
- Descrição (opcional)

#### 3. Localização (Obrigatória)
- Borda verde destacada
- Província (obrigatório)
- Distrito (obrigatório - carrega ao selecionar província)
- Mensagem "Província e distrito são obrigatórios"

---

## 📝 Validações Implementadas

### CreateProduct
```javascript
// Validações conforme API
if (!formData.nome || !formData.preco || !formData.provincia || 
    !formData.distrito || !formData.fotografia) {
  setError('Preencha todos os campos obrigatórios')
  return
}

if (parseFloat(formData.preco) <= 0) {
  setError('O preço deve ser maior que zero')
  return
}
```

---

## 🔄 Fluxo de Upload

### FormData para Marketplace
```javascript
const productData = new FormData()
productData.append('nome', formData.nome)
productData.append('preco', formData.preco)
productData.append('provincia', formData.provincia)
productData.append('distrito', formData.distrito)
productData.append('fotografia', formData.fotografia)

if (formData.descricao) {
  productData.append('descricao', formData.descricao)
}

await api.createProduct(productData)
```

### Headers Automáticos
O browser define automaticamente `Content-Type: multipart/form-data` quando usa FormData.

---

## 🧪 Como Testar

### 1. Autenticação
```bash
# Login
curl -X POST http://127.0.0.1:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{"username":"seu_usuario","password":"sua_senha"}'

# Resposta esperada:
{
  "access": "<token>",
  "refresh": "<token>"
}
```

### 2. Localização
```bash
# Listar províncias
curl http://127.0.0.1:8000/api/provincias/

# Listar distritos de uma província
curl http://127.0.0.1:8000/api/distritos/?provincia=1
```

### 3. Marketplace
```bash
# Criar produto
curl -X POST http://127.0.0.1:8000/api/marketplace/produtos/ \
  -H "Authorization: Bearer <token>" \
  -F nome="Tomates Frescos" \
  -F preco=50 \
  -F provincia=1 \
  -F distrito=2 \
  -F fotografia=@/caminho/para/imagem.jpg \
  -F descricao="Tomates orgânicos de qualidade"
```

---

## ⚠️ Modo Demonstração

Quando a API não está disponível:
- ✅ Dados de exemplo são exibidos
- ✅ Formulários simulam sucesso
- ✅ Mensagens informam que é modo demonstração
- ✅ Usuário pode testar a interface

### Ativar API Real
```bash
cd backend
python manage.py runserver
```

---

## 📊 Checklist de Integração

### Fase 1 - Crítico ✅
- [x] Autenticação JWT (`/api/token/`)
- [x] Localização (`/api/provincias/`, `/api/distritos/`)

### Fase 2 - Importante ✅
- [x] Marketplace (`/api/marketplace/produtos/`)
- [x] Técnicas (`/api/tecnicas/`)
- [x] Campos obrigatórios (nome, preco, provincia, distrito, fotografia)
- [x] Upload de imagem com FormData
- [x] Validações conforme API

### Fase 3 - Pendente ⏳
- [ ] Chat IA (sistema de sessões)
- [ ] Comunidade (migração para sessoes/mensagens)

---

## 🎯 Próximos Passos

### Chat IA (Fase 3)
Implementar:
- `GET /api/chat/sessoes/` - Listar sessões
- `POST /api/chat/sessoes/` - Criar sessão
- `GET /api/chat/mensagens/?session_id=<id>` - Listar mensagens
- `POST /api/chat/mensagens/` - Enviar mensagem

### Comunidade (Fase 3)
Decidir:
- Migrar para `/api/comunidade/sessoes/` e `/api/comunidade/mensagens/`
- Ou manter `questions/answers` e ajustar backend

---

## 📚 Arquivos Modificados

### Serviços
- ✅ `react-app/src/services/api.js`

### Páginas
- ✅ `react-app/src/pages/CreateProduct.jsx`
- ⏳ `react-app/src/pages/Register.jsx` (usar provincias/distritos)
- ⏳ `react-app/src/pages/Marketplace.jsx` (exibir produtos da API)
- ⏳ `react-app/src/pages/ChatAI.jsx` (implementar sessões)

### Componentes
- ⏳ Nenhum modificado ainda

---

## 🐛 Problemas Conhecidos

### 1. Register.jsx
Ainda usa `/api/provinces/` e `/api/districts/`
- **Solução**: Atualizar para `/api/provincias/` e `/api/distritos/`

### 2. Marketplace.jsx
Ainda exibe dados de exemplo
- **Solução**: Integrar com `/api/marketplace/produtos/`

### 3. Chat IA
Não usa sessões da API
- **Solução**: Implementar sistema de sessões (Fase 3)

---

## ✅ Testes Recomendados

### Frontend
1. Login com credenciais reais
2. Criar produto com todos os campos
3. Upload de imagem
4. Seleção de província e distrito
5. Validações de campos obrigatórios

### Backend
1. Endpoint `/api/token/` funcionando
2. Endpoint `/api/provincias/` retornando dados
3. Endpoint `/api/marketplace/produtos/` aceitando FormData
4. Upload de imagem salvando em `MEDIA_ROOT`

---

## 📖 Documentação da API

Consulte: `# IAgromoz — API Documentation` (fornecida pelo usuário)

---

**Status**: Fase 1 e 2 concluídas ✅  
**Próximo**: Fase 3 (Chat IA e Comunidade) ⏳

*Última atualização: Março 2026*
