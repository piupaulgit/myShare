export interface IEvent {
    id?: string;
    title: string;
    description: string;
    date: any;
    createdBy: any;
    members: string[];
    status: string;
    expenses?: IExpense[]
  }

export interface IExpense {
    title: string,
    value: string,
    splitBetween: string[],
    date: string,
    spentBy: string,
    status: string
}