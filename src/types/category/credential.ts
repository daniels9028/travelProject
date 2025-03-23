export interface CategoryCase {
    name: string
    imageUrl: string
}

export type CategoryWithId = CategoryCase & { id: string }

export type CreateCategoryCredentials = CategoryCase

export type UpdateCategoryCredentials = CategoryWithId

export type DeleteCategoryCredentials = Pick<CategoryWithId, "id">

export type CategoryByIdCredentials = Pick<CategoryWithId, "id">