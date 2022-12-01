import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration31669929718567 implements MigrationInterface {
    name = 'InitialMigration31669929718567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ADD "kurmiqnko" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" ADD "solution" character varying(300) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "solution"`);
        await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "kurmiqnko"`);
    }

}
