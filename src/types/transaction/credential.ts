export interface TransactionCase {
    id: string
}

export type TransactionByIdCredentials = TransactionCase

export interface CreateTransactionCredentials {
    cartIds: string[]
    paymentMethodId: string
}

export type CancelTransactionCredentials = TransactionCase

export type UpdateTransactionProofPaymentCredentials = TransactionCase & { proofPaymentUrl: string }

export type UpdateTransactionStatusCredentials = TransactionCase & { status: string }