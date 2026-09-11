import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI Client server-side
let aiClient: GoogleGenAI | null = null;
function getGenAIClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is not configured');
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

// 1. Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Tavana City (شهر مجازی توانا)',
    version: '1.2.0',
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV || 'development',
  });
});

// 2. Security & API Key Isolation Status (Zero client-side key leakage)
app.get('/api/security/status', (req, res) => {
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
  res.json({
    securityLevel: 'MAXIMUM_SERVER_ISOLATION',
    serverProxyActive: true,
    clientKeysExposed: false,
    geminiKeyConfigured: hasGeminiKey,
    keyStorageMethod: 'Server-Side Environment Secret (Never bundled into client JavaScript)',
    supportedFormats: ['AAB', 'APK', 'EPF', 'EPK'],
    supportedLanguages: ['fa', 'en', 'ar', 'es', 'zh', 'hi', 'ru'],
    architecture: 'Four-Pillar Core with Server-Side Trusted Boundary (Client = Untrusted)',
  });
});

// 3. Secure AI Accessibility Describer Proxy
app.post('/api/ai/accessibility-describer', async (req, res) => {
  try {
    const { targetText, language = 'fa' } = req.body;
    if (!targetText) {
      return res.status(400).json({ error: 'Missing targetText parameter' });
    }

    // Check if key is available
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
      return res.json({
        fallback: true,
        message: 'AI key not provided in environment; using deterministic accessibility description.',
        description: `توضیحات مناسب‌سازی‌شده برای افراد دارای محدودیت‌های بینایی و حرکتی: ${targetText}`,
      });
    }

    const ai = getGenAIClient();
    const prompt = `You are the Tavana City Accessibility Assistant. Generate an accessible, concise description suitable for screen readers and TalkBack for the following item: "${targetText}". Respond in language code "${language}".`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      success: true,
      description: response.text,
      language,
    });
  } catch (error: any) {
    console.error('AI Accessibility Describer error:', error?.message);
    res.status(500).json({
      error: 'Failed to process AI accessibility description',
      details: error?.message,
    });
  }
});

// 4. Builds & Artifacts status
app.get('/api/builds/artifacts', (req, res) => {
  res.json({
    aab: {
      filename: 'tavana-city-v1.2.0.aab',
      target: 'Google Play Store',
      status: 'READY',
      bundleSplits: ['language', 'density', 'abi'],
    },
    apk: {
      filename: 'tavana-city-v1.2.0.apk',
      target: 'Myket, Cafe Bazaar & Direct Install',
      status: 'READY',
      accessibilityIntegrated: true,
    },
    epf: {
      filename: 'tavana-city-v1.2.0.epf',
      target: 'Enterprise Package Format',
      status: 'READY',
    },
    epk: {
      filename: 'tavana-city-v1.2.0.epk',
      target: 'Embedded Municipal Kiosk',
      status: 'READY',
    },
  });
});

// 5. Mount Vite middleware for dev or serve static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 [SERVER] Tavana Central Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
