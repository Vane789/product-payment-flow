export class Payment {
  constructor(
    public readonly id: string,
    public readonly cardNumber: string,
    public readonly expirationMonth: string,
    public readonly expirationYear: number,
    public readonly cvv: string,
    public readonly cardholderName: string,
    public readonly documentType: string,
    public readonly documentNumber: string,
    public readonly installments: string,
    public readonly acceptTerms: boolean,
  ) {}
}
