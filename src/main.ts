import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationError, ValidationPipe } from "@nestjs/common";
import { GlobalExceptionFilter } from "./filters/global-exception.filter";
import * as cookieParser from "cookie-parser";
import { ApiTransformInterceptor } from "./interceptors/api-transform.interceptors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "http://localhost:3000",
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
      transform: true,
      forbidUnknownValues: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException("Validation error..");
      },
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ApiTransformInterceptor());
  app.use(cookieParser());

  await app.listen(3002);
}
bootstrap();
