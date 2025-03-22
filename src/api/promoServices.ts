import axios from "../axios/axios"
import { CreatePromoCredentials, DeletePromoCredentials, PromoByIdCredentials, UpdatePromoCredentials } from "../types/promo/credential"
import { AllPromoResponse, CreatePromoResponse, DeletePromoResponse, PromoByIdResponse, UpdatePromoResponse } from "../types/promo/response"

const createPromoService = async (credentials: CreatePromoCredentials): Promise<CreatePromoResponse> => {
    const response = await axios.post<CreatePromoResponse>("create-promo", credentials)

    return response.data
}

const updatePromoService = async (credentials: UpdatePromoCredentials): Promise<UpdatePromoResponse> => {
    const response = await axios.post<UpdatePromoResponse>(`update-promo/${credentials.id}`, credentials)

    return response.data
}

const deletePromoService = async (credentials: DeletePromoCredentials): Promise<DeletePromoResponse> => {
    const response = await axios.delete<DeletePromoResponse>(`delete-promo/${credentials.id}`)

    return response.data
}

const allPromoService = async (): Promise<AllPromoResponse> => {
    const response = await axios.get<AllPromoResponse>("promos")

    return response.data
}

const promoByIdService = async (credentials: PromoByIdCredentials): Promise<PromoByIdResponse> => {
    const response = await axios.get<PromoByIdResponse>(`promo/${credentials.id}`)

    return response.data
}

export default { createPromoService, updatePromoService, deletePromoService, allPromoService, promoByIdService }