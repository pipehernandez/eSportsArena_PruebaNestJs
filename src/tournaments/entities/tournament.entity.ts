import { Match } from "src/matches/entities/match.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tournaments')
export class Tournament {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({type: 'date'})
    startDate: Date;

    @Column({type: 'date'})
    endDate: Date;

    @Column()
    status: string;

    @OneToMany(() => Match, match => match.tournament)
    matches: Match[];
}
