import { Role } from "src/common/enums/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 30, nullable: true })
    nickName: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    name: string;

    @Column({nullable: true})
    age: number;

    @Column({ type: 'varchar', length: 150, nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.Admin })
    role: Role;
}
