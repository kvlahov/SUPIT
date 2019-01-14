class Person {
    constructor(name, surname, id) {
        this.name = name;
        this.surname = surname;
        this.id = id;
    }

    getName() {
        return this.name;
    }

    getFullName() {
        return this.name + ' ' + this.surname;
    }
}