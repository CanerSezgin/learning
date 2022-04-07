import { rm } from 'fs/promises'
import { join } from 'path'
import { getConnection } from 'typeorm'

global.beforeEach(async () => {
    await rm(join(__dirname, '..', 'test.sqlite')).catch(e => {})
})

global.afterEach(async () => {
    const conn = getConnection()
    await conn.close()
})