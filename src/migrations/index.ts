import * as migration_20250515_130307_migration from './20250515_130307_migration';

export const migrations = [
  {
    up: migration_20250515_130307_migration.up,
    down: migration_20250515_130307_migration.down,
    name: '20250515_130307_migration'
  },
];



