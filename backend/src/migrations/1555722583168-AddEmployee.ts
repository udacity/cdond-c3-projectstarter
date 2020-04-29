import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddEmployee1555722583168 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "firstName" character varying(100) NOT NULL, "middleName" character varying(100), "lastName" character varying(100) NOT NULL, "secondLastName" character varying(100), "displayName" character varying(100), "companyEmail" character varying(50) NOT NULL DEFAULT '', "personalEmail" character varying(50) DEFAULT '', "birthdate" TIMESTAMP, "startDate" TIMESTAMP NOT NULL, "address" character varying(200), "phoneNumber" character varying(100), "bankName" character varying(100), "accountNumber" character varying(100), "gender" character varying, "tags" json NOT NULL DEFAULT '{}', "country" character varying(100) NOT NULL, "region" character varying(100) NOT NULL, "city" character varying(100) NOT NULL, "effectiveDate" TIMESTAMP NOT NULL, "salary" numeric NOT NULL, "salaryType" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "workingHoursPerWeek" integer NOT NULL DEFAULT 40, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1f9ea0b0e59e0d98ade4f2d5e9" ON "order_products_product" ("orderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d6c66c08b9c7e84a1b657797df" ON "order_products_product" ("productId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_d6c66c08b9c7e84a1b657797df"`);
        await queryRunner.query(`DROP INDEX "IDX_1f9ea0b0e59e0d98ade4f2d5e9"`);
        await queryRunner.query(`DROP TABLE "employee"`);
    }

}
