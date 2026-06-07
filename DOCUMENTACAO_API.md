# 📚 Documentação da API - iAgroMoZ

## Base URL
```
https://seudominio.com/api/
```

## Autenticação
A API utiliza JWT (JSON Web Tokens) para autenticação.

### Endpoints de Autenticação

#### `POST /token/`
Obter tokens de acesso e refresh.

**Request Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Response (200 OK):**
```json
{
  "refresh": "eyJ0eXAiOiJKV1Qi...",
  "access": "eyJ0eXAiOiJKV1Qi..."
}
```

#### `POST /token/refresh/`
Renovar token de acesso.

**Request Body:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1Qi..."
}
```

**Response (200 OK):**
```json
{
  "access": "eyJ0eXAiOiJKV1Qi..."
}
```

#### `POST /auth/logout/`
Realizar logout (invalida o refresh token).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1Qi..."
}
```

---

## 👤 Usuários

### `GET /api/usuarios/`
Lista todos os usuários (apenas admin).

### `POST /api/usuarios/`
Registrar novo usuário (público).

**Request Body:**
```json
{
  "email": "novo@email.com",
  "password": "senha123",
  "first_name": "João",
  "last_name": "Silva",
  "id_distrito": 1
}
```

### `GET /api/usuarios/{id}/`
Detalhes de um usuário específico.

### `PUT /api/usuarios/{id}/`
Atualizar usuário.

### `DELETE /api/usuarios/{id}/`
Remover usuário (apenas admin).

### `PUT /api/usuarios/alterar-senha/`
Alterar senha do usuário logado.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "old_password": "senha_atual",
  "new_password": "nova_senha"
}
```

---

## 📍 Localização

### Províncias

#### `GET /api/provincias/`
Lista todas as províncias (público).

**Response:**
```json
[
  {
    "id": 1,
    "nome": "Maputo"
  },
  {
    "id": 2,
    "nome": "Gaza"
  }
]
```

#### `GET /api/provincias/{id}/`
Detalhes de uma província.

#### `POST /api/provincias/`
Criar nova província (apenas admin).

#### `PUT /api/provincias/{id}/`
Atualizar província (apenas admin).

#### `DELETE /api/provincias/{id}/`
Remover província (apenas admin).

### Distritos

#### `GET /api/distritos/`
Lista distritos com filtro opcional por província.

**Query Parameters:**
- `id` (opcional): ID da província para filtrar

**Response:**
```json
[
  {
    "id": 1,
    "nome": "KaMpfumo",
    "provincia": {
      "id": 1,
      "nome": "Maputo"
    }
  }
]
```

#### `GET /api/distritos/{id}/`
Detalhes de um distrito.

#### `POST /api/distritos/`
Criar novo distrito (apenas admin).

**Request Body:**
```json
{
  "nome": "Novo Distrito",
  "id_provincia": 1
}
```

---

## 💬 Chat

### Sessões de Chat

#### `GET /api/chat/sessoes/`
Lista todas as sessões do usuário logado.

**Headers:**
```
Authorization: Bearer <access_token> (opcional)
```

**Response:**
```json
[
  {
    "session_id": 1,
    "titulo": "Como plantar milho"
  }
]
```

#### `POST /api/chat/sessoes/`
Criar nova sessão de chat.

**Headers:**
```
Authorization: Bearer <access_token> (opcional)
```

**Response (usuário logado):**
```json
{
  "session_id": 1,
  "titulo": "Chat sem título",
  "user": {
    "id": 1,
    "first_name": "João",
    "last_name": "Silva"
  },
  "criado_em": "2024-01-01T10:00:00Z",
  "mensagens": []
}
```

**Response (anônimo):**
```json
{
  "titulo": "Chat Anônimo",
  "mensagens": []
}
```

### Mensagens do Chat

#### `GET /api/chat/mensagens/`
Lista mensagens de uma sessão específica.

**Headers:**
```
Authorization: Bearer <access_token> (opcional)
```

**Query Parameters:**
- `session_id` (obrigatório para ver mensagens): ID da sessão

**Response:**
```json
[
  {
    "message_id": 1,
    "mensagem": "Olá, como plantar milho?",
    "is_bot": false,
    "timestamp": "2024-01-01T10:00:00Z",
    "user": {
      "id": 1,
      "first_name": "João",
      "last_name": "Silva"
    },
    "session": {
      "session_id": 1,
      "titulo": "Como plantar milho"
    }
  },
  {
    "message_id": 2,
    "mensagem": "Para plantar milho, você precisa...",
    "is_bot": true,
    "timestamp": "2024-01-01T10:00:05Z",
    "user": null,
    "session": {
      "session_id": 1,
      "titulo": "Como plantar milho"
    }
  }
]
```

#### `POST /api/chat/mensagens/`
Enviar nova mensagem.

**Headers:**
```
Authorization: Bearer <access_token> (opcional)
```

**Request Body:**
```json
{
  "mensagem": "Como cuidar de tomates?",
  "session_id": 1
}
```

**Nota:** Se `session_id` não for fornecido para usuário logado, uma nova sessão será criada automaticamente.

---

## 🌱 Técnicas Agrícolas

### `GET /api/tecnicas/`
Lista todas as técnicas (público).

**Response:**
```json
[
  {
    "id": 1,
    "titulo": "Plantio consorciado",
    "descricao": "Técnica de plantar...",
    "votos_aprovacao": 85,
    "votos_rejeicao": 15,
    "total_votos": 100,
    "status": "VALIDADA"
  }
]
```

### `POST /api/tecnicas/`
Criar nova técnica (usuário autenticado).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "titulo": "Nova técnica de irrigação",
  "descricao": "Descrição detalhada da técnica..."
}
```

