import type { EmployeeDTO } from "./employeeDTO";

export interface EmployeeImgHairDTO {
  employeeImgHairId: number;
  employeeId: number;
  imgUrl?: string;
  isActive?: boolean;
  employeeDTO?: EmployeeDTO;
}