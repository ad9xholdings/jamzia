// AI Command Parser — Deterministic JSON Engine
// Parses natural language commands into structured transaction intents

export interface ParsedCommand {
  intent: 'SEND' | 'SWAP' | 'BALANCE' | 'HISTORY' | 'CONNECT' | 'DISCONNECT';
  amount?: string;
  currency?: 'XRP' | 'SKYIVY' | 'SKYLOCKR';
  recipient?: string;
  confidence: number;
  raw: string;
}

const INTENT_PATTERNS: Record<string, RegExp[]> = {
  SEND: [
    /send\s+([\d.]+)\s*(xrp|skyivy|skylockr)?\s+to\s+(.+)/i,
    /transfer\s+([\d.]+)\s*(xrp|skyivy|skylockr)?\s+to\s+(.+)/i,
    /pay\s+(.+)\s+([\d.]+)\s*(xrp|skyivy|skylockr)?/i,
    /send\s+(.+)\s+([\d.]+)\s*(xrp|skyivy|skylockr)?/i,
  ],
  SWAP: [
    /swap\s+([\d.]+)\s*(xrp|skyivy|skylockr)\s+to\s*(xrp|skyivy|skylockr)/i,
    /exchange\s+([\d.]+)\s*(xrp|skyivy|skylockr)\s+for\s*(xrp|skyivy|skylockr)/i,
  ],
  BALANCE: [
    /balance/i,
    /how\s+much\s+do\s+i\s+have/i,
    /what'?s?\s+my\s+(xrp|skyivy|skylockr)\s+balance/i,
    /show\s+balance/i,
  ],
  HISTORY: [
    /history/i,
    /transactions/i,
    /show\s+history/i,
    /recent\s+activity/i,
  ],
  CONNECT: [
    /connect\s+wallet/i,
    /link\s+wallet/i,
    /sign\s+in/i,
    /login/i,
  ],
  DISCONNECT: [
    /disconnect/i,
    /logout/i,
    /sign\s*out/i,
  ],
};

const CURRENCY_MAP: Record<string, 'XRP' | 'SKYIVY' | 'SKYLOCKR'> = {
  xrp: 'XRP',
  skyivy: 'SKYIVY',
  skylockr: 'SKYLOCKR',
  'sky ivy': 'SKYIVY',
  'sky lockr': 'SKYLOCKR',
};

export function parseCommand(input: string): ParsedCommand {
  const raw = input.trim().toLowerCase();

  // Check each intent pattern
  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    for (const pattern of patterns) {
      const match = raw.match(pattern);
      if (match) {
        const result: ParsedCommand = {
          intent: intent as ParsedCommand['intent'],
          confidence: 0.95,
          raw: input,
        };

        // Extract amount
        const amountMatch = raw.match(/([\d,.]+)/);
        if (amountMatch) {
          result.amount = amountMatch[1].replace(/,/g, '');
        }

        // Extract currency
        for (const [key, value] of Object.entries(CURRENCY_MAP)) {
          if (raw.includes(key)) {
            result.currency = value;
            break;
          }
        }

        // Extract recipient
        const toMatch = raw.match(/to\s+([rR][a-zA-Z0-9]{20,})/);
        if (toMatch) {
          result.recipient = toMatch[1];
        }

        return result;
      }
    }
  }

  // Fallback: keyword-based detection
  if (raw.includes('send') || raw.includes('transfer') || raw.includes('pay')) {
    return { intent: 'SEND', confidence: 0.6, raw: input };
  }
  if (raw.includes('balance') || raw.includes('how much')) {
    return { intent: 'BALANCE', confidence: 0.7, raw: input };
  }
  if (raw.includes('history') || raw.includes('transactions')) {
    return { intent: 'HISTORY', confidence: 0.7, raw: input };
  }

  return { intent: 'BALANCE', confidence: 0.3, raw: input };
}

export function formatCommandOutput(cmd: ParsedCommand): string {
  switch (cmd.intent) {
    case 'SEND':
      return `Intent: SEND\nAmount: ${cmd.amount || '?'} ${cmd.currency || 'XRP'}\nTo: ${cmd.recipient || 'unknown'}\nConfidence: ${Math.round(cmd.confidence * 100)}%`;
    case 'SWAP':
      return `Intent: SWAP\nAmount: ${cmd.amount || '?'} ${cmd.currency || '?'}\nConfidence: ${Math.round(cmd.confidence * 100)}%`;
    case 'BALANCE':
      return `Intent: BALANCE CHECK\nConfidence: ${Math.round(cmd.confidence * 100)}%`;
    case 'HISTORY':
      return `Intent: TRANSACTION HISTORY\nConfidence: ${Math.round(cmd.confidence * 100)}%`;
    case 'CONNECT':
      return `Intent: CONNECT WALLET\nConfidence: ${Math.round(cmd.confidence * 100)}%`;
    case 'DISCONNECT':
      return `Intent: DISCONNECT WALLET\nConfidence: ${Math.round(cmd.confidence * 100)}%`;
    default:
      return `Intent: UNKNOWN\nConfidence: ${Math.round(cmd.confidence * 100)}%`;
  }
}
