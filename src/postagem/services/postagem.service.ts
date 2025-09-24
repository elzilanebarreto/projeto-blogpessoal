import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { TemaService } from './../../tema/services/tema.service';
import { Postagem } from '../entities/postagem.entity';

@Injectable() // Torna a classe injetável pelo NestJS
export class PostagemService {
  // Aqui vem por exemplo: o usuário só pode cadastrar um email único

  constructor(
    @InjectRepository(Postagem) // Injeta o repositório de acordo com a entidade
    private postagemRepository: Repository<Postagem>, // Repositório que acessa o DB
    private temaService: TemaService,
  ) {}

  // Simula fazer várias coisas ao mesmo tempo, sem parar o sistema, espera uma resposta FORA da aplicação

  // Busca todas as postagens no DB
  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find();
  }

  // Retornando o resultado atrávez da procura do ID
  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: {
        id,
      },
    });

    // Se não tiver a postagem e função parou aqui
    if (!postagem)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return postagem;
  }

  // Busca as postagens pelo título
  async findAllByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`),
      },
    });
  }

  // Cria uma nova postagem
  async create(postagem: Postagem): Promise<Postagem> {
    await this.temaService.findById(postagem.tema.id);

    return await this.postagemRepository.save(postagem);
  }

  // Atualiza uma postagem pelo ID
  async update(postagem: Postagem): Promise<Postagem> {
    await this.findById(postagem.id);

    await this.temaService.findById(postagem.tema.id);

    return this.postagemRepository.save(postagem);
  }

  // Deleta uma postagem pelo ID
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.postagemRepository.delete(id);
  }
}
