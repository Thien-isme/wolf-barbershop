import type { UserDTO } from './userDTO';

export type LoyaltyPointDTO = {
    loyaltyPointsId: number;
    userId: number;
    totalPoints?: number;
    lastUpdated?: Date;
    userDTO: UserDTO;
};
