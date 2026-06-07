# 🚀 Guia Completo: Django + React - IAGROMOZ

## 📋 Visão Geral

Seu projeto agora está estruturado com:
- **Backend**: Django REST Framework (Python)
- **Frontend**: React + Vite (JavaScript)
- **Design**: Mantido do HTML original com Tailwind CSS

---

## 🏗️ Estrutura do Projeto

```
iagromoz-project/
├── backend/                    # Django Backend
│   ├── api/
│   │   ├── models/            # Modelos do banco de dados
│   │   ├── serializers/       # Serializers DRF
│   │   ├── views/             # Views e ViewSets
│   │   ├── admin.py           # Painel admin
│   │   └── urls.py            # URLs da API
│   ├── config/
│   │   ├── settings.py        # Configurações Django
│   │   └── urls.py            # URLs principais
│   ├── manage.py
│   └── requirements.txt
│
├── react-app/                  # React Frontend
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── pages/             # Páginas
│   │   ├── services/          # Serviços de API
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
└── *.html                      # HTML original (referência)
```

---

## 🔧 Instalação e Configuração

### 1️⃣ Backend (Django)

```bash
# Navegar para pasta backend
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Criar banco de dados
python manage.py makemigrations
python manage.py migrate

# Criar superusuário (admin)
python manage.py createsuperuser

# Executar servidor
python manage.py runserver
```

Backend rodando em: `http://localhost:8000`

### 2️⃣ Frontend (React)

```bash
# Navegar para pasta react-app
cd react-app

# Instalar dependências
npm install

# Executar servidor de desenvolvimento
npm run dev
```

Frontend rodando em: `http://localhost:3000` ou `http://localhost:5173`

---

## 📡 API Endpoints

### Autenticação
```
POST /api/auth/register/
POST /api/auth/login/
POST /api/auth/refresh/
```

### Localização
```
GET /api/provinces/
GET /api/districts/?province={id}
```

### Técnicas
```
GET    /api/techniques/
POST   /api/techniques/
GET    /api/techniques/{id}/
POST   /api/techniques/{id}/vote/
```

### Comunidade
```
GET    /api/questions/
POST   /api/questions/
POST   /api/answers/
POST   /api/answers/{id}/accept/
```

### Dashboard
```
GET /api/dashboard/
```

---

## 🎨 Mantendo o Design Original

O design do HTML foi preservado no React. Exemplo:

### HTML Original:
```html
<div class="glass-effect rounded-3xl shadow-2xl p-8">
    <h2 class="text-3xl font-bold text-gray-800">Login</h2>
    <!-- ... -->
</div>
```

### React Equivalente:
```jsx
<div className="glass-effect rounded-3xl shadow-2xl p-8">
    <h2 className="text-3xl font-bold text-gray-800">Login</h2>
    {/* ... */}
</div>
```

**Mudanças:**
- `class` → `className`
- Lógica JavaScript integrada com JSX
- Estado gerenciado com `useState`
- Requisições com `fetch` ou `axios`

---

## 🔐 Fluxo de Autenticação

### 1. Registro
```javascript
// Frontend
const response = await fetch('http://localhost:8000/api/auth/register/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        username: 'joao',
        email: 'joao@email.com',
        password: 'senha123',
        first_name: 'João',
        last_name: 'Silva',
        district: 1
    })
});
```

### 2. Login
```javascript
const response = await fetch('http://localhost:8000/api/auth/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        username: 'joao',
        password: 'senha123'
    })
});

const data = await response.json();
// data = { access: "token...", refresh: "token..." }

// Salvar tokens
localStorage.setItem('access_token', data.access);
localStorage.setItem('refresh_token', data.refresh);
```

### 3. Requisições Autenticadas
```javascript
const token = localStorage.getItem('access_token');

const response = await fetch('http://localhost:8000/api/techniques/', {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});
```

---

## 🗳️ Sistema de Votação (Regra 80/20)

### Backend (Django)
```python
# api/views/votes.py
votes = Vote.objects.filter(technique=technique)
total_votes = votes.count()
positive_votes = votes.filter(value=1).count()

if total_votes >= 100 and positive_votes >= 80:
    technique.approved = True
    technique.save()
```

### Frontend (React)
```jsx
const voteTechnique = async (techniqueId, value) => {
    const response = await fetch(
        `http://localhost:8000/api/techniques/${techniqueId}/vote/`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value }) // 1 ou -1
        }
    );
    
    const data = await response.json();
    if (data.approved) {
        alert('Técnica aprovada pela comunidade!');
    }
};
```

---

## 👥 Comunidade (Perguntas e Respostas)

### Criar Pergunta
```jsx
const createQuestion = async (title, body) => {
    await fetch('http://localhost:8000/api/questions/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, body })
    });
};
```

### Responder Pergunta
```jsx
const answerQuestion = async (questionId, body) => {
    await fetch('http://localhost:8000/api/answers/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question: questionId,
            body: body
        })
    });
};
```

---

## 📊 Dashboard Admin

### Backend
```python
# api/views/dashboard.py
class AdminDashboard(APIView):
    permission_classes = [permissions.IsAdminUser]
    
    def get(self, request):
        return Response({
            "users": User.objects.count(),
            "techniques": Technique.objects.count(),
            "approved_techniques": Technique.objects.filter(approved=True).count(),
            "questions": Question.objects.count(),
        })
```

### Frontend
```jsx
const Dashboard = () => {
    const [stats, setStats] = useState({});
    
    useEffect(() => {
        fetch('http://localhost:8000/api/dashboard/', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => setStats(data));
    }, []);
    
    return (
        <div>
            <h2>Total de Usuários: {stats.users}</h2>
            <h2>Técnicas: {stats.techniques}</h2>
        </div>
    );
};
```

---

## 🎯 Diferenças HTML vs React

| HTML | React |
|------|-------|
| `class="..."` | `className="..."` |
| `onclick="..."` | `onClick={...}` |
| `<input value="...">` | `<input value={state} onChange={...}>` |
| Múltiplos arquivos `.html` | Componentes `.jsx` |
| JavaScript inline | Lógica em funções/hooks |

---

## 🚀 Deploy

### Backend (Django)
1. Configurar PostgreSQL
2. `DEBUG = False`
3. Configurar `ALLOWED_HOSTS`
4. Usar Gunicorn + Nginx
5. Deploy em: Heroku, Railway, DigitalOcean

### Frontend (React)
1. `npm run build`
2. Deploy pasta `dist/` em: Vercel, Netlify, GitHub Pages

---

## ✅ Checklist

### Backend
- [x] Modelos criados
- [x] Serializers configurados
- [x] Views implementadas
- [x] URLs mapeadas
- [x] Admin configurado
- [x] CORS habilitado
- [ ] Testes criados
- [ ] Deploy configurado

### Frontend
- [x] Estrutura React criada
- [x] Serviço de API implementado
- [x] Páginas principais criadas
- [x] Design mantido
- [ ] Todas as funcionalidades migradas
- [ ] Testes criados
- [ ] Deploy configurado

---

## 📞 Suporte

- Email: sheltonTomas@gmail.com
- Telefone: +258 87 807 0526

Seu projeto está pronto para desenvolvimento! 🎉
