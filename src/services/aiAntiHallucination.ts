/* ═══════════════════════════════════════════════════════════
   AI ANTI-HALLUCINATION FRAMEWORK
   Charging Document §7.2 — Cuz Cotton Technical Lead
   ═══════════════════════════════════════════════════════════ */

export interface AIResponse {
  text: string;
  confidenceScore: number;   // 0–100
  sourceReferences: SourceRef[];
  uncertaintyFlags: string[];
  complianceScore: number;   // Charging Document §7.4
  correctionLog: string[];
}

export interface SourceRef {
  id: string;
  source: string;
  url?: string;
  verified: boolean;
}

/* ── Confidence Scoring ── */
export function calculateConfidence(
  sources: SourceRef[],
  uncertaintyFlags: string[]
): number {
  const base = sources.length > 0 ? 70 : 30;
  const verifiedBonus = sources.filter(s => s.verified).length * 10;
  const penalty = uncertaintyFlags.length * 15;
  return Math.max(0, Math.min(100, base + verifiedBonus - penalty));
}

/* ── Compliance Scoring per §7.4 ── */
export function calculateAICompliance(
  response: Omit<AIResponse, 'complianceScore'>
): number {
  const checks = [
    response.confidenceScore >= 60,               // Confidence threshold
    response.sourceReferences.length > 0,          // Source attribution
    response.uncertaintyFlags.length < 3,          // Not overloaded with uncertainty
    response.text.length > 0,                     // Non-empty
    !hasFabricationPatterns(response.text),        // No hallucination patterns
  ];

  const passed = checks.filter(Boolean).length;
  return Math.round((passed / checks.length) * 100);
}

function hasFabricationPatterns(text: string): boolean {
  const redFlags = [
    /I don't have specific information/i,
    /As of my last update/i,
    /I believe that/i,
    /It is likely that/i,
    /\[citation needed\]/i,
  ];
  return redFlags.some(r => r.test(text));
}

/* ── Self-Correction Loop ── */
export class SelfCorrectionLoop {
  private history: AIResponse[] = [];
  private maxHistory = 20;

  push(response: AIResponse) {
    this.history.unshift(response);
    if (this.history.length > this.maxHistory) this.history.pop();
  }

  getTrend(): 'improving' | 'stable' | 'degrading' {
    if (this.history.length < 3) return 'stable';
    const recent = this.history.slice(0, 3).map(r => r.confidenceScore);
    const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const prev = this.history.slice(3, 6).map(r => r.confidenceScore);
    const prevAvg = prev.length > 0 ? prev.reduce((a, b) => a + b, 0) / prev.length : avg;

    if (avg > prevAvg + 5) return 'improving';
    if (avg < prevAvg - 5) return 'degrading';
    return 'stable';
  }

  suggestCorrection(): string | null {
    const latest = this.history[0];
    if (!latest) return null;

    if (latest.confidenceScore < 50) {
      return 'Low confidence detected — trigger RAG retrieval with stricter filters';
    }
    if (latest.sourceReferences.length === 0) {
      return 'No sources attached — enforce source lookup before response generation';
    }
    return null;
  }
}

export const selfCorrection = new SelfCorrectionLoop();

/* ── RAG Pipeline Stub ── */
export async function retrieveSources(_query: string): Promise<SourceRef[]> {
  /* In production: vector DB search, web crawl, knowledge base lookup */
  return [
    {
      id: 'src-1',
      source: 'Ad9x Internal Knowledge Base',
      url: '#/docs',
      verified: true,
    },
  ];
}

/* ── Response Builder with Compliance ── */
export async function buildCompliantResponse(
  rawText: string,
  query: string
): Promise<AIResponse> {
  const sources = await retrieveSources(query);
  const uncertaintyFlags: string[] = [];

  if (sources.length === 0) {
    uncertaintyFlags.push('No verified sources found for this query');
  }

  if (rawText.length < 50) {
    uncertaintyFlags.push('Response may be incomplete — short output detected');
  }

  const confidenceScore = calculateConfidence(sources, uncertaintyFlags);

  const response: AIResponse = {
    text: rawText,
    confidenceScore,
    sourceReferences: sources,
    uncertaintyFlags,
    complianceScore: 0, // computed below
    correctionLog: [],
  };

  response.complianceScore = calculateAICompliance(response);

  selfCorrection.push(response);
  const suggestion = selfCorrection.suggestCorrection();
  if (suggestion) {
    response.correctionLog.push(suggestion);
  }

  return response;
}
