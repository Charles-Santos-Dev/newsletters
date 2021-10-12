import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne} from 'typeorm';
import { Model } from './Model';
import { Template } from './Template';
import { NewsFinalizadas } from './NewsFinalizadas';
import { Usuarios } from './Usuarios';

@Entity("Loja")
export class Loja extends Model{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    nome: string;

    @Column({type : 'boolean', default : true})
    status: boolean;

    @OneToMany(type => Template, templates=> templates.loja)
    templates: Template[];

    @OneToMany(type => NewsFinalizadas, newsfinalizadas=> newsfinalizadas.loja)
    newsfinalizadas: NewsFinalizadas[];

    @ManyToOne(type => Usuarios, usuario => usuario.lojas)
    usuario: Usuarios;
}