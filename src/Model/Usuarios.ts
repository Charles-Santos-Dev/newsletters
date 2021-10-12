import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne} from 'typeorm';
import { Model } from './Model';
import { Loja } from './Loja';

@Entity("Usuarios")
export class Usuarios extends Model{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    nome: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    senha: string;

    @Column({type : 'boolean', default : true})
    status: boolean;

    @Column({type : 'boolean', default : false})
    permissao: boolean;

    @OneToMany(type => Loja, lojas=> lojas.usuario)
    lojas: Loja[];
}