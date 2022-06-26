import {forwardRef, Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import {ProductModule} from "../product/product.module";

@Module({
  imports: [forwardRef(()=> ProductModule)],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
