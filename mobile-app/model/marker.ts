import {Base} from "@/model/base";

export interface Marker{
    address: string,
    description: string,
    city: string,
    eventType: string,
    image: string,
    tags: string[],
}
