export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY não configurada no Vercel." });
  }

  const hoje = new Date().toLocaleDateString("pt-BR", {
    timeZone: "America/Manaus",
    day: "2-digit", month: "2-digit", year: "numeric",
  });

  const prompt = `Liste 10 vagas de estágio em TI em Manaus/AM. Empresas como Sidia, Samsung, CIEE, Indeed, LinkedIn. Retorne SOMENTE JSON puro sem markdown: {"data_atualizacao":"${hoje}","total":10,"vagas":[{"titulo":"","empresa":"","local":"Manaus, AM","modalidade":"Presencial","area":"Desenvolvimento","descricao":"","requisitos":[""],"fonte":"","link":null,"data_publicacao":null}]}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 4096 },
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
      if (match) parsed = JSON.parse(match[0]);
      else return res.status(500).json({ error: "JSON inválido", raw: text.slice(0, 300) });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
