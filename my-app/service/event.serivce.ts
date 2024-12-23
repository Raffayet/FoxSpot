import api from "@/service/api";

export class EventSerivce {
    private static URI = "/events";

    static async getAllEvents(): Promise<Event[]> {
        console.log(`${EventSerivce.URI}/all`)
        const response = await api.post<any>(`http://localhost:8080/events/all`);
        console.log(response)
        return response.data;
    }
}
