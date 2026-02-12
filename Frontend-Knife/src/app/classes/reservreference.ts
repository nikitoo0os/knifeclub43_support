import { Reference } from "./reference";

export class ReservReference {
    id!: number;
    date?: Date;
    description?: string;
    descriptionAdmin?: string;
    time?: string;
    phone?: string;
    email?: string;
    fioClient?: string;
    status?: boolean | null;
    dateBron?: Date;
    dateConfirmCancel?: Date | null;
    closedbron?: boolean;
    count_person?: number;
    reference?: Reference;
}