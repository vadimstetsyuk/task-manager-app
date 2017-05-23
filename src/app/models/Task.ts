export class Task {
    title: string;
    start: string;
    time: string;
    duration: number;
    priority: number;
    description: string;

    constructor() {
        this.title = '';
        this.start = '';
        this.time = '';
        this.duration = 0;
        this.priority = 1;
        this.description = '';
    }
}