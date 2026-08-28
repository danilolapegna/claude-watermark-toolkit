const BLOCKED_TERMS = ["anthropic", "claude"];

export function assertNonAnthropic({ provider, baseUrl = "", model = "" }) {
  const joined = `${provider || ""} ${baseUrl} ${model}`.toLocaleLowerCase();
  const blocked = BLOCKED_TERMS.find((term) => joined.includes(term));
  if (blocked) {
    throw new Error(`Blocked provider configuration: ${blocked}. This toolkit does not use Anthropic systems.`);
  }
  return true;
}

async function requestJson(url, init, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    const body = await response.text();
    if (!response.ok) throw new Error(`Provider returned HTTP ${response.status}: ${body.slice(0, 300)}`);
    return JSON.parse(body);
  } catch (error) {
    if (error.name === "AbortError") throw new Error(`Provider timed out after ${timeoutMs} ms.`);
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

function joinUrl(baseUrl, path) {
  return `${baseUrl.replace(/\/+$/u, "")}/${path.replace(/^\/+/, "")}`;
}

export function createProvider(config) {
  const provider = config.provider;
  const timeoutMs = Number(config.timeoutMs || 60_000);
  assertNonAnthropic(config);

  if (provider === "ollama") {
    const baseUrl = config.baseUrl || "http://127.0.0.1:11434";
    const model = config.model;
    if (!model) throw new Error("Ollama model is required.");
    assertNonAnthropic({ provider, baseUrl, model });

    return {
      id: "ollama",
      async complete(messages, options = {}) {
        const data = await requestJson(joinUrl(baseUrl, "/api/chat"), {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ model, messages, stream: false, options: { temperature: options.temperature ?? 0.8 } }),
        }, timeoutMs);
        if (!data.message?.content) throw new Error("Ollama returned no message content.");
        return { text: data.message.content, usage: data.prompt_eval_count ? { inputTokens: data.prompt_eval_count, outputTokens: data.eval_count } : null };
      },
    };
  }

  if (provider === "openai-compatible") {
    const baseUrl = config.baseUrl || "https://api.openai.com/v1";
    const model = config.model;
    if (!model) throw new Error("OpenAI-compatible model is required.");
    assertNonAnthropic({ provider, baseUrl, model });

    return {
      id: "openai-compatible",
      async complete(messages, options = {}) {
        const headers = { "content-type": "application/json" };
        if (config.apiKey) headers.authorization = `Bearer ${config.apiKey}`;
        const data = await requestJson(joinUrl(baseUrl, "/chat/completions"), {
          method: "POST",
          headers,
          body: JSON.stringify({ model, messages, temperature: options.temperature ?? 0.8, seed: options.seed }),
        }, timeoutMs);
        const text = data.choices?.[0]?.message?.content;
        if (!text) throw new Error("OpenAI-compatible endpoint returned no message content.");
        return { text, usage: data.usage || null };
      },
    };
  }

  throw new Error(`Unsupported provider: ${provider}. Use ollama or openai-compatible.`);
}
