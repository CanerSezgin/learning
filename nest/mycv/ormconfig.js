const dbConfigs = {
    global: {
        synchronize: false,
        migrations: ['migrations/*.js'],
        cli: {
            migrationsDir: 'migrations'
        }
    },
    development: {
        type: 'sqlite',
        database: 'db.sqlite',
        entities: ['**/*.entity.js']
    },
    test: {
        type: 'sqlite',
        database: 'test.sqlite',
        entities: ['**/*.entity.ts'],
        migrationsRun: true
    },
    production: {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        migrationsRun: true,
        entities: ['**/*.entity.js'],
        ssl: {
            rejectUnauthorized: false
        }
    }
}

switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfigs.global, dbConfigs.development)
        break;
    case 'test':
        Object.assign(dbConfigs.global, dbConfigs.test)
        break;
    case 'production':
        Object.assign(dbConfigs.global, dbConfigs.production)
        break;
    default:
        throw new Error('unknown environment')
}

console.log(dbConfigs)

module.exports = dbConfigs.global