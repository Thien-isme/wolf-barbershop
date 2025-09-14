import type { AppointmentServiceDTO } from "./appointmentServiceDTO";
import type { PaymentServiceDTO } from "./paymentServiceDTO";

export type ServiceDTO = {
  serviceId: number;
  serviceName: string;
  serviceTypeId: number;
  description: string;
  price: number;
  durationMin: number;
  isActive: boolean;
  appointmentServices: AppointmentServiceDTO[];
  paymentServices: PaymentServiceDTO[];
};