export type ReviewDTO = {
  reviewId: number;
  userId: number;
  employeeId: number;
  serviceId: number;
  content: string;
  rating: number;
  reviewDate: Date;
};