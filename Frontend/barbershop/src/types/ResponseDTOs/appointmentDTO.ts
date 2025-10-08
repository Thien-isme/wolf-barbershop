import type { AppointmentServiceDTO } from './appointmentServiceDTO';
import type { EmployeeDTO } from './employeeDTO';
import type { BranchDTO } from './branchDTO';
import type { PaymentDTO } from './paymentDTO';
import type { ReviewDTO } from './reviewDTO';
import type { UserDTO } from './userDTO';
import type { ServiceDTO } from './serviceDTO';
import type { BarberDTO } from './barberDTO';
export type AppointmentDTO = {
    appointmentId?: number;
    userId: number;
    barberId: number;
    branchId: number;
    appointmentDate?: string; // ISO date string
    appointmentTime?: string; // ISO time string
    status: string;
    createdAt?: string; // ISO date-time string
    note?: string;
    isActive?: boolean;
    appointmentServiceDTO?: AppointmentServiceDTO[];
    employeeDTO?: EmployeeDTO;
    barberDTO?: BarberDTO;
    branchDTO?: BranchDTO;
    paymentDTO?: PaymentDTO[];
    reviewDTO?: ReviewDTO[];
    userDTO?: UserDTO;
    serviceDTOs?: ServiceDTO[];
};
