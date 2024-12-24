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

    static async deleteEvent(eventId: string): Promise<void> {
        await api.delete(`${EventService.URI}/delete/${eventId}`);
    }

    static async updateEvent(eventId: string, updatedEvent: AppEvent): Promise<AppEvent> {
        try {
            const response = await api.put<AppEvent>(`${EventService.URI}/update/${eventId}`, updatedEvent);
            return response.data;
        } catch (error) {
            console.error("Error updating event in API:", error);
            throw error;
        }
    }


}
