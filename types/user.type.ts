export type CurrentUser = {
  uid: number;
  username: string;
  token: string; // jwt
};

export interface BaseRequest<T> {
  statusCode: number;
  result: T;
  message: string;
}
