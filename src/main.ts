import { NestFactory } from "@nestjs/core";
import * as dotenv from "dotenv";

import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { GlobalExceptionFilter } from "./filters/global-exception.filter";
import * as cookieParser from "cookie-parser";
import { ApiTransformInterceptor } from "./interceptors/api-transform.interceptors";
import { CONFIG } from "./config/client-config";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  app.enableCors({
    origin: CONFIG.corsOrigin,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
      transform: true,
      forbidUnknownValues: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ApiTransformInterceptor());
  app.use(cookieParser());

  await app.listen(3002);
}

bootstrap();
