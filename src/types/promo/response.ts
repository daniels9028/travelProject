export interface Promo {
    id: string
    title: string
    description: string
    imageUrl: string
    terms_condition: string
    promo_code: string
    promo_discount_price: number
    minimum_claim_price: number
    createdAt: string
    updatedAt: string
}

export interface ApiResponse<T = null> {
    code: number
    status: string
    message: string
    data?: T
}

export type CreatePromoResponse = ApiResponse

export type UpdatePromoResponse = ApiResponse

export type DeletePromoResponse = ApiResponse

export type AllPromoResponse = ApiResponse<Promo[]>

export type PromoByIdResponse = ApiResponse<Promo>