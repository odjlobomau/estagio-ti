export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY não configurada no Vercel." });
  }

  const hoje = new Date().toLocaleDateString("pt-BR", {
    timeZone: "America/Manaus",
    day: "2-digit", month: "2-digit", year: "numeric",
  });

  const prompt = `Hoje é ${hoje}. Você é um agregador de vagas de estágio em TI em Manaus/AM, Brasil.

Pesquise na internet as vagas de estágio em TI, Ciência da Computação, Engenharia de Computação, Sistemas de Informação e áreas afins disponíveis AGORA em Manaus/AM.

Busque em: Indeed Brasil, LinkedIn, CIEE, Vagas.com, Catho, InfoJobs, Glassdoor, e sites de empresas de tecnologia de Manaus como Sidia, Samsung, Fieam, etc.

Retorne SOMENTE um JSON válido, sem texto extra, sem markdown, sem blocos de código. O JSON deve ter exatamente este formato:

{
  "data_atualizacao": "${hoje}",
  "total": <número inteiro>,
  "vagas": [
    {
      "titulo": "título da vaga",
      "empresa": "nome da empresa",
      "local": "Manaus, AM",
      "modalidade": "Presencial" ou "Remoto" ou "Híbrido",
      "area": "Desenvolvimento" ou "Testes" ou "Infraestrutura" ou "Design/UX" ou "Dados" ou "Suporte" ou "Pesquisa" ou "Outro",
      "descricao": "descrição breve da vaga em 1-2 frases",
      "requisitos": ["req1", "req2", "req3"],
      "fonte": "Indeed" ou "LinkedIn" ou "CIEE" ou "Sidia" ou "Vagas.com" ou outro,
      "link": "URL da vaga se disponível, senão null",
      "data_publicacao": "data aproximada ou null"
    }
  ]
}

Traga o máximo de vagas reais que encontrar (mínimo 5, idealmente 10-20). Se não encontrar vagas suficientes em Manaus, inclua vagas remotas de empresas brasileiras abertas a candidatos de Manaus. Não invente vagas — use apenas dados reais encontrados na pesquisa.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          tools: [{ google_search: {} }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 8192,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || "Erro na API Gemini" });
    }

    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    text = text.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        return res.status(500).json({ error: "Resposta da IA não pôde ser interpretada.", raw: text.slice(0, 500) });
      }
    }

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