### `GET /api/tecnicas/{id}/`
Detalhes de uma técnica.

### `PUT /api/tecnicas/{id}/`
Atualizar técnica (apenas criador).

### `DELETE /api/tecnicas/{id}/`
Remover técnica (apenas criador ou admin).

### `POST /api/tecnicas/{tecnica_id}/votar/`
Votar em uma técnica.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "voto": "APROVA"
}
```

**Opções de voto:** `APROVA` ou `REPROVA`

**Regra de validação:**
- Quando total de votos ≥ 100:
  - Aprovação ≥ 80% → Status = `VALIDADA`
  - Rejeição ≥ 20% → Status = `DESCARTADA`

---

## 👥 Comunidade

### Sessões da Comunidade

#### `GET /api/comunidade/sessoes/`
Lista todas as sessões da comunidade.

**Headers:**
```
Authorization: Bearer <access_token>
```

#### `POST /api/comunidade/sessoes/`
Criar nova sessão na comunidade.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Request Body (form-data):**
- `titulo`: Título da discussão
- `primeira_mensagem`: Conteúdo da primeira mensagem
- `primeira_imagem` (opcional): Arquivo de imagem

### Mensagens da Comunidade

#### `GET /api/comunidade/mensagens/`
Lista mensagens da comunidade.

**Headers:**
```
Authorization: Bearer <access_token>
```

#### `POST /api/comunidade/mensagens/`
Criar nova mensagem ou resposta.

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Request Body (form-data):**
- `sessao`: ID da sessão
- `mensagem`: Conteúdo da mensagem
- `parent_message` (opcional): ID da mensagem pai (para respostas)
- `imagem` (opcional): Arquivo de imagem

**Regras:**
- Usuários podem editar mensagens próprias em até 10 minutos
- Apenas admin pode deletar mensagens de outros usuários

---

## 🛒 Marketplace

### Pedidos para Vendedor

#### `POST /api/marketplace/pedido-vendedor/`
Solicitar autorização para vender.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "contacto": "+258 84 123 4567",
  "mensagem": "Gostaria de vender produtos orgânicos"
}
```

#### `GET /api/marketplace/meu-pedido/`
Ver status do próprio pedido.

**Headers:**
```
Authorization: Bearer <access_token>
```

#### `GET /api/marketplace/pedidos/`
Listar todos os pedidos (apenas admin).

**Headers:**
```
Authorization: Bearer <access_token>
```

#### `POST /api/marketplace/pedidos/{pedido_id}/`
Aprovar ou rejeitar pedido (apenas admin).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "status": "APROVADO"
}
```

**Opções:** `APROVADO` ou `REJEITADO`

### Produtos

#### `GET /api/marketplace/produtos/`
Listar todos os produtos (público).

**Response:**
```json
[
  {
    "id": 1,
    "vendedor": "João Silva",
    "nome": "Tomate orgânico",
    "descricao": "Tomates frescos...",
    "preco": "150.00",
    "foto": "/media/produtos/tomate.jpg",
    "criado_em": "2024-01-01T10:00:00Z"
  }
]
```

#### `POST /api/marketplace/produtos/`
Criar novo produto (apenas usuários autorizados a vender).

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Request Body (form-data):**
- `nome`: Nome do produto
- `descricao`: Descrição detalhada
- `preco`: Preço em Meticais
- `foto`: Arquivo de imagem do produto

#### `GET /api/marketplace/produtos/{id}/`
Detalhes de um produto.

#### `PUT /api/marketplace/produtos/{id}/`
Atualizar produto (apenas vendedor ou admin).

#### `DELETE /api/marketplace/produtos/{id}/`
Remover produto (apenas vendedor ou admin).

---

## 📊 Códigos de Status

| Código | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Erro nos dados enviados |
| 401 | Unauthorized - Token ausente ou inválido |
| 403 | Forbidden - Sem permissão para a ação |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro no servidor |

## 🔐 Permissões por Tipo de Usuário

| Ação | Anônimo | Agricultor | Admin |
|------|---------|------------|-------|
| Ler províncias/distritos | ✅ | ✅ | ✅ |
| Criar/editar localizações | ❌ | ❌ | ✅ |
| Usar chat | ✅ | ✅ | ✅ |
| Criar técnicas | ❌ | ✅ | ✅ |
| Votar em técnicas | ❌ | ✅ | ✅ |
| Participar comunidade | ❌ | ✅ | ✅ |
| Solicitar venda | ❌ | ✅ | ✅ |
| Aprovar vendedores | ❌ | ❌ | ✅ |
| Criar produtos | ❌ | ✅* | ✅ |

*Apenas se `pode_vender = true`

**NB:** A comunidade é o feed
