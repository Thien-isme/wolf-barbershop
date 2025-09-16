export interface BranchDTO {
  branchId: number;
  branchName: string;
  provinceCity?: string;
  wardCommune?: number;
  locationDetail?: string;
  branchUrl?: string;
  timeOn: string;
  timeOff: string;
  isActive?: boolean;
  barbers: number;
  // Thêm các trường khác nếu cần
}