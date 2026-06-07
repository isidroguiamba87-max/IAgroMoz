# 🚀 GUIA DE INÍCIO RÁPIDO - IAGROMOZ

## ✅ Status do Projeto

O projeto está **100% pronto** para uso! Tudo foi implementado e integrado:

- ✅ Backend Django com API REST completa
- ✅ Frontend React com Vite
- ✅ Autenticação JWT funcional
- ✅ Sistema de votação 80/20 para técnicas
- ✅ Feed de comunidade (perguntas e respostas)
- ✅ Chat com IA
- ✅ Marketplace de produtos
- ✅ Páginas de detalhes interativas
- ✅ Design com identidade visual IAgroMOZ
- ✅ Integração completa entre frontend e backend

## 🎯 Como Iniciar (3 Passos)

### PASSO 1: Iniciar o Backend Django

```bash
# 1. Entrar na pasta do backend
cd backend

# 2. Criar ambiente virtual (primeira vez)
python -m venv venv

# 3. Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 4. Instalar dependências (primeira vez)
pip install -r requirements.txt

# 5. Criar banco de dados (primeira vez)
python manage.py makemigrations
python manage.py migrate

# 6. Criar superusuário para admin (primeira vez)
python manage.py createsuperuser

# 7. Iniciar servidor
python manage.py runserver
```

✅ Backend rodando em: `http://localhost:8000`
✅ Admin Django em: `http://localhost:8000/admin`

### PASSO 2: Iniciar o Frontend React

Abra um NOVO terminal (deixe o backend rodando):

```bash
# 1. Entrar na pasta do React
cd react-app

# 2. Instalar dependências (primeira vez)
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev
```

✅ Frontend rodando em: `http://localhost:5173`

### PASSO 3: Usar a Aplicação

1. Abra o navegador em `http://localhost:5173`
2. Clique em "Registrar-se"
3. Preencha o formulário (escolha província e distrito)
4. Faça login
5. Explore os módulos:
   - 🏠 Feed - Comunidade de perguntas
   - 💬 Chat - Assistente IA
   - 🛒 Mercado - Produtos agrícolas
   - 📚 Técnicas - Votação de técnicas

## 📋 Checklist de Primeira Execução

- [ ] Backend instalado e rodando
- [ ] Banco de dados criado (migrate)
- [ ] Superusuário criado
- [ ] Frontend instalado e rodando
- [ ] Consegue acessar `http://localhost:5173`
- [ ] Consegue registrar novo usuário
- [ ] Consegue fazer login

## 🔧 Comandos Úteis

### Backend (Django)

```bash
# Ver todas as rotas da API
python manage.py show_urls

# Criar dados de teste
python manage.py shell
>>> from api.models import Province, District
>>> Province.objects.create(name="Maputo")

# Resetar banco de dados
python manage.py flush

# Fazer backup do banco
python manage.py dumpdata > backup.json
```

### Frontend (React)

```bash
# Build para produção
npm run build

# Preview do build
npm run preview

# Limpar cache
rm -rf node_modules package-lock.json
npm install
```

## 🐛 Problemas Comuns

### Erro: "Port 8000 already in use"
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <numero_do_pid> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9
```

### Erro: "CORS policy"
- Verifique se o backend está rodando
- Confirme que `CORS_ALLOW_ALL_ORIGINS = True` em `backend/config/settings.py`

### Erro: "Module not found"
```bash
# Backend
pip install -r requirements.txt

# Frontend
cd react-app
npm install
```

### Erro: "No such table"
```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

## 📡 Testando a API

### Com cURL:

```bash
# Registrar usuário
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "joao",
    "email": "joao@email.com",
    "first_name": "João",
    "last_name": "Silva",
    "password": "senha123",
    "phone": "+258841234567",
    "district": 1
  }'

# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "joao", "password": "senha123"}'

# Listar técnicas
curl http://localhost:8000/api/techniques/

# Listar províncias
curl http://localhost:8000/api/provinces/
```

### Com Postman/Insomnia:

1. Importe a coleção de endpoints do `backend/README.md`
2. Configure a variável `base_url` = `http://localhost:8000/api`
3. Teste cada endpoint

## 🎨 Estrutura de Pastas

```
iagromoz/
├── backend/              # Django REST API
│   ├── api/             # App principal
│   │   ├── models/      # Modelos do banco
│   │   ├── serializers/ # Serializers DRF
│   │   ├── views/       # Views da API
│   │   └── urls.py      # Rotas da API
│   ├── config/          # Configurações Django
│   ├── manage.py
│   └── requirements.txt
│
├── react-app/           # Frontend React + Vite
│   ├── src/
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── pages/       # Páginas da aplicação
│   │   ├── services/    # API service
│   │   ├── App.jsx      # Componente raiz
│   │   └── main.jsx     # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── README.md            # Documentação principal
```

## 🔐 Credenciais de Teste

Após criar o superusuário, você pode:

1. Acessar o admin: `http://localhost:8000/admin`
2. Criar dados de teste (províncias, distritos, técnicas)
3. Gerenciar usuários e conteúdo

## 📱 Módulos Disponíveis

### 1. Feed (Comunidade)
- Ver perguntas da comunidade
- Criar novas perguntas
- Responder perguntas
- Ver detalhes completos

### 2. Chat IA
- Interface de chat com assistente agrícola
- Typing indicator
- Design tecnológico

### 3. Marketplace
- Listar produtos
- Filtrar por categoria
- Ver detalhes do produto
- Calcular quantidade e total
- Contatar vendedor (WhatsApp)

### 4. Técnicas Agrícolas
- Listar técnicas
- Votar (aprovar/reprovar)
- Sistema 80/20 de aprovação
- Ver estatísticas de votação

## 🎯 Próximos Passos

1. ✅ Projeto está pronto para uso
2. 📝 Adicione dados de teste no admin
3. 🧪 Teste todos os módulos
4. 🎨 Personalize cores/textos se necessário
5. 🚀 Deploy em produção quando estiver satisfeito

## 📞 Suporte

Se tiver problemas:
1. Verifique se ambos os servidores estão rodando
2. Confira o console do navegador (F12)
3. Veja os logs do Django no terminal
4. Consulte os arquivos README.md

## 🎉 Pronto!

Seu projeto IAgroMOZ está 100% funcional e pronto para uso!

Basta seguir os 3 passos acima e começar a usar. 🚀
