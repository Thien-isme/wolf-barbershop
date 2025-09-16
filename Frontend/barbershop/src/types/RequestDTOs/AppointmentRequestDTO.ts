export type AppointmentRequestDTO = {
  fullName: string;
  phone: string;
  barberId: number;
  branchId: number;
  servicesId: number[];
  appointmentDate: string;
  appointmentTime: string;
  voucherId?: number;
  note?: string;
};