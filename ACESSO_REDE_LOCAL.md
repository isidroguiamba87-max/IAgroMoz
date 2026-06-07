# 📱 Acessar IAgroMOZ de Outros Dispositivos

## Configuração Completa

### 1. Configuração do Vite (✅ Já feito)
O arquivo `vite.config.js` já está configurado com `host: '0.0.0.0'` para aceitar conexões externas.

### 2. Descobrir o IP do Computador

#### Windows:
```bash
ipconfig
```
Procure por "Endereço IPv4" (exemplo: `192.168.1.100`)

#### Linux/Mac:
```bash
ifconfig
# ou
ip addr show
```

### 3. Iniciar o Servidor

```bash
cd react-app
npm run dev
```

Você verá algo como:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.1.100:3000/
```

### 4. Acessar de Outro Dispositivo

No celular, tablet ou outro computador na mesma rede Wi-Fi:

```
http://192.168.1.100:3000
```

(Substitua `192.168.1.100` pelo IP do seu computador)

---

## 🔥 Firewall do Windows

Se não conseguir acessar, pode ser o firewall bloqueando. Siga estes passos:

### Opção 1: Permitir Node.js no Firewall

1. Abra "Firewall do Windows Defender"
2. Clique em "Permitir um aplicativo ou recurso"
3. Clique em "Alterar configurações"
4. Procure por "Node.js" e marque as caixas "Privado" e "Público"
5. Se não encontrar, clique em "Permitir outro aplicativo" e adicione:
   ```
   C:\Program Files\nodejs\node.exe
   ```

### Opção 2: Criar Regra Específica

Execute no PowerShell como Administrador:

```powershell
New-NetFirewallRule -DisplayName "Vite Dev Server" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
```

### Opção 3: Desabilitar Temporariamente (não recomendado)

Apenas para testes:
1. Painel de Controle → Firewall do Windows
2. Desativar firewall (lembre-se de reativar depois!)

---

## 🌐 Backend Django (Porta 8000)

Se também quiser acessar o backend de outros dispositivos:

### 1. Editar `backend/config/settings.py`

```python
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '192.168.1.100', '*']
```

(Substitua `192.168.1.100` pelo seu IP ou use `'*'` para permitir todos)

### 2. Iniciar Django com IP específico

```bash
cd backend
python manage.py runserver 0.0.0.0:8000
```

### 3. Permitir no Firewall

```powershell
New-NetFirewallRule -DisplayName "Django Dev Server" -Direction Inbound -LocalPort 8000 -Protocol TCP -Action Allow
```

### 4. Acessar de outro dispositivo

```
http://192.168.1.100:8000/api/
```

---

## 📱 Testando no Celular

1. Conecte o celular na mesma rede Wi-Fi
2. Abra o navegador
3. Digite: `http://SEU_IP:3000`
4. A aplicação deve carregar normalmente

---

## ⚠️ Problemas Comuns

### "Não consigo acessar"
- ✅ Verifique se está na mesma rede Wi-Fi
- ✅ Confirme o IP com `ipconfig`
- ✅ Verifique se o servidor está rodando
- ✅ Desative temporariamente o firewall para testar

### "Conexão recusada"
- ✅ Firewall está bloqueando a porta 3000
- ✅ Siga os passos de configuração do firewall acima

### "API não funciona"
- ✅ Configure o backend Django também
- ✅ Atualize `ALLOWED_HOSTS` no Django
- ✅ Inicie Django com `0.0.0.0:8000`

---

## 🚀 Produção

Para deploy em produção, use:
- Frontend: Vercel, Netlify, ou servidor próprio
- Backend: Heroku, DigitalOcean, AWS, ou servidor próprio
- Nunca use `0.0.0.0` e `ALLOWED_HOSTS = ['*']` em produção!
