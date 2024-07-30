import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tables1722372897530 implements MigrationInterface {
  name = 'Tables1722372897530';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profiles" ADD "native_language" character varying(10)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profiles" DROP COLUMN "native_language"`,
    );
  }
}
