import type { UserDTO } from "./userDTO";

export type EmployeeDTO = {
  employeeId?: number;
  userId?: number;
  branchId?: number;
  experienceYears?: Date; // DateOnly tương ứng với Date ở TypeScript
  rating?: number;
  quantityRate?: number;
  isActive: boolean;
  avatarUrl?: string;
  employeeRoleId?: number;
  userDTO?: UserDTO;
};