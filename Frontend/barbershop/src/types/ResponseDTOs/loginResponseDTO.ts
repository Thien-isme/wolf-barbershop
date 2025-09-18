import type { UserDTO } from "./userDTO";

export type LoginResponseDTO = {
    accessToken: string
    refreshToken: string;
    user: UserDTO;
}