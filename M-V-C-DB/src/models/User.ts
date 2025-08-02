export class User {
    constructor(
        public id: number,
        public name: string,
        public email: string
        ) {}
}

export let users: User[] = [];