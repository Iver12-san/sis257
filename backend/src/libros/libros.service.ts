import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LibrosService {
  constructor(@InjectRepository(Libro) private readonly librosRepository: Repository<Libro>) {}
  async create(createLibroDto: CreateLibroDto): Promise<Libro> {
    let libro = await this.librosRepository.findOneBy({
      idAutor: createLibroDto.idAutor,
      titulo: createLibroDto.titulo,
    });
    if (libro) throw new ConflictException('El Libro ya existe con ese con ese aututor');

    libro = new Libro();
    Object.assign(libro, createLibroDto);
    return this.librosRepository.save(libro);
  }

  async findAll(): Promise<Libro[]> {
    return this.librosRepository.find({
      relations: { autore: true, categoria: true },
      order: { titulo: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Libro> {
    const libro = await this.librosRepository.findOne({
      where: { id },
      relations: { autore: true, categoria: true },
    });
    if (!libro) throw new NotFoundException('El libro no existe');
    return libro;
  }

  async update(id: number, createLibroDto: UpdateLibroDto): Promise<Libro> {
    const libro = await this.findOne(id);
    Object.assign(libro, createLibroDto);
    return this.librosRepository.save(libro);
  }

  async remove(id: number) {
    const libro = await this.findOne(id);
    return this.librosRepository.softRemove(libro);
  }
}
