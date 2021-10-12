import { Entity, PrimaryGeneratedColumn, Column ,ManyToOne,JoinColumn} from 'typeorm';
import { Model } from './Model';
import { Loja } from './Loja';

@Entity("NewsFinalizadas")
export class NewsFinalizadas extends Model{
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    newsFinalizadas: string;

    @Column('datetime')
    dataCriacao:Date;

    @ManyToOne(type => Loja, loja => loja.newsfinalizadas)
    loja: Loja;
}