import { 
  User, 
  CreateUserData, 
  UpdateUserData, 
  LoginData, 
  LoginResult
} from '../../domain/types';

// User use case interfaces
export interface CreateUser {
  execute(data: CreateUserData): Promise<User>;
}

export interface GetUser {
  execute(params: { id: string }): Promise<User>;
}

export interface ListUsers {
  execute(): Promise<User[]>;
}

export interface UpdateUser {
  execute(params: { id: string; data: UpdateUserData }): Promise<User>;
}

export interface DeleteUser {
  execute(params: { id: string }): Promise<void>;
}

export interface LoginUser {
  execute(data: LoginData): Promise<LoginResult>;
}
