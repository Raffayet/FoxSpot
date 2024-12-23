import {Point} from "@/model/point";
import {Base} from "@/model/base";

export class Event extends Base {
    name: string;
    location: Point;

    constructor(id: string, name: string, location: Point) {
        super(id);
        this.name = name;
        this.location = location;
    }
}
