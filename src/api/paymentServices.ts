import axios from "./axios"
import { GeneratePaymentMethodResponse, PaymentMethodResponse } from "../types/payment/response"

const paymentMethodService = async (): Promise<PaymentMethodResponse> => {
    const response = await axios.get<PaymentMethodResponse>('payment-methods')

    return response.data
}

const generatePaymentMethodService = async (): Promise<GeneratePaymentMethodResponse> => {
    const response = await axios.post<GeneratePaymentMethodResponse>('generate-payment-methods')

    return response.data
}

export default { paymentMethodService, generatePaymentMethodService }