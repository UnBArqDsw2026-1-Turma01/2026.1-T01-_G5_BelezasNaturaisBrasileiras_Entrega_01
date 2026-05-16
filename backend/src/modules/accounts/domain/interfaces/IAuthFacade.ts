export interface IAuthFacade {
  registerUser(email: string, password: string): Promise<{ uid: string }>;
  removeUser(uid: string): Promise<void>;
}
