declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  // First instance listening on port 3000
  const app1 = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configure CORS and static assets for the first instance
  app1.enableCors({
    origin: '*', // Or specify allowed domains
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app1.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Start listening on port 3000
  await app1.listen(3000);
  console.log('Application is running on: http://localhost:3000');

  // Second instance listening on port 3001
  const app2 = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configure CORS and static assets for the second instance
  app2.enableCors({
    origin: '*', // Or specify allowed domains
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app2.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Start listening on port 3001
  await app2.listen(3001);
  console.log('Application is running on: http://localhost:3001');

  // Hot module replacement
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      app1.close();
      app2.close();
    });
  }
}

bootstrap();
