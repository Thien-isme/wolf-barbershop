// Bạn có thể đặt ở: f:\MyProject\BarberShop\Frontend\barbershop\src\types\UserDTO.ts
import type { LoyaltyPointDTO } from './loyaltyPointDTO';
export type UserDTO = {
    userId?: number;
    email?: string;
    userName?: string;
    password?: string;
    fullName?: string;
    phone?: string;
    dateOfBirth: Date;
    address?: string;
    cccd?: string;
    roleId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    avatarUrl?: string;
    isActive?: boolean;
    loyaltyPointDTO?: LoyaltyPointDTO;
};
