import axios from "../axios/axios";
import { BannerByIdCredentials, CreateBannerCredentials, DeleteBannerCredentials, UpdateBannerCredentials } from "../types/banner/credential";
import { AllBannerResponse, BannerByIdResponse, CreateBannerResponse, DeleteBannerResponse, UpdateBannerResponse } from "../types/banner/response";

const createBannerService = async (credentials: CreateBannerCredentials): Promise<CreateBannerResponse> => {
  const response = await axios.post<CreateBannerResponse>(
    "create-banner",
    credentials
  );

  return response.data;
};

const updateBannerService = async (credentials: UpdateBannerCredentials): Promise<UpdateBannerResponse> => {
  const response = await axios.post<UpdateBannerResponse>(
    `update-banner/${credentials.id}`,
    credentials
  );

  return response.data;
};

const deleteBannerService = async (credentials: DeleteBannerCredentials): Promise<DeleteBannerResponse> => {
  const response = await axios.delete<DeleteBannerResponse>(
    `delete-banner/${credentials.id}`
  );

  return response.data;
};

const allBannerService = async (): Promise<AllBannerResponse> => {
  const response = await axios.get<AllBannerResponse>("banners");

  return response.data;
};

const bannerByIdService = async (credentials: BannerByIdCredentials): Promise<BannerByIdResponse> => {
  const response = await axios.get<BannerByIdResponse>(
    `banner/${credentials.id}`
  );

  return response.data;
};

export default {
  createBannerService,
  updateBannerService,
  deleteBannerService,
  allBannerService,
  bannerByIdService,
};
