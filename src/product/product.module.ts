import { forwardRef, Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
