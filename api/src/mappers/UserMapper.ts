import { IUserResponse } from 'interfaces/responses';
import { IDBUser, IUser } from 'interfaces/user';

export default class UserMapper {

  public map(user: IUser): IUserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created: user.created
    };
  }

  public mapAll(users: IUser[]): IUserResponse[] {
    return users.map(this.map, this);
  }

  public serialize(user: IDBUser): IUser {
    return {
      id: user.id,
      name: user.name,
      password: user.password,
      email: user.email,
      created: new Date(user.created)
    };
  }

  public serializeAll(users: IDBUser[]): IUser[] {
    return users.map(this.serialize, this);
  }

}