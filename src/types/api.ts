import { Gift, GiftDetails, QuizFormData, QuizResponse } from './index';

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};

export type GiftSearchParams = {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  limit?: number;
  page?: number;
};

export type GiftSearchResponse = ApiResponse<{
  gifts: Gift[];
  total: number;
  page: number;
  totalPages: number;
}>;

export type GiftDetailsResponse = ApiResponse<GiftDetails>;

export type QuizSubmissionResponse = ApiResponse<QuizResponse>;

export type ErrorResponse = {
  success: false;
  error: string;
  code?: string;
};
