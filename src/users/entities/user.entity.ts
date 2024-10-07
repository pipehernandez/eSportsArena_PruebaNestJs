import { Role } from "src/common/enums/role.enum";
import { Match } from "src/matches/entities/match.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 30, nullable: true, unique: true})
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

    @OneToMany(() => Match, match => match.player1)
    matchesAsPlayer1: Match[];

    @OneToMany(() => Match, match => match.player2)
    matchesAsPlayer2: Match[];
}
