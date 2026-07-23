import { Autore } from 'src/autores/entities/autore.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('libros')
export class Libro {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 50 })
  titulo: string;

  @Column('varchar', { length: 100 })
  imagen: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column()
  stock: number;

  @Column('integer', { name: 'id_autor' })
  idAutor: number;

  @Column('integer', { name: 'id_Categoria' })
  idCategoria: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacaion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Categoria, categoria => categoria.libros)
  @JoinColumn({ name: 'id_Categoria', referencedColumnName: 'id' })
  categoria: Categoria;

  @ManyToOne(() => Autore, autore => autore.libros)
  @JoinColumn({ name: 'id_autor', referencedColumnName: 'id' })
  autore: Autore;
}
