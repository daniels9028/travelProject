export interface ActivityCase {
    categoryId: string
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
}

export type ActivityWithId = ActivityCase & { id: string }

export type CreateActivityCredentials = ActivityCase

export type ActivityByIdCredentials = Pick<ActivityWithId, "id">

export type ActivityByCategoryIdCredentials = Pick<ActivityWithId, "id">

export type UpdateActivityCredentials = ActivityWithId

export type DeleteActivityCredentials = Pick<ActivityWithId, "id">

