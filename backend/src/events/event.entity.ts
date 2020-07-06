import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EventEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: null
    })
    deviceID: number;

    @Column({
        default: null
    })
    propertyName: string;

    @Column({
        default: null
    })
    type: string;

    @Column({
        default: null
    })
    value: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    timestamp: string;
}
