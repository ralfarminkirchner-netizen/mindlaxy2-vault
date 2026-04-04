/**
 * MiNDLAXY Shared Core — Unified LLM Provider API
 *
 * Ein einziger Aufruf für alle Provider:
 *   OpenAI, Anthropic, Gemini, DeepSeek, Grok
 *
 * Streaming optional via onChunk callback.
 * Extrahiert aus BRaiNSTORM SPiRAL, jetzt shared für alle Apps.
 */

import { getApiKey, getModel } from '../config/settings.js';

// ─── Provider Registry ──────────────────────────────────────────────────────

const PROVIDER_CONFIG = {
  openai: {
    baseUrl: 'https://api.openai.com/v1',
    protocol: 'oai',
  },
  deepseek: {
    baseUrl: 'https://api.deepseek.com/v1',
    protocol: 'oai',
  },
  grok: {
    baseUrl: 'https://api.x.ai/v1',
    protocol: 'oai',
  },
  gemini: {
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    protocol: 'gemini',
  },
  anthropic: {
    baseUrl: 'https://api.anthropic.com/v1',
    protocol: 'anthropic',
  },
};

// ─── OpenAI-Compatible Call (OAI, DeepSeek, Grok) ──────────────────────────

/**
 * Ruft einen OpenAI-kompatiblen Provider auf.
 *
 * @param {Object[]} messages — [{role, content}]
 * @param {string} apiKey
 * @param {string} baseUrl
 * @param {string} model
 * @param {string} [systemPrompt]
 * @param {function} [onChunk] — (fullText, delta) => void
 * @returns {Promise<string>}
 */
async function callOAI(messages, apiKey, baseUrl, model, systemPrompt, onChunk) {
  const msgs = systemPrompt
    ? [{ role: 'system', content: systemPrompt }, ...messages]
    : messages;

  const useStream = !!onChunk;
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: msgs,
      max_tokens: 1500,
      stream: useStream,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => res.statusText);
    throw new Error(`${model}: ${res.status} — ${err}`);
  }

  if (!useStream) {
    const json = await res.json();
    return json.choices?.[0]?.message?.content || '';
  }

  // SSE Streaming
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let full = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      if (data === '[DONE]') break;
      try {
        const parsed = JSON.parse(data);
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) {
          full += delta;
          onChunk(full, delta);
        }
      } catch (e) {}
    }
  }

  return full;
}

// ─── Anthropic Call ─────────────────────────────────────────────────────────

/**
 * Ruft die Anthropic Messages API auf.
 *
 * @param {Object[]} messages — [{role, content}]
 * @param {string} apiKey
 * @param {string} model
 * @param {string} [systemPrompt]
 * @param {function} [onChunk] — (fullText, delta) => void
 * @returns {Promise<string>}
 */
async function callAnthropic(messages, apiKey, model, systemPrompt, onChunk) {
  const useStream = !!onChunk;
  const body = {
    model: model || 'claude-sonnet-4-6',
    max_tokens: 1500,
    messages: messages.map(m => ({ role: m.role, content: m.content })),
    stream: useStream,
  };
  if (systemPrompt) body.system = systemPrompt;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => res.statusText);
    throw new Error(`Claude: ${res.status} — ${err}`);
  }

  if (!useStream) {
    const json = await res.json();
    return json.content?.[0]?.text || '';
  }

  // SSE Streaming
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let full = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      try {
        const parsed = JSON.parse(data);
        if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
          full += parsed.delta.text;
          onChunk(full, parsed.delta.text);
        }
      } catch (e) {}
    }
  }

  return full;
}

// ─── Gemini Call ────────────────────────────────────────────────────────────

/**
 * Ruft die Gemini API auf.
 *
 * @param {Object[]} messages — [{role, content}]
 * @param {string} apiKey
 * @param {string} model
 * @param {string} [systemPrompt]
 * @returns {Promise<string>}
 */
async function callGemini(messages, apiKey, model, systemPrompt) {
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const body = { contents };
  if (systemPrompt) {
    body.systemInstruction = { parts: [{ text: systemPrompt }] };
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model || 'gemini-2.0-flash'}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => res.statusText);
    throw new Error(`Gemini: ${res.status} — ${err}`);
  }

  const json = await res.json();
  return json.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

// ─── Unified Call ───────────────────────────────────────────────────────────

/**
 * Einheitlicher LLM-Aufruf — egal welcher Provider.
 *
 * @param {string} provider — 'openai', 'anthropic', 'gemini', 'deepseek', 'grok'
 * @param {string} systemPrompt
 * @param {string|Object[]} userInput — String (einzelne Frage) oder Messages-Array
 * @param {Object} [options]
 * @param {function} [options.onChunk] — (fullText, delta) => void
 * @param {string} [options.model] — Override Modell
 * @returns {Promise<string>}
 */
export async function callProvider(provider, systemPrompt, userInput, options = {}) {
  const apiKey = getApiKey(provider);
  if (!apiKey) throw new Error(`Kein API-Key für ${provider}`);

  const model = options.model || getModel(provider);
  const messages = typeof userInput === 'string'
    ? [{ role: 'user', content: userInput }]
    : userInput;

  const config = PROVIDER_CONFIG[provider];
  if (!config) throw new Error(`Unbekannter Provider: ${provider}`);

  switch (config.protocol) {
    case 'oai':
      return callOAI(messages, apiKey, config.baseUrl, model, systemPrompt, options.onChunk);
    case 'anthropic':
      return callAnthropic(messages, apiKey, model, systemPrompt, options.onChunk);
    case 'gemini':
      return callGemini(messages, apiKey, model, systemPrompt);
    default:
      throw new Error(`Unbekanntes Protokoll: ${config.protocol}`);
  }
}

/**
 * Mehrere Provider parallel aufrufen.
 *
 * @param {string[]} providers
 * @param {string} systemPrompt
 * @param {string} userInput
 * @param {Object} [options]
 * @returns {Promise<{provider: string, content: string, error?: string}[]>}
 */
export async function callAllProviders(providers, systemPrompt, userInput, options = {}) {
  const results = await Promise.allSettled(
    providers.map(p =>
      callProvider(p, systemPrompt, userInput, options)
        .then(content => ({ provider: p, content }))
    )
  );

  return results.map((r, i) =>
    r.status === 'fulfilled'
      ? r.value
      : { provider: providers[i], content: '', error: r.reason?.message || 'Fehler' }
  );
}
