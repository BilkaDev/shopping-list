import { forwardRef, Module } from "@nestjs/common";
import { BasketController } from "./basket.controller";
import { BasketService } from "./basket.service";
import { ListModule } from "../list/list.module";

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [forwardRef(() => ListModule)],
  exports: [BasketService],
})
export class BasketModule {}
