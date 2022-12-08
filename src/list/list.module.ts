import { Module } from "@nestjs/common";
import { ListController } from "./list.controller";
import { ListService } from "./list.service";
import { ProductModule } from "../product/product.module";
import { RecipeModule } from "../recipe/recipe.module";

@Module({
  imports: [ProductModule, RecipeModule],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService],
})
export class ListModule {}
