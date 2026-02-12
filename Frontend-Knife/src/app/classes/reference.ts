export class Reference {
    id!: number;
    name?: string;
    description?: string;
    descriptionClient?: string;
    url?: string;
    status?: boolean;
    price?: number;
    duration?: number;
    durationClient?: number;
    reservDuration?: number;
    timeStart?: string;
    timeEnd?: string;
    timeStartHoliday?: string;
    timeEndHoliday?: string;
}