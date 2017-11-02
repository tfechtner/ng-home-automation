export class Room {
    private id: string = null;
    private name: string = null;
    private icon: string = null;

    constructor(initObject: object) {
        if (initObject.hasOwnProperty('id')) {
            this.id = initObject['id'];
        }
        if (initObject.hasOwnProperty('name')) {
            this.name = initObject['name'];
        }
        if (initObject.hasOwnProperty('icon')) {
            this.icon = initObject['icon'];
        }
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getIcon() {
        return this.icon;
    }
}
