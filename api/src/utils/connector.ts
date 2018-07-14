import * as Knex from 'knex';

export default class Connector {
  private knexConnector: Knex;

  constructor() {
    this.knexConnector = Knex({
      client: 'pg',
      connection: {
        host: process.env.DATABASE_HOST || 'db',
        user: process.env.DATABASE_USER || '',
        password: process.env.DATABASE_PASSWORD || '',
        database: process.env.DATABASE_SCHEMA || ''
      }
    });
  }

  public getKnex(): Knex {
    return this.knexConnector;
  }
}
