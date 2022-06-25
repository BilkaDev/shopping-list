import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ListModule } from './list/list.module';
import { RecipeModule } from './recipe/recipe.module';
import {DatabaseModule} from "./database/database.module";

@Module({
  imports: [DatabaseModule,ProductModule, ListModule, RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
