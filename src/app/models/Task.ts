export class Task {
    title: string;
    start: Date;
    duration: number;
    priority: string;
    description: string;

    constructor() {
        this.title = '';
        this.start = new Date();
        this.duration = 0;
        this.priority = 'low';
        this.description = '';
    }
}