import { Entity, PrimaryGeneratedColumn, Column ,ManyToOne,JoinColumn} from 'typeorm';
import { Model } from './Model';
import { Loja } from './Loja';

@Entity("Template")
export class Template extends Model{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    header: string;

    @Column('text')
    body: string;

    @Column('text')
    topheader: string;

    @Column('text')
    footer: string;

    @Column('datetime')
    dataCriacao:Date;

    @ManyToOne(type => Loja, loja => loja.templates)
    loja: Loja;
}