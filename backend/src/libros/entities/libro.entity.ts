import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  idCategoria: number;
}
