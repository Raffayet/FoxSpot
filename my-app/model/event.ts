import { Point } from "@/model/point";
import { Base } from "@/model/base";

export class Event extends Base {
    name: string;
    location: Point;
    address: string;
    city: string;
    eventType: string;
    description: string;
    image: string;
    tags: string[];

    constructor(
        id: string,
        name: string,
        location: Point,
        address: string,
        city: string,
        eventType: string,
        description: string,
        image: string,
        tags: string[]
    ) {
        super(id);
        this.name = name;
        this.location = location;
        this.address = address;
        this.city = city;
        this.eventType = eventType;
        this.description = description;
        this.image = image;
        this.tags = tags;
    }
}
