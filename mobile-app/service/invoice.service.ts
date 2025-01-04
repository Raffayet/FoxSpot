import {Event} from "@/model/event";
import api from "@/service/api";

export class InvoiceService {
    private static URI = "/invoices";

    static async getCurrentInvoiceTotal(): Promise<Event[]> {
        const response = await api.get<Event[]>(`${InvoiceService.URI}/current`);
        return response.data;
    }

}
