export interface CartCase {
    activityId: string
}

export type CartWithId = { id: string }

export type AddCartCredentials = CartCase

export type UpdateCartCredentials = CartWithId & { quantity: number }

export type DeleteCartCredentials = CartWithId