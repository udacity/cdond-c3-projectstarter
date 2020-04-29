import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixProductIdTable1549398619849 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "order_products_product" DROP CONSTRAINT "FK_d6c66c08b9c7e84a1b657797dff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_product" DROP CONSTRAINT "PK_59f5d41216418eba313ed3c7d7c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_product" ADD CONSTRAINT "PK_1f9ea0b0e59e0d98ade4f2d5e99" PRIMARY KEY ("orderId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_product" DROP COLUMN "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_product" ADD "productId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_product" DROP CONSTRAINT "PK_1f9ea0b0e59e0d98ade4f2d5e99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_product" ADD CONSTRAINT "PK_59f5d41216418eba313ed3c7d7c" PRIMARY KEY ("orderId", "productId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_product" ADD CONSTRAINT "FK_d6c66c08b9c7e84a1b657797dff" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "order_products_product" DROP CONSTRAINT "FK_d6c66c08b9c7e84a1b657797dff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_product" DROP CONSTRAINT "PK_59f5d41216418eba313ed3c7d7c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_product" ADD CONSTRAINT "PK_1f9ea0b0e59e0d98ade4f2d5e99" PRIMARY KEY ("orderId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_product" DROP COLUMN "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_product" ADD "productId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_product" DROP CONSTRAINT "PK_1f9ea0b0e59e0d98ade4f2d5e99"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_product" ADD CONSTRAINT "PK_59f5d41216418eba313ed3c7d7c" PRIMARY KEY ("orderId", "productId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_product" ADD CONSTRAINT "FK_d6c66c08b9c7e84a1b657797dff" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
