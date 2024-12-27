import api from "@/service/api";
import { Event } from "@/model/event";

export class EventService {
    private static URI = "/events";

    static async getAllEvents(): Promise<Event[]> {
        const response = await api.get<Event[]>(`${EventService.URI}/all`);
        return response.data;
    }

    static async createEvent(event: Event): Promise<Event> {
        const response = await api.post<Event>(`${EventService.URI}/create`, event);
        return response.data;
    }

    static async deleteEvent(eventId: string): Promise<void> {
        await api.delete(`${EventService.URI}/delete/${eventId}`);
    }

    static async updateEvent(eventId: string, updatedEvent: Event): Promise<Event> {
        try {
            const response = await api.put<Event>(`${EventService.URI}/update/${eventId}`, updatedEvent);
            return response.data;
        } catch (error) {
            console.error("Error updating event in API:", error);
            throw error;
        }
    }


}
