# 📦 Instalação do Bootstrap Icons

## Comando para Instalar

Execute este comando na pasta `react-app`:

```bash
cd react-app
npm install bootstrap-icons
```

## Ou usando o CDN (já configurado)

O Bootstrap Icons já está configurado via CDN no arquivo `react-app/src/index.css`:

```css
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');
```

## ✅ Não precisa instalar nada!

O CDN já está funcionando. Basta executar:

```bash
cd react-app
npm run dev
```

## 🎨 Ícones Substituídos

### Antes (Emojis) → Depois (Bootstrap Icons)

| Componente | Emoji | Ícone Bootstrap |
|------------|-------|-----------------|
| Usuário | 👤 | `bi-person-fill` |
| Vendedor | 🛒 | `bi-shop` |
| Chat IA | 🤖 | `bi-robot` |
| Câmera | 📷 | `bi-camera` |
| Enviar | ↑ | `bi-arrow-up` |
| Menu | ☰ | `bi-list` |
| Fechar | ✕ | `bi-x-lg` |
| Adicionar | + | `bi-plus-lg` |
| Configurações | ⚙️ | `bi-gear` |
| Ajuda | ❓ | `bi-question-circle` |
| Casa/Feed | 🏠 | `bi-house-fill` |
| Mercado | 🛒 | `bi-shop` |
| Técnicas | 💡 | `bi-lightbulb-fill` |
| Dashboard | 📊 | `bi-graph-up` |
| Chat | 💬 | `bi-chat-left-text` |
| Online | ● | `bi-circle-fill` |
| Relógio | 🕐 | `bi-clock` |
| Lâmpada | 💡 | `bi-lightbulb` |
| Grade | ⊞ | `bi-grid-3x3-gap-fill` |

## 📚 Documentação

Veja todos os ícones disponíveis em:
https://icons.getbootstrap.com/

## 🎯 Uso nos Componentes

### Exemplo básico:
```jsx
<i className="bi bi-robot"></i>
```

### Com tamanho:
```jsx
<i className="bi bi-robot text-xl"></i>
<i className="bi bi-robot text-2xl"></i>
```

### Com cor:
```jsx
<i className="bi bi-robot text-green-600"></i>
<i className="bi bi-robot text-blue-500"></i>
```

## ✅ Arquivos Atualizados

1. ✅ `react-app/package.json` - Dependência adicionada
2. ✅ `react-app/src/index.css` - Import do CDN
3. ✅ `react-app/src/pages/ChatAI.jsx` - Ícones substituídos
4. ✅ `react-app/src/components/ChatMessage.jsx` - Ícones substituídos

## 🚀 Próximos Passos

Substitua emojis nos outros componentes:
- Feed.jsx
- Marketplace.jsx
- Register.jsx
- Login.jsx
- MobileNav.jsx
- Etc.
