export interface ICryptomusService {
  createPayment(
    amount: number,
    orderId: string,
  ): Promise<CreatePaymentResult> | undefined;
  checkPayment(uuid: string): Promise<CreatePaymentResult> | undefined;
  getHeader(payload: string): { sign: string; merchant: string };
}

export interface Currency {
  currency: string;
  network: string;
}

export interface Result {
  uuid: string;
  order_id: string;
  amount: string;
  payment_amount: string;
  payer_amount: string;
  discount: string;
  currency: string;
  payment_status: string;
  url: string;
  expired_at: number;
  status: string;
  is_final: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePaymentResult {
  state: number;
  result: Result;
}
