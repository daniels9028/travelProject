import axios from "./axios"
import { CategoryByIdCredentials, CreateCategoryCredentials, DeleteCategoryCredentials, UpdateCategoryCredentials } from "../types/category/credential"
import { AllCategoryResponse, CategoryByIdResponse, CreateCategoryResponse, DeleteCategoryResponse, UpdateCategoryResponse } from "../types/category/response"

const createCategoryService = async (credentials: CreateCategoryCredentials): Promise<CreateCategoryResponse> => {
    const response = await axios.post<CreateCategoryResponse>('create-category', credentials)

    return response.data
}

const updateCategoryService = async (credentials: UpdateCategoryCredentials): Promise<UpdateCategoryResponse> => {
    const response = await axios.post<UpdateCategoryResponse>(`update-category/${credentials.id}`, credentials)

    return response.data
}

const deleteCategoryService = async (credentials: DeleteCategoryCredentials): Promise<DeleteCategoryResponse> => {
    const response = await axios.delete<DeleteCategoryResponse>(`delete-category/${credentials.id}`)

    return response.data
}

const allCategoryService = async (): Promise<AllCategoryResponse> => {
    const response = await axios.get<AllCategoryResponse>('categories')

    return response.data
}

const categoryByIdService = async (credentials: CategoryByIdCredentials): Promise<CategoryByIdResponse> => {
    const response = await axios.get<CategoryByIdResponse>(`category/${credentials.id}`)

    return response.data
}

export default { createCategoryService, updateCategoryService, deleteCategoryService, allCategoryService, categoryByIdService }