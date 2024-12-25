import { Point } from "@/model/point";
import {BaseModel} from "@/model/base";

export interface Event extends BaseModel {
    name?: string;
    location?: Point;
    address?: string;
    city?: string;
    eventType?: string;
    description?: string;
    image?: string;
    tags?: string[];
    startTime?: string;
    endTime?: string;
    status?: string;
}
