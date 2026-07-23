import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //paso dos
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API Res Music - Invierno Practica')
    .setDescription('API Res para la gestion de libreria de la materia sis257')
    .setVersion('1.0')
    .addTag('autores,categoria,cliente,libros,trabajadores')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  //Para ven en consola en que ruta esta--Paso 1
  console.log(`App corriendo en ${await app.getUrl()}`);
}
bootstrap();
