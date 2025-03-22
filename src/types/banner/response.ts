export interface Banner {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = null> {
  code: number;
  status: string;
  message: string;
  data?: T;
}

export type CreateBannerResponse = ApiResponse;

export type UpdateBannerResponse = ApiResponse;

export type DeleteBannerResponse = ApiResponse;

export type AllBannerResponse = ApiResponse<Banner[]>;

export type BannerByIdResponse = ApiResponse<Banner>;
