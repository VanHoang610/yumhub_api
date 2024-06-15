declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function createAppInstance(port: number) {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Cấu hình CORS
  app.enableCors({
    origin: '*', // Hoặc bạn có thể chỉ định cụ thể các domain được phép
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);

  // Hot module replacement
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

async function bootstrap() {
  const port1 = process.env.PORT1 ? parseInt(process.env.PORT1, 10) : 3000;
  const port2 = process.env.PORT2 ? parseInt(process.env.PORT2, 10) : 3001;

  await createAppInstance(port1);
  await createAppInstance(port2);
}

bootstrap();
