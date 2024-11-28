import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commom/filters/HttpExceptionFilter';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { CustomHttpException } from './commom/exceptions/CustomHttpException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:80', 'http://localhost:3000'],
    methods: 'GET,POST,PATCH,DELETE,PUT',
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: (errors) => {
                // Mapeia as constraints diretamente, ignorando a propriedade
                const constraints = errors
                    .flatMap((error) => Object.values(error.constraints || [])); // Extrai todas as mensagens de restrição

                return new CustomHttpException(
                    'VALIDATION_ERROR',
                    constraints, // Retorna apenas as mensagens das constraints
                    HttpStatus.BAD_REQUEST,
                );
            },
        }),
    );
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
