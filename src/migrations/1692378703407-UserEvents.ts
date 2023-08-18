import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserEvents1692378703407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner) {
    const table = new Table({
      name: 'user_events',
      columns: [
        {
          name: 'EventId',
          type: 'uuid',
          isGenerated: true,
          isPrimary: true,
          default: 'uuid_generate_v4()',
        },
        {
          name: 'EventType',
          type: 'varchar',
        },
        {
          name: 'UserId',
          type: 'varchar',
        },
        {
          name: 'Payload',
          type: 'varchar',
        },
        {
          name: 'Synchronized',
          type: 'boolean',
        },
        {
          name: 'Timestamp',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
      ],
    });
    
    queryRunner.createTable(
      table,
      true,
    );

    return table;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_events');
  }
}
