export class UserWithSameCpfError extends Error {
  constructor() {
    super('CPF already used')
  }
}
