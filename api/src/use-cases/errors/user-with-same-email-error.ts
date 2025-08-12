export class UserWithSameEmailError extends Error {
  constructor() {
    super('Email already used')
  }
}
