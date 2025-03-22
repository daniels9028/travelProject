export interface PromoCase {
    title: string
    description: string
    imageUrl: string
    terms_condition: string
    promo_code: string
    promo_discount_price: number
    minimum_claim_price: number
}

export type PromoWithId = PromoCase & { id: string }

export type CreatePromoCredentials = PromoCase

export type UpdatePromoCredentials = PromoWithId

export type DeletePromoCredentials = Pick<PromoWithId, "id">

export type PromoByIdCredentials = Pick<PromoWithId, "id">