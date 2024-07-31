import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tables1722384660116 implements MigrationInterface {
  name = 'Tables1722384660116';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profiles" DROP COLUMN "native_language"`,
    );
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "projects" ADD "description" character varying(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "projects" ADD "description" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD "native_language" character varying(10)`,
    );
  }
}
