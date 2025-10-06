import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal da Elzilane')
    .setDescription('Projeto Blog Pessoal feito com Nest')
    .setContact(
      'Elzilane Barreto',
      'https://github.com/elzilanebarreto/projeto-blogpessoal',
      'elzilanebarreto@gmail.com',
    )
    .setVersion('v1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00'; // Fuso horário

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
