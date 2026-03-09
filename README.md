# 🎓 Estágios em TI — Manaus/AM (Vercel)

Painel automático de vagas de estágio em TI/Computação em Manaus, com busca em tempo real via IA (Google Gemini + Google Search).

## 📁 Estrutura do Projeto

```
estagio-ti-manaus/
├── api/
│   └── buscar-vagas.js   ← Serverless function (Vercel)
├── index.html             ← Página principal
├── vercel.json            ← Configuração do Vercel
└── README.md
```

---

## 🚀 Deploy no Vercel (Passo a Passo)

### 1. Subir no GitHub

1. Crie um repositório em [github.com](https://github.com/new)
2. Faça upload de **todos os arquivos** diretamente na raiz do repositório
   - `api/buscar-vagas.js`
   - `index.html`
   - `vercel.json`
   - `README.md`

> ⚠️ **Importante:** Os arquivos devem estar na **raiz** do repositório, não dentro de subpastas.

### 2. Conectar ao Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **"Add New Project"**
3. Selecione o repositório
4. Clique em **"Deploy"**

### 3. Configurar a API Key do Gemini

1. Obtenha sua chave gratuitamente em [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. No painel do Vercel, vá em:
   **Project Settings → Environment Variables**
3. Adicione:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** `sua-chave-aqui`
   - **Environment:** Production, Preview, Development (marque todos)
4. Clique em **Save**
5. Vá em **Deployments → Redeploy** para aplicar

---

## 💰 Custos

- **Vercel:** Gratuito (plano Hobby)
- **Gemini API:** Gratuito até 1.500 requisições/dia

---

## 🔧 Testar Localmente

```bash
npm i -g vercel
vercel dev
```

Acesse: http://localhost:3000
