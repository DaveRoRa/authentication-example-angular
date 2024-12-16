export interface UserInterface {
  email: string;
  username: string;
  token: string;
}

export interface UserRegisterInterface {
  username: string;
  password: string;
  email: string;
}

export interface UserLoginInterface {
  email: string;
  password: string;
}
