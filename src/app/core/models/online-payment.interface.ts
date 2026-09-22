export interface OnlinePaymentResponse {
  status: string
  session: OnlinePayment
}

export interface OnlinePayment {
  url: string
  success_url: string
  cancel_url: string
}
