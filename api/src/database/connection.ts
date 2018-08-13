import * as Knex from 'knex';

export class Connection {
  private knexConnector: Knex = null;

  constructor() {
    if (this.knexConnector === null) {
      this.knexConnector = Knex({
        client: 'pg',
        debug: process.env.LOG_LEVEL === 'DEBUG',
        connection: {
          host: process.env.DATABASE_HOST || 'db',
          user: process.env.DATABASE_USER || '',
          password: process.env.DATABASE_PASSWORD || '',
          database: process.env.DATABASE_SCHEMA || ''
        }
      });
    }
  }

  public getKnex(): Knex {
    return this.knexConnector;
  }
}

export default new Connection().getKnex();
