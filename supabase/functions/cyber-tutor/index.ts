import { streamText, tool } from "https://esm.sh/ai@4.3.16";
import { createGoogleGenerativeAI } from "https://esm.sh/@ai-sdk/google@1.0.20";
import { z } from "https://esm.sh/zod@3.25.76";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const TUTOR_SYSTEM_PROMPT = `You are CyberDesk AI, a cybersecurity tutor for university students at UniUyo.

You help with: SQL injection, XSS, CSRF, Nmap, Metasploit, Burp Suite, Wireshark, Hashcat, hash cracking, Linux commands, CTF challenges, cryptography, network recon, programming (Python, MATLAB, C, Java), mathematics, databases, and any computing topic.

Personality:
- Direct and practical, not textbook-boring
- Use real commands and examples
- After any attack explanation, also explain how to defend against it
- When answering casually (greetings, "how are you"), be brief and friendly
- When asked technical questions, be thorough with real examples

Tools available to you:
- lookup_cve: Look up vulnerability details from the National Vulnerability Database by CVE ID
- explain_concept: Get a structured breakdown of a cybersecurity concept

Format your responses in clear markdown. Use code blocks for commands and code.
Do not return JSON. Respond naturally as a knowledgeable tutor.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiApiKey) {
      return new Response(JSON.stringify({ error: "Missing GEMINI_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { messages } = body as { messages: unknown };

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages must be a non-empty array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const google = createGoogleGenerativeAI({ apiKey: geminiApiKey });

    const result = await streamText({
      model: google("gemini-2.0-flash-exp", { useSearchGrounding: true }),
      system: TUTOR_SYSTEM_PROMPT,
      messages: messages as Parameters<typeof streamText>[0]["messages"],
      maxSteps: 3,
      tools: {
        explain_concept: tool({
          description:
            "Provide a structured explanation of a cybersecurity concept. Use this when asked to explain a specific term, attack, or technique.",
          parameters: z.object({
            topic: z.string().describe("The concept to explain"),
            depth: z.enum(["brief", "detailed"]).default("detailed"),
          }),
          execute: async ({ topic, depth }) => {
            return {
              instruction: `Explain "${topic}" ${
                depth === "brief" ? "in 2-3 sentences" : "thoroughly with examples, real commands, and defense strategies"
              }.`,
            };
          },
        }),
        lookup_cve: tool({
          description:
            "Look up details about a specific CVE vulnerability from the National Vulnerability Database. Use this when the user asks about a specific CVE number.",
          parameters: z.object({
            cve_id: z.string().describe("The CVE identifier, e.g., CVE-2021-44228"),
          }),
          execute: async ({ cve_id }) => {
            const cleanId = cve_id.trim().toUpperCase();
            const url = `https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${cleanId}`;
            try {
              const res = await fetch(url, {
                headers: { Accept: "application/json" },
                signal: AbortSignal.timeout(8000),
              });
              if (!res.ok) return { error: `NVD returned ${res.status}` };
              const data = await res.json() as {
                vulnerabilities?: Array<{ cve: {
                  id: string;
                  descriptions?: Array<{ lang: string; value: string }>;
                  metrics?: { cvssMetricV31?: Array<{ cvssData?: { baseSeverity: string; baseScore?: number } }> };
                  published?: string;
                } }>;
              };
              const vuln = data.vulnerabilities?.[0]?.cve;
              if (!vuln) return { error: "CVE not found in NVD" };
              return {
                id: vuln.id,
                description:
                  vuln.descriptions?.find((d: { lang: string }) => d.lang === "en")?.value ?? "No description",
                severity: vuln.metrics?.cvssMetricV31?.[0]?.cvssData?.baseSeverity ?? "Unknown",
                score: vuln.metrics?.cvssMetricV31?.[0]?.cvssData?.baseScore ?? null,
                published: vuln.published,
              };
            } catch (e) {
              return { error: e instanceof Error ? e.message : "Failed to fetch CVE data" };
            }
          },
        }),
      },
      maxTokens: 2048,
      temperature: 0.7,
    });

    const dataStream = result.toDataStreamResponse();
    const newHeaders = new Headers(dataStream.headers);
    Object.entries(corsHeaders).forEach(([k, v]) => {
      newHeaders.set(k, v);
    });

    return new Response(dataStream.body, {
      status: dataStream.status,
      headers: newHeaders,
    });
  } catch (error) {
    console.error("cyber-tutor error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unexpected error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
