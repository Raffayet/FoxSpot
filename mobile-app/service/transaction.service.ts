import api from "@/service/api";
import {Transaction} from "@/model/transaction";

export class TransactionService {
    private static URI = "/transactions";

    static async getAllTransactions(): Promise<Transaction[]> {
        const response = await api.get<Transaction[]>(`${TransactionService.URI}/all`);
        return response.data;
    }
}
