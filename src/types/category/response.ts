export interface Category {
    id: string
    name: string
    imageUrl: string
    createdAt: string
    updatedAt: string
}

export interface ApiResponse<T = null> {
    code: number
    status: string
    message: string
    data?: T
}

export type CreateCategoryResponse = ApiResponse

export type UpdateCategoryResponse = ApiResponse

export type DeleteCategoryResponse = ApiResponse

export type AllCategoryResponse = ApiResponse<Category[]>

export type CategoryByIdResponse = ApiResponse<Category>