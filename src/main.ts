import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(process.env.OPEN_API_TITLE)
    .setDescription(process.env.OPEN_API_DESCRIPTION)
    .setVersion(process.env.OPEN_API_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(process.env.OPEN_API_ENDPOINT, app, document);

  await app.listen(process.env.PORT);
  console.log('::: Server running @', await app.getUrl(), ' :::');
}
bootstrap();
