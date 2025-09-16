export type AppointmentDTO = {
  appointmentId?: number;
  userId: number;
  employeeId: number;
  appointmentDate: Date;
  status: string;
};