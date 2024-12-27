import {BaseModel} from "@/model/base";

export interface Transaction extends BaseModel {
    amount?: number
    eventStartTime?: Date
    eventEndTime?: Date
    eventId?: string
    eventName?: string
}
