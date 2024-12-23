import api from "@/service/api";

export class EventService {
    private static URI = "/events";

    static async getAllEvents(): Promise<Event[]> {
        const response = await api.get<Event[]>(`${EventService.URI}/all`);
        return response.data;
    }
}
