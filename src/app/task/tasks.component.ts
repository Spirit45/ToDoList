/**
 * Created by Егор on 16.07.2018.
 */
export class Task {
    name:string;
    description:string;
    date:string;
    trigger:boolean;
    showDesc:boolean;

    constructor (name,description,date){
        this.name=name;
        this.description=description;
        this.date=date;
        this.trigger=false;
        this.showDesc=false;

    }
}