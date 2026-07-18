import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private readonly clientesRepository: Repository<Cliente>,
  ) {}
  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    let cliente = await this.clientesRepository.findOneBy({
      email: createClienteDto.email,
    });
    if (cliente) throw new ConflictException('El usuario ya existe');
    cliente = new Cliente();
    Object.assign(cliente, createClienteDto);
    return this.clientesRepository.save(cliente);
  }

  async findAll(): Promise<Cliente[]> {
    return this.clientesRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOneBy({ id });
    if (!cliente) throw new NotFoundException('El cliente no existe');
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    if (updateClienteDto.email && updateClienteDto.email !== cliente.email) {
      const existeOtro = await this.clientesRepository.findOneBy({
        email: updateClienteDto.email,
      });

      if (existeOtro) {
        throw new ConflictException('El correo electrónico ya está registrado en otro cliente');
      }
    }
    Object.assign(cliente, updateClienteDto);
    return this.clientesRepository.save(cliente);
  }

  async remove(id: number): Promise<Cliente> {
    const cliente = await this.findOne(id);
    return this.clientesRepository.softRemove(cliente);
  }
}
