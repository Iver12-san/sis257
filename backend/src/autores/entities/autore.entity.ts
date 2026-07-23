import { Libro } from 'src/libros/entities/libro.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('autores')
export class Autore {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 20 })
  nombre: string;

  @Column('varchar', { length: 20 })
  apellido: string;

  @Column('varchar', { length: 20 })
  nacionalidad: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacaion' })
  fechaEliminacion: Date;

  @OneToMany(() => Libro, libro => libro.autore)
  libros: Libro[];
}
