// Real-Time Transaction Feed Service (WebSocket Simulation)
// Production: connects to API gateway WebSocket API
// Current: simulated feed for frontend demonstration

export interface Transaction {
  id: string;
  hash: string;
  type: 'SEND' | 'RECEIVE' | 'SWAP' | 'MINT';
  from: string;
  to: string;
  amount: string;
  currency: 'XRP' | 'SKYIVY' | 'SKYLOCKR';
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  timestamp: number;
  riskScore: number;
  signers: string[];
  confirmations: number;
}

export interface FeedSubscriber {
  (tx: Transaction): void;
}

class TransactionFeed {
  private subscribers: FeedSubscriber[] = [];
  private interval: ReturnType<typeof setInterval> | null = null;
  private history: Transaction[] = [];

  subscribe(callback: FeedSubscriber) {
    this.subscribers.push(callback);
    // Send existing history
    this.history.slice(-10).forEach((tx) => callback(tx));
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== callback);
    };
  }

  private emit(tx: Transaction) {
    this.history.push(tx);
    if (this.history.length > 100) this.history.shift();
    this.subscribers.forEach((s) => s(tx));
  }

  start() {
    if (this.interval) return;
    // Simulate incoming transactions
    this.interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const tx = this.generateRandomTx();
        this.emit(tx);
      }
    }, 2500);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private generateRandomTx(): Transaction {
    const currencies: ('XRP' | 'SKYIVY' | 'SKYLOCKR')[] = ['XRP', 'SKYIVY', 'SKYLOCKR'];
    const types: ('SEND' | 'RECEIVE' | 'SWAP' | 'MINT')[] = ['SEND', 'RECEIVE', 'SWAP', 'MINT'];
    const currency = currencies[Math.floor(Math.random() * currencies.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const id = 'tx_' + Math.random().toString(36).substring(2, 10);

    return {
      id,
      hash: id + '_hash',
      type,
      from: type === 'RECEIVE' ? 'rEXTERNAL_' + Math.floor(Math.random() * 999) : 'rWALLET_MAIN',
      to: type === 'SEND' ? 'rEXTERNAL_' + Math.floor(Math.random() * 999) : 'rWALLET_MAIN',
      amount: (Math.random() * 1000).toFixed(currency === 'XRP' ? 2 : 6),
      currency,
      status: Math.random() > 0.1 ? 'CONFIRMED' : 'PENDING',
      timestamp: Date.now(),
      riskScore: Math.random(),
      signers: ['AI_RISK', 'HUMAN_ADMIN', 'SYSTEM'],
      confirmations: Math.floor(Math.random() * 200) + 1,
    };
  }

  getHistory(): Transaction[] {
    return [...this.history];
  }
}

export const transactionFeed = new TransactionFeed();
