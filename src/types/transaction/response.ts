import { Payment } from "../payment/response"

export interface PaymentMethod extends Payment {
    virtual_account_number: string
    virtual_account_name: string
}

export enum TransactionStatus {
    Pending = "pending",
    Success = "success",
    Cancelled = "cancelled"
}

export interface TransactionItem {
    imageUrls: string[]
    id: string
    transactionId: string
    title: string
    description: string
    price: number
    price_discount: number
    quantity: number
    createdAt: string
    updatedAt: string
}

export interface Transaction {
    id: string
    userId: string
    paymentMethodId: string
    invoiceId: string
    status: TransactionStatus
    totalAmount: number
    proofPaymentUrl?: string
    orderDate: string,
    expiredDate: string,
    createdAt: string,
    updatedAt: string,
    payment_method: PaymentMethod
    transaction_items: TransactionItem[]
}

export interface ApiResponse<T = null> {
    code: number
    status: string
    message: string
    data?: T
}

export type TransactionByIdResponse = ApiResponse<Transaction>

export type MyTransactionResponse = ApiResponse<Transaction[]>

export type AllTransactionResponse = ApiResponse<Transaction[]>

export type CreateTransactionResponse = ApiResponse

export type CancelTransactionResponse = ApiResponse

export type UpdateTransactionProofPaymentResponse = ApiResponse

export type UpdateTransactionStatusResponse = ApiResponse