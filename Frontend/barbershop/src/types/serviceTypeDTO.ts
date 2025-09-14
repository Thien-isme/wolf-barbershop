import type { ServiceDTO } from "./serviceDTO";

export type ServiceTypeDTO = {
  serviceTypeId: number;
  serviceTypeName: string;
  isActive: boolean;
  services: ServiceDTO[];
};