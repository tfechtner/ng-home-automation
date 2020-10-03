import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class SettingsEntity {

    @PrimaryColumn()
    key: string;

    @Column({
        default: null
    })
    value: string;

}
