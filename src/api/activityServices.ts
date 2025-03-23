import axios from "../axios/axios"
import { ActivityByCategoryIdCredentials, ActivityByIdCredentials, CreateActivityCredentials, UpdateActivityCredentials } from "../types/activity/credential"
import { ActivityByCategoryIdResponse, ActivityByIdResponse, AllActivityResponse, CreateActivityResponse, DeleteActivityResponse, UpdateActivityResponse } from "../types/activity/response"
import { DeleteCategoryCredentials } from "../types/category/credential"

const createActivityService = async (credentials: CreateActivityCredentials): Promise<CreateActivityResponse> => {
    const response = await axios.post<CreateActivityResponse>('create-activity', credentials)

    return response.data
}

const allActivityService = async (): Promise<AllActivityResponse> => {
    const response = await axios.get<AllActivityResponse>('activities')

    return response.data
}

const activityByIdService = async (credentials: ActivityByIdCredentials): Promise<ActivityByIdResponse> => {
    const response = await axios.get<ActivityByIdResponse>(`activity/${credentials.id}`)

    return response.data
}

const activityByCategoryIdService = async (credentials: ActivityByCategoryIdCredentials): Promise<ActivityByCategoryIdResponse> => {
    const response = await axios.get<ActivityByCategoryIdResponse>(`activities-by-category/${credentials.id}`)

    return response.data
}

const updateActivityService = async (credentials: UpdateActivityCredentials): Promise<UpdateActivityResponse> => {
    const response = await axios.post<UpdateActivityResponse>(`update-activity/${credentials.id}`, credentials)

    return response.data
}

const deleteActivityService = async (credentials: DeleteCategoryCredentials): Promise<DeleteActivityResponse> => {
    const response = await axios.delete<DeleteActivityResponse>(`delete-activity/${credentials.id}`)

    return response.data
}

export default { createActivityService, allActivityService, activityByIdService, activityByCategoryIdService, updateActivityService, deleteActivityService }