import type { AppointmentServiceDTO } from './appointmentServiceDTO';
import type { PaymentServiceDTO } from './paymentServiceDTO';
import type { ServiceTypeDTO } from './serviceTypeDTO';
export type ServiceDTO = {
    serviceId: number;
    serviceName: string;
    serviceTypeId: number;
    description: string;
    price: number;
    durationMin: number;
    isActive: boolean;
    serviceImage: string;
    isOutstanding: boolean;
    appointmentServicesDTO: AppointmentServiceDTO[];
    paymentServicesDTO: PaymentServiceDTO[];
    serviceTypeDTO: ServiceTypeDTO[];
};
