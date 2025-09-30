import { JwtAuthGuard } from '../../auth/guard/jst.auth.guard';
import { Postagem } from '../entities/postagem.entity';
import { PostagemService } from './../services/postagem.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

@UseGuards(JwtAuthGuard)
// Caminho / rota
@Controller('/postagens')
export class PostagemController {
  // Injeção de dependência da Service
  constructor(private readonly PostagemService: PostagemService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Postagem[]> {
    return this.PostagemService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    return this.PostagemService.findById(id);
  }

  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findAllByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.PostagemService.findAllByTitulo(titulo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.PostagemService.create(postagem);
  }

  // Body pega o conteúdo do corpo via requisição HTTP

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() postagem: Postagem): Promise<Postagem> {
    return this.PostagemService.update(postagem);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.PostagemService.delete(id);
  }
}
