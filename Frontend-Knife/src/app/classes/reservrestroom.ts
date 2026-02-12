import { Restroom } from "./restroom";

export class ReservRestroom {
    id!: number;
    date?: Date;
    description?: string;
    time?: string;
    restroom?: Restroom;
}