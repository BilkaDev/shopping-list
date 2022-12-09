import { forwardRef, Module } from "@nestjs/common";
import { ListController } from "./list.controller";
import { ListService } from "./list.service";
import { ProductModule } from "../product/product.module";
import { RecipeModule } from "../recipe/recipe.module";
import { BasketModule } from "src/basket/basket.module";

@Module({
  imports: [forwardRef(() => BasketModule), ProductModule, RecipeModule],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService],
})
export class ListModule {}
