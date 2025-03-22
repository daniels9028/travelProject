export interface BannerCase {
  name: string;
  imageUrl: string;
}

export type BannerWithId = BannerCase & { id: string };

export type CreateBannerCredentials = BannerCase;

export type UpdateBannerCredentials = BannerWithId;

export type DeleteBannerCredentials = Pick<BannerWithId, "id">;

export type BannerByIdCredentials = Pick<BannerWithId, "id">;
