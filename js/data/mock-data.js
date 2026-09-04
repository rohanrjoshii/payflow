/**
 * PayFlow Mock Data
 * Simulated datasets for routing, gateways, transactions, and infrastructure
 */

export const GATEWAYS = [
  { id: 'razorpay', name: 'Razorpay', successRate: 96.8, latency: 42, cost: 1.8, load: 32, status: 'online' },
  { id: 'payu', name: 'PayU', successRate: 95.2, latency: 58, cost: 1.5, load: 24, status: 'online' },
  { id: 'ccavenue', name: 'CCAvenue', successRate: 93.5, latency: 65, cost: 2.0, load: 18, status: 'online' },
  { id: 'billdesk', name: 'BillDesk', successRate: 94.1, latency: 51, cost: 1.2, load: 15, status: 'online' },
  { id: 'paytm', name: 'Paytm PG', successRate: 97.2, latency: 38, cost: 1.6, load: 28, status: 'online' },
  { id: 'hdfc', name: 'HDFC Gateway', successRate: 91.8, latency: 72, cost: 2.2, load: 12, status: 'warning' },
];

export const BANKS = [
  'HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra',
  'Yes Bank', 'PNB', 'Bank of Baroda', 'IndusInd', 'Federal Bank',
  'RBL Bank', 'IDFC First', 'Canara Bank', 'Union Bank', 'BOI'
];

export const UPI_PROVIDERS = [
  'Google Pay', 'PhonePe', 'Paytm UPI', 'BHIM', 'Amazon Pay',
  'WhatsApp Pay', 'CRED UPI', 'Slice', 'Jupiter', 'Fi Money'
];

export const PAYMENT_METHODS_DATA = [
  { type: 'UPI', share: 68, growth: '+12%', color: '#00d4ff' },
  { type: 'Cards', share: 18, growth: '+3%', color: '#6c3ce0' },
  { type: 'Net Banking', share: 8, growth: '-2%', color: '#0066ff' },
  { type: 'Wallets', share: 4, growth: '+1%', color: '#a855f7' },
  { type: 'BNPL', share: 2, growth: '+8%', color: '#10b981' },
];

export const TRANSACTION_TIMELINE = [
  { time: '00:00', tps: 8200 },
  { time: '02:00', tps: 3100 },
  { time: '04:00', tps: 1800 },
  { time: '06:00', tps: 4500 },
  { time: '08:00', tps: 12000 },
  { time: '10:00', tps: 28000 },
  { time: '12:00', tps: 35000 },
  { time: '14:00', tps: 31000 },
  { time: '16:00', tps: 27000 },
  { time: '18:00', tps: 42000 },
  { time: '20:00', tps: 52000 },
  { time: '22:00', tps: 38000 },
  { time: '23:59', tps: 15000 },
];

export const DATA_CENTERS = [
  { id: 'mumbai-1', name: 'Mumbai DC-1', role: 'Primary', lat: '19.07', lng: '72.87', load: 35, status: 'online', pods: 420, posX: 28, posY: 52 },
  { id: 'mumbai-2', name: 'Mumbai DC-2', role: 'Primary', lat: '19.14', lng: '72.91', load: 32, status: 'online', pods: 380, posX: 30, posY: 50 },
  { id: 'chennai', name: 'Chennai DC', role: 'Secondary', lat: '13.08', lng: '80.27', load: 22, status: 'online', pods: 260, posX: 52, posY: 72 },
  { id: 'delhi', name: 'Delhi DC', role: 'Secondary', lat: '28.61', lng: '77.20', load: 18, status: 'online', pods: 200, posX: 48, posY: 22 },
  { id: 'bangalore', name: 'Bangalore DC', role: 'DR', lat: '12.97', lng: '77.59', load: 8, status: 'online', pods: 140, posX: 48, posY: 70 },
  { id: 'hyderabad', name: 'Hyderabad Edge', role: 'Edge', lat: '17.38', lng: '78.47', load: 5, status: 'online', pods: 60, posX: 48, posY: 58 },
];

export const SLA_METRICS = {
  uptime: 99.999,
  downtimePerYear: '5m 15s',
  p50Latency: 12,
  p95Latency: 38,
  p99Latency: 65,
  tpsCapacity: 100000,
  currentTps: 52000,
  dailyTransactions: '1.2B',
  activeServices: 5200,
  deployments: 847,
};

export const PIPELINE_STAGES = [
  { id: 'validate', name: 'Validate', icon: '🔍', description: 'Schema validation, input sanitization, idempotency check', fp: 'validatePayment :: RawInput → Either ValidationError ValidPayment' },
  { id: 'enrich', name: 'Enrich', icon: '📦', description: 'BIN lookup, merchant config, user preferences, risk scoring', fp: 'enrichPayment :: ValidPayment → ReaderT Config IO EnrichedPayment' },
  { id: 'route', name: 'Route', icon: '🔀', description: 'ML-based optimal gateway selection based on success rate, cost, latency', fp: 'routePayment :: EnrichedPayment → StateT RoutingState IO RoutedPayment' },
  { id: 'process', name: 'Process', icon: '⚡', description: 'Gateway API call, 3DS authentication, response parsing', fp: 'processPayment :: RoutedPayment → ExceptT GatewayError IO ProcessedPayment' },
  { id: 'settle', name: 'Settle', icon: '✅', description: 'Ledger entry, reconciliation, webhook dispatch', fp: 'settlePayment :: ProcessedPayment → WriterT [AuditLog] IO SettledPayment' },
];

export const INTEGRATIONS = [
  { name: 'Visa', category: 'Card Network' },
  { name: 'Mastercard', category: 'Card Network' },
  { name: 'RuPay', category: 'Card Network' },
  { name: 'NPCI', category: 'UPI' },
  { name: 'UPI 2.0', category: 'UPI' },
  { name: 'NACH', category: 'Mandate' },
  { name: 'HDFC Bank', category: 'Bank' },
  { name: 'ICICI Bank', category: 'Bank' },
  { name: 'SBI', category: 'Bank' },
  { name: 'Axis Bank', category: 'Bank' },
  { name: 'PNB', category: 'Bank' },
  { name: 'Kotak', category: 'Bank' },
  { name: 'PhonePe', category: 'Wallet' },
  { name: 'Paytm', category: 'Wallet' },
  { name: 'Amazon Pay', category: 'Wallet' },
  { name: 'Mobikwik', category: 'Wallet' },
  { name: 'Simpl', category: 'BNPL' },
  { name: 'LazyPay', category: 'BNPL' },
  { name: 'ZestMoney', category: 'BNPL' },
  { name: 'RBI', category: 'Compliance' },
  { name: 'PCI DSS', category: 'Compliance' },
  { name: '3D Secure', category: 'Auth' },
  { name: 'OTP', category: 'Auth' },
  { name: 'Biometric', category: 'Auth' },
];

export const ANOMALY_TYPES = [
  { type: 'Success Rate Drop', severity: 'critical', threshold: '< 90%', action: 'Auto-failover to backup gateway' },
  { type: 'Latency Spike', severity: 'warning', threshold: '> 200ms P99', action: 'Traffic throttling + alert' },
  { type: 'Error Rate Surge', severity: 'critical', threshold: '> 5% 5xx errors', action: 'Circuit breaker activation' },
  { type: 'Volume Anomaly', severity: 'info', threshold: '±30% from baseline', action: 'Log + monitor' },
  { type: 'Fraud Pattern', severity: 'critical', threshold: 'ML confidence > 0.85', action: 'Block + review queue' },
];
