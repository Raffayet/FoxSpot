import api from "@/service/api";
import { AppEvent } from "@/model/event";

export class EventService {
    private static URI = "/events";

    static async getAllEvents(): Promise<AppEvent[]> {
        const response = await api.get<AppEvent[]>(`${EventService.URI}/all`);
        return response.data;
    }

    static async createEvent(event: AppEvent): Promise<AppEvent> {
        const response = await api.post<AppEvent>(`${EventService.URI}/create`, event);
        return response.data;
    }
}
