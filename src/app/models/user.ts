export interface User {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  token?: string;
  remember: boolean;
}
