import { MigrationInterface, QueryRunner } from "typeorm";

export class update1658229238220 implements MigrationInterface {
    name = 'update1658229238220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`recipe\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(100) NOT NULL, \`description\` text NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_329b8ae12068b23da547d3b4798\``);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`list\` DROP FOREIGN KEY \`FK_46ded14b26382088c9f032f8953\``);
        await queryRunner.query(`ALTER TABLE \`list\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` DROP FOREIGN KEY \`FK_0f0fcdebe059aa8ae3ed0fed503\``);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` DROP FOREIGN KEY \`FK_7f6cca577485a5fb130e09c2a22\``);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` DROP FOREIGN KEY \`FK_d636b087c9976dbea910f182464\``);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` CHANGE \`productId\` \`productId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` CHANGE \`listId\` \`listId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` CHANGE \`recipeId\` \`recipeId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_329b8ae12068b23da547d3b4798\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`recipe\` ADD CONSTRAINT \`FK_fe30fdc515f6c94d39cd4bbfa76\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`list\` ADD CONSTRAINT \`FK_46ded14b26382088c9f032f8953\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` ADD CONSTRAINT \`FK_0f0fcdebe059aa8ae3ed0fed503\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` ADD CONSTRAINT \`FK_7f6cca577485a5fb130e09c2a22\` FOREIGN KEY (\`listId\`) REFERENCES \`list\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` ADD CONSTRAINT \`FK_d636b087c9976dbea910f182464\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`item_in_list\` DROP FOREIGN KEY \`FK_d636b087c9976dbea910f182464\``);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` DROP FOREIGN KEY \`FK_7f6cca577485a5fb130e09c2a22\``);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` DROP FOREIGN KEY \`FK_0f0fcdebe059aa8ae3ed0fed503\``);
        await queryRunner.query(`ALTER TABLE \`list\` DROP FOREIGN KEY \`FK_46ded14b26382088c9f032f8953\``);
        await queryRunner.query(`ALTER TABLE \`recipe\` DROP FOREIGN KEY \`FK_fe30fdc515f6c94d39cd4bbfa76\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_329b8ae12068b23da547d3b4798\``);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` CHANGE \`recipeId\` \`recipeId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` CHANGE \`listId\` \`listId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` CHANGE \`productId\` \`productId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` ADD CONSTRAINT \`FK_d636b087c9976dbea910f182464\` FOREIGN KEY (\`recipeId\`) REFERENCES \`recipe\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` ADD CONSTRAINT \`FK_7f6cca577485a5fb130e09c2a22\` FOREIGN KEY (\`listId\`) REFERENCES \`list\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`item_in_list\` ADD CONSTRAINT \`FK_0f0fcdebe059aa8ae3ed0fed503\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`list\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`list\` ADD CONSTRAINT \`FK_46ded14b26382088c9f032f8953\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_329b8ae12068b23da547d3b4798\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`recipe\``);
    }

}
