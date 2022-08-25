import { forwardRef, Module } from "@nestjs/common";
import { ListController } from "./list.controller";
import { ListService } from "./list.service";
import { ProductModule } from "../product/product.module";
import { RecipeModule } from "../recipe/recipe.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [forwardRef(() => ProductModule), forwardRef(() => RecipeModule), forwardRef(() => UserModule)],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService],
})
export class ListModule {}
