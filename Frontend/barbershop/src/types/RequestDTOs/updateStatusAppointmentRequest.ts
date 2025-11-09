export type UpdateStatusAppointmentRequest = {
    appointmentId: number;
    status: 'BOOKED' | 'ACCEPTED' | 'CANCELLED';
};
