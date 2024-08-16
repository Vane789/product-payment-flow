export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly surname: string,
    public readonly department: string,
    public readonly city: string,
    public readonly phone: string,
    public readonly email: string,
    public readonly shippingAddress: string,
    public readonly details: string,
  ) {}
}
