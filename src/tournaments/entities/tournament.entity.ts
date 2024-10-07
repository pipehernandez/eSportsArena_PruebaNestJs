import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    
}
