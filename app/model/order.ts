import { Transaction } from './Transaction';
import { StateOrder } from './StateOrder';

export class Order {
    public id:number;
    public date:Date;
    public transaction:Transaction;
    public state:StateOrder;
}

