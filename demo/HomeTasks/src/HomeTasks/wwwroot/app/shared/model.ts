export class Category {
    id: string;
    displayName: string;
    uniqueName : string;
}

export class User {
    id: string;
    name: string;
}


export class Task {
    constructor() {
        this.category = new Category();
        this.responsibleUser = new User();
    }

    id: string;
    description: string;
    isDone: boolean;
    category: Category;
    responsibleUser: User;
    lastModification: Date;
    syncRequired: boolean;
}
