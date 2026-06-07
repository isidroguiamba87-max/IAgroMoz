# 🌾 Identidade Visual IAgroMOZ

## 🎨 Paleta de Cores

### Cores Principais
```css
--agro-dark: #1a4d2e      /* Verde escuro - Agricultura, confiança */
--agro-primary: #2d5f3f   /* Verde principal - Crescimento */
--agro-light: #4f8a5b     /* Verde claro - Vitalidade */
--agro-accent: #7cb342    /* Verde accent - Destaque */
```

### Cores de Solo
```css
--soil-dark: #6b5b4a      /* Castanho terra - Solo */
--soil-light: #d4c5b0     /* Bege claro - Natural */
--soil-cream: #f5f1e8     /* Creme - Papel reciclado */
```

### Cores Tecnológicas (IA)
```css
--tech-blue: #3b82f6      /* Azul tecnológico */
--tech-cyan: #06b6d4      /* Ciano - Inovação */
```

### Cores de Colheita
```css
--harvest-yellow: #fbbf24 /* Amarelo suave - Sol */
--harvest-gold: #f59e0b   /* Dourado - Colheita */
```

---

## 🏗️ Componentes Únicos

### 1. AgroCard
Card com identidade agrícola:
- Barra verde no topo
- Badge de região (📍 Chimoio – Manica)
- Ícone de cultura (🌱 Plantação, 🐄 Pecuária, 🐓 Avicultura)
- Textura de solo sutil
- Hover com elevação suave

### 2. RegionBadge
Badge de localização moçambicana:
- Fundo bege/creme
- Ícone de localização
- Formato: "📍 Cidade – Província"

### 3. CultureIcon
Ícones de tipo de cultura:
- 🌱 Plantação
- 🐄 Pecuária
- 🐓 Avicultura
- 🥬 Horticultura
- 🍎 Fruticultura

### 4. ChatMessage
Mensagens diferenciadas:
- IA: Fundo azul claro, borda azul, ícone 🤖
- Usuário: Fundo creme, borda verde
- Não parece WhatsApp!

### 5. MobileNav
Navegação inferior mobile-first:
- 🏠 Feed
- 🤖 IA
- 📍 Recomendações
- 🛒 Mercado (com pulse animation)

---

## ✨ Micro-animações

### 1. Pulse Glow (Marketplace)
```css
.pulse-market {
  animation: pulse-glow 2s infinite;
}
```
Destaque sutil no ícone do marketplace.

### 2. Loading Plant
```css
.loading-plant {
  animation: grow-plant 1.5s ease-in-out infinite;
}
```
Planta crescendo como loading.

### 3. Typing Indicator (IA)
```css
.typing-indicator span {
  animation: typing-dots 1.4s infinite;
}
```
Três pontos animados quando IA está "digitando".

### 4. Click Scale
```css
.click-scale:active {
  transform: scale(0.95);
}
```
Feedback tátil ao clicar.

---

## 🎯 Diferenciadores

### ❌ O que NÃO é:
- Instagram verde
- Marketplace genérico (OLX)
- Sistema institucional pesado
- WhatsApp agrícola

### ✅ O que É:
- Rede social agrícola moçambicana
- Assistente IA especializado
- Marketplace com identidade própria
- Moderno mas rural

---

## 📱 Layout Mobile-First

### Navbar Inferior
```
┌─────────────────────────────┐
│                             │
│      Conteúdo Principal     │
│                             │
└─────────────────────────────┘
┌─────┬─────┬─────┬─────────┐
│ 🏠  │ 🤖  │ 📍  │ 🛒 (*)  │
│Feed │ IA  │Reco │Mercado  │
└─────┴─────┴─────┴─────────┘
```
(*) Com animação pulse

---

## 🌾 Texturas e Backgrounds

### Textura de Papel Reciclado
```css
body::before {
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(107, 91, 74, 0.02) 2px,
    rgba(107, 91, 74, 0.02) 4px
  );
}
```

### Textura de Solo
```css
.soil-texture {
  background-image: 
    radial-gradient(circle, rgba(107, 91, 74, 0.03) 0%, transparent 50%);
}
```

---

## 🎨 Exemplos de Uso

### Feed (Rede Social)
```jsx
<AgroCard
  title="Colheita de Milho"
  region="Chimoio"
  province="Manica"
  cultureType="plantacao"
  author="João Silva"
/>
```

### Chat IA
```jsx
<ChatMessage
  message="Como plantar milho?"
  isAI={false}
/>
<TypingIndicator />
<ChatMessage
  message="Recomendo plantar entre outubro e dezembro..."
  isAI={true}
/>
```

### Marketplace
```jsx
<div className="agro-card">
  <span className="pulse-market">🛒</span>
  <h3>Sementes de Milho</h3>
  <RegionBadge region="Maputo" province="Maputo" />
</div>
```

---

## 🚀 Implementação

### 1. Instalar dependências
```bash
cd react-app
npm install
```

### 2. Executar
```bash
npm run dev
```

### 3. Acessar
```
http://localhost:3000
```

---

## 📊 Estrutura de Páginas

### Feed (/)
- Cards de posts agrícolas
- Badge de região
- Ícone de cultura
- Interações (👍 💬)

### Chat IA (/chat)
- Mensagens diferenciadas
- Typing indicator
- Botão tecnológico (azul)

### Marketplace (/marketplace)
- Categorias: Sementes, Fertilizantes, Animais, Equipamentos
- Cards de produtos
- Pulse animation no ícone

### Recomendações (/recommendations)
- Mapa de Moçambique
- Recomendações por região
- Alertas climáticos

---

## 🎯 Princípios de Design

1. **Moderno mas Rural**: Tecnologia sem perder a essência agrícola
2. **Local**: Identidade moçambicana (regiões, províncias)
3. **Tecnológico**: IA com visual diferenciado (azul)
4. **Sofisticado**: Animações sutis, não exageradas
5. **Único**: Não copiar Instagram, WhatsApp ou OLX

---

## 🌱 Próximos Passos

- [ ] Adicionar mapa de Moçambique
- [ ] Implementar sistema de notificações
- [ ] Criar página de perfil do agricultor
- [ ] Adicionar filtros avançados no marketplace
- [ ] Implementar chat em tempo real
- [ ] Adicionar gráficos de recomendações

---

## 📞 Contato

Para dúvidas sobre a identidade visual:
- Email: sheltonTomas@gmail.com
- Telefone: +258 87 807 0526

---

**IAgroMOZ** - Agricultura Inteligente Moçambicana 🇲🇿🌾
