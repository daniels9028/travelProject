import axios from "../axios/axios"
import { AddCartCredentials, DeleteCartCredentials, UpdateCartCredentials } from "../types/cart/credential"
import { AddCartResponse, AllCartResponse, DeleteCartResponse, UpdateCartResponse } from "../types/cart/response"

const addCartService = async (credentials: AddCartCredentials): Promise<AddCartResponse> => {
    const response = await axios.post<AddCartResponse>('add-cart', credentials)

    return response.data
}

const updateCartService = async (credentials: UpdateCartCredentials): Promise<UpdateCartResponse> => {
    const response = await axios.post<UpdateCartResponse>(`update-cart/${credentials.id}`, credentials)

    return response.data
}

const deleteCartService = async (credentials: DeleteCartCredentials): Promise<DeleteCartResponse> => {
    const response = await axios.delete<DeleteCartResponse>(`delete-cart/${credentials.id}`)

    return response.data
}

const allCartService = async (): Promise<AllCartResponse> => {
    const response = await axios.get<AllCartResponse>('carts')

    return response.data
}

export default { addCartService, updateCartService, deleteCartService, allCartService }