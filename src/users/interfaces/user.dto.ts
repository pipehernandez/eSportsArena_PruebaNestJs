import { Role } from "src/common/enums/role.enum";

export interface UserDto{
    id: number;
    nickName: string | null;
    name: string;
    age: number | null;
    email: string;
    role: Role;
}