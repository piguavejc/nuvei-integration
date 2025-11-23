export interface CardResponse {
  card?: {
    bin: string;
    status: "valid" | "review" | "pending" | "rejected";
    token: string;
    message?: string;
    expiryYear: string;
    expiryMonth: string;
    transactionReference: string;
    type: string;
    number: string;
    origin: "Paymentez" | "VisaCheckout" | "Masterpass";
    bankName?: string;
  };
  error?: {
    type: string;
    help: string;
    description: string;
  };
}
