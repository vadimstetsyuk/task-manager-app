export class CustomDate {
    date: number;
    month: number;
    year: number;
    hours: number;
    minutes: number;

    public constructor(date: number, month: number, year: number, hours: number, minutes: number) {
        this.date = date;
        this.month = month;
        this.year = year;
        this.hours = hours;
        this.minutes = minutes;
    }
}