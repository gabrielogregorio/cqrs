import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserEvents1692378703407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    const table = new Table({
      name: 'user_events',
      columns: [
        {
          name: 'eventId',
          type: 'uuid',
          isGenerated: true,
          isPrimary: true,
          default: 'uuid_generate_v4()',
        },
        {
          name: 'eventType',
          type: 'varchar',
        },
        {
          name: 'userId',
          type: 'varchar',
        },
        {
          name: 'payload',
          type: 'varchar',
        },
        {
          name: 'synchronized',
          type: 'boolean',
        },
        {
          name: 'timestamp',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
      ],
    });

    queryRunner.createTable(table, true);

    return table;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_events');
  }
}
