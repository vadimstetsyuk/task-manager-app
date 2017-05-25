export class CustomDate {
    date: string;
    month: string;
    year: string;

    hours: string;
    minutes: string;

    constructor(date, month, year, hours, minutes) {
        this.date = date;
        this.month = month;
        this.year = year;
        this.hours = hours;
        this.minutes = minutes;
    }
}