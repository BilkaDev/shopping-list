import { Module } from "@nestjs/common";
import { ProductModule } from "./product/product.module";
import { ListModule } from "./list/list.module";
import { RecipeModule } from "./recipe/recipe.module";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { MailModule } from "./mail/mail.module";

@Module({
  imports: [
    DatabaseModule,
    ProductModule,
    ListModule,
    RecipeModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailModule,
  ],
})
export class AppModule {}
