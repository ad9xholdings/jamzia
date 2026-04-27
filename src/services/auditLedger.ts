// Immutable Audit Ledger Service
// Append-only event logging with SHA-256 simulation

export interface AuditEvent {
  id: string;
  timestamp: number;
  type: 'WALLET_CONNECT' | 'WALLET_DISCONNECT' | 'TX_SUBMIT' | 'TX_CONFIRM' | 'TX_FAIL' | 'AI_APPROVE' | 'AI_REJECT' | 'SIGNER_ADD' | 'SIGNER_REMOVE' | 'RISK_SCAN';
  data: Record<string, unknown>;
  hash: string;
  prevHash: string;
}

class AuditLedger {
  private events: AuditEvent[] = [];
  private lastHash = 'genesis_' + Date.now().toString(36);

  private computeHash(event: Omit<AuditEvent, 'hash' | 'prevHash'>): string {
    // Simulated SHA-256 — production uses crypto.subtle.digest('SHA-256', ...)
    const data = JSON.stringify(event);
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash + char) | 0;
    }
    return '0x' + Math.abs(hash).toString(16).padStart(64, '0');
  }

  append(type: AuditEvent['type'], data: Record<string, unknown>): AuditEvent {
    const event: AuditEvent = {
      id: 'evt_' + Math.random().toString(36).substring(2, 10),
      timestamp: Date.now(),
      type,
      data,
      hash: '',
      prevHash: this.lastHash,
    };
    event.hash = this.computeHash(event);
    this.lastHash = event.hash;
    this.events.push(event);
    return event;
  }

  getEvents(limit = 50): AuditEvent[] {
    return this.events.slice(-limit);
  }

  verifyChain(): boolean {
    for (let i = 1; i < this.events.length; i++) {
      if (this.events[i].prevHash !== this.events[i - 1].hash) {
        return false;
      }
    }
    return true;
  }

  getStats() {
    return {
      totalEvents: this.events.length,
      verified: this.verifyChain(),
      lastHash: this.lastHash,
    };
  }
}

export const auditLedger = new AuditLedger();
