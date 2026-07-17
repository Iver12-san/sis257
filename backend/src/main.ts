import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //paso dos
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  //Para ven en consola en que ruta esta--Paso 1
  console.log(`App corriendo en ${await app.getUrl()}`);
}
bootstrap();
