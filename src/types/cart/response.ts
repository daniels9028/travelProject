import { Activity } from "../activity/response"

export interface Cart {
    id: string
    userId: string
    activityId: string
    quantity: number
    createdAt: string
    updatedAt: string
    activity: Activity
}

export interface ApiResponse<T = null> {
    code: number
    status: string
    message: string
    data?: T
}

export type AddCartResponse = ApiResponse

export type UpdateCartResponse = ApiResponse

export type DeleteCartResponse = ApiResponse

export type AllCartResponse = ApiResponse<Cart[]>