export class Product {
  constructor(
    public readonly id: string,
    public readonly img: string,
    public readonly description: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly quantity: number,
  ) {}
}
