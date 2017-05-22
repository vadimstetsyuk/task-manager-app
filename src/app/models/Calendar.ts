import { Day } from './Day';

export class Calendar {
    week: any;
    days: Day[];
    currDate: Date;

    public constructor() {
        this.days = [];
    }
}