import * as migration_20250509_005328_migration from './20250509_005328_migration';
import * as migration_20250509_013415_migration from './20250509_013415_migration';

export const migrations = [
  {
    up: migration_20250509_005328_migration.up,
    down: migration_20250509_005328_migration.down,
    name: '20250509_005328_migration',
  },
  {
    up: migration_20250509_013415_migration.up,
    down: migration_20250509_013415_migration.down,
    name: '20250509_013415_migration'
  },
];
