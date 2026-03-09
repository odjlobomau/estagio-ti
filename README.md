# 🎓 Estágios em TI — Manaus/AM

Painel automático de vagas de estágio em TI/Computação em Manaus, com busca em tempo real via IA (Google Gemini + Google Search).

## ✨ Funcionalidades

- 🤖 Busca automática ao abrir a página (Gemini + Google Search)
- 🔍 Filtros por área, modalidade, fonte e busca textual
- 📲 Compartilhamento via WhatsApp de cada vaga
- 🌙 Dark mode / Light mode
- 📱 Responsivo para mobile

---

## 🚀 Deploy no Netlify (Passo a Passo)

### 1. Subir o projeto no GitHub

1. Crie um repositório no [GitHub](https://github.com/new)
2. Faça upload de todos os arquivos deste projeto

### 2. Conectar ao Netlify

1. Acesse [netlify.com](https://netlify.com) e faça login
2. Clique em **"Add new site" → "Import an existing project"**
3. Escolha **GitHub** e selecione o repositório
4. As configurações de build serão detectadas automaticamente pelo `netlify.toml`
5. Clique em **"Deploy site"**

### 3. Configurar a API Key do Gemini

1. Obtenha sua chave em [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) (gratuito)
2. No painel do Netlify, vá em:
   **Site settings → Environment variables → Add a variable**
3. Configure:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** `sua-chave-aqui`
4. Clique em **Save**
5. Vá em **Deploys → Trigger deploy** para redeployar com a variável

---

## 📁 Estrutura do Projeto

```
estagio-ti-manaus/
├── public/
│   └── index.html          ← Página principal
├── netlify/
│   └── functions/
│       └── buscar-vagas.js ← Serverless function (chama Gemini API)
├── netlify.toml            ← Configuração do Netlify
├── package.json
└── README.md
```

---

## 🔧 Testar Localmente

```bash
npm install
npx netlify dev
```

Acesse: http://localhost:8888

---

## 💰 Custos

- **Netlify:** Gratuito (plano Free)
- **Gemini API:** Gratuito até 1.500 requisições/dia (Flash model)

---

## 📬 Contato

Desenvolvido para estudantes de TI em Manaus, AM.
