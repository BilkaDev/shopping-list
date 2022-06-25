import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [ProductModule, ListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
