import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAutoreDto } from './dto/create-autore.dto';
import { UpdateAutoreDto } from './dto/update-autore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autore } from './entities/autore.entity';

@Injectable()
export class AutoresService {
  constructor(@InjectRepository(Autore) private readonly autoresRepository: Repository<Autore>) {}
  async create(createAutoreDto: CreateAutoreDto): Promise<Autore> {
    let autore = await this.autoresRepository.findOneBy({
      nombre: createAutoreDto.nombre,
      apellido: createAutoreDto.apellido,
    });
    if (autore) throw new ConflictException('El autor ya existe');
    autore = new Autore();
    Object.assign(autore, createAutoreDto);
    return this.autoresRepository.save(autore);
  }

  async findAll(): Promise<Autore[]> {
    return this.autoresRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<Autore> {
    const autore = await this.autoresRepository.findOneBy({ id });
    if (!autore) throw new NotFoundException('El autor no existe');
    return autore;
  }

  async update(id: number, updateAutoreDto: UpdateAutoreDto): Promise<Autore> {
    const autore = await this.findOne(id);
    Object.assign(autore, updateAutoreDto);
    return this.autoresRepository.save(autore);
  }

  async remove(id: number): Promise<Autore> {
    const autore = await this.findOne(id);
    return this.autoresRepository.softRemove(autore);
  }
}
