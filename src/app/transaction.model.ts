export class Transaction {
  constructor(
    public amount: number,
    public description: string,
    public date: Date,
    public transactionType: string,
  ) {}
}
