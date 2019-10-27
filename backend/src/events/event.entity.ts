import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EventEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: null
    })
    room: string;

    @Column({
        default: null
    })
    device: string;

    @Column({
        default: null
    })
    status: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    timestamp: string;
}
