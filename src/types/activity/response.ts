import { Category } from "../category/response"

export interface Activity {
    id: string
    categoryId: string
    category: Category
    title: string
    description: string
    imageUrls: string[]
    price: number
    price_discount: number
    rating: number
    total_reviews: number
    facilities: string
    address: string
    province: string
    city: string
    location_maps: string
    createdAt: string
    updatedAt: string
}

export interface ApiResponse<T = null> {
    code: number
    status: string
    message: string
    data?: T
}

export type CreateActivityResponse = ApiResponse

export type AllActivityResponse = ApiResponse<Activity[]>

export type ActivityByIdResponse = ApiResponse<Activity>

export type ActivityByCategoryIdResponse = ApiResponse<Activity[]>

export type UpdateActivityResponse = ApiResponse

export type DeleteActivityResponse = ApiResponse