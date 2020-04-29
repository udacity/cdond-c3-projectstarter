import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrders1549375960026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" uuid NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_products_product" ("orderId" uuid NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_59f5d41216418eba313ed3c7d7c" PRIMARY KEY ("orderId", "productId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_products_product" ADD CONSTRAINT "FK_1f9ea0b0e59e0d98ade4f2d5e99" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE`,
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
      `ALTER TABLE "order_products_product" DROP CONSTRAINT "FK_1f9ea0b0e59e0d98ade4f2d5e99"`,
    );
    await queryRunner.query(`DROP TABLE "order_products_product"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
