import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Substitua pelo domínio permitido
    methods: 'GET,POST,PATCH,DELETE,PUT', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type,Authorization', // Cabeçalhos permitidos
  });
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
