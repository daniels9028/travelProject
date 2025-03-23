import axios from "../axios/axios"
import { CancelTransactionCredentials, CreateTransactionCredentials, TransactionByIdCredentials, UpdateTransactionProofPaymentCredentials, UpdateTransactionStatusCredentials } from "../types/transaction/credential"
import { AllTransactionResponse, CancelTransactionResponse, CreateTransactionResponse, MyTransactionResponse, TransactionByIdResponse, UpdateTransactionProofPaymentResponse, UpdateTransactionStatusResponse } from "../types/transaction/response"

const transactionByIdService = async (credentials: TransactionByIdCredentials): Promise<TransactionByIdResponse> => {
    const response = await axios.get<TransactionByIdResponse>(`transaction/${credentials.id}`)

    return response.data
}

const myTransactionService = async (): Promise<MyTransactionResponse> => {
    const response = await axios.get<MyTransactionResponse>('my-transactions')

    return response.data
}

const allTransactionService = async (): Promise<AllTransactionResponse> => {
    const response = await axios.get<AllTransactionResponse>('all-transactions')

    return response.data
}

const createTransactionService = async (credentials: CreateTransactionCredentials): Promise<CreateTransactionResponse> => {
    const response = await axios.post<CreateTransactionResponse>('create-transaction', credentials)

    return response.data
}

const cancelTransactionService = async (credentials: CancelTransactionCredentials): Promise<CancelTransactionResponse> => {
    const response = await axios.post<CancelTransactionResponse>(`cancel-transaction/${credentials.id}`)

    return response.data
}

const updateTransactionProofPaymentService = async (credentials: UpdateTransactionProofPaymentCredentials): Promise<UpdateTransactionProofPaymentResponse> => {
    const response = await axios.post<UpdateTransactionProofPaymentResponse>(`update-transaction-proof-payment/${credentials.id}`, credentials)

    return response.data
}

const updateTransactionStatusService = async (credentials: UpdateTransactionStatusCredentials): Promise<UpdateTransactionStatusResponse> => {
    const response = await axios.post<UpdateTransactionStatusResponse>(`update-transaction-status/${credentials.id}`, credentials)

    return response.data
}

export default { transactionByIdService, myTransactionService, allTransactionService, createTransactionService, cancelTransactionService, updateTransactionProofPaymentService, updateTransactionStatusService }