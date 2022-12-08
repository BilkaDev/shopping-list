import { forwardRef, Module } from "@nestjs/common";
import { RecipeController } from "./recipe.controller";
import { RecipeService } from "./recipe.service";
import { ListModule } from "../list/list.module";

@Module({
  imports: [forwardRef(() => ListModule)],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipeModule {}
