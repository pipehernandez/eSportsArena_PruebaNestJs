import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('matches')
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    player1: User;

    @ManyToOne(() => User)
    player2: User;

    @ManyToOne(() => Tournament, tournament => tournament.matches)
    tournament: Tournament;

    @Column({nullable: true})
    scorePlayer1: number;

    @Column({nullable: true})
    scorePlayer2: number;

    @Column({nullable: true})
    result: 'Player1_WIN' | 'Player2_WIN' | 'DRAW' | null;
}
