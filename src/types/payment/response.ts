export interface Payment {
    id: string
    name: string
    imageUrl: string
}

export interface ApiResponse<T = null> {
    code: number
    status: string
    message: string
    data?: T
}

export type PaymentMethodResponse = ApiResponse<Payment[]>

export type GeneratePaymentMethodResponse = ApiResponse