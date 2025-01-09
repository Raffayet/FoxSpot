import React, {useEffect, useState} from 'react';
import { View, Text, FlatList } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { useQuery } from "@tanstack/react-query";
import {TransactionService} from "@/service/transaction.service";
import {Transaction} from "@/model/transaction";
import {InvoiceService} from "@/service/invoice.service";
import {useMap} from "@/hooks/MapContext";

export default function BillingPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [invoiceTotal, setInvoiceTotal] = useState<number | undefined>(undefined);

    // Fetch transactions
    const { refetch: refetchTransactions, isLoading: isLoadingTransactions, isError: isErrorTransactions, data: transactionData } = useQuery<Transaction[]>({
        queryKey: ['transactions'],
        queryFn: TransactionService.getAllTransactions,
        refetchInterval: 5000,
    });

    // Fetch current invoice total
    const { refetch: refetchInvoice, isLoading: isLoadingInvoice, isError: isErrorInvoice, data: invoiceData } = useQuery<number>({
        queryKey: ['current-invoice'],
        queryFn: InvoiceService.getCurrentInvoiceTotal,
        refetchInterval: 5000,
    });

    useEffect(() => {
        if (transactionData) {
            setTransactions(transactionData);
        }
        if (invoiceData !== undefined) {
            setInvoiceTotal(invoiceData);
        }
    }, [transactionData, invoiceData]);

    function formatEventTime(startTime: string, endTime: string): string {
        const start = new Date(startTime);
        const end = new Date(endTime);

        const formatter = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        const formattedStartDate = formatter.format(start).replace(',', '');
        const formattedEndTime = end.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

        return `${formattedStartDate} - ${formattedEndTime}`;
    }

    const renderTransaction = ({ item }) => (
        <View style={styles.transactionItem}>
            <View style={styles.row}>
                <Text style={styles.transactionTitle}>{item.eventName}</Text>
                <Text style={styles.transactionAmount}>{item.amount} €</Text>
            </View>
            <Text style={styles.transactionDate}>{formatEventTime(item.eventStartTime, item.eventEndTime)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Transactions</Text>
            {transactions && transactions.length > 0 ? (
                <FlatList
                    data={transactions}
                    keyExtractor={(item) => item.id}
                    renderItem={renderTransaction}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <Text style={styles.noTransactions}>No transactions</Text>
            )}
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceText}>Balance</Text>
                { invoiceData && (invoiceData as number) < 0 ?
                    (<Text style={styles.balanceAmountMinus}>{invoiceData} €</Text>)
                    :
                    (<Text style={styles.balanceAmountPlus}>{invoiceData} €</Text>)
                }
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e2f', // Dark background for a sleek look
        paddingHorizontal: '20@s',
        paddingTop: '20@s',
    },
    balanceContainer: {
        backgroundColor: '#1e1e2f', // Dark background for a sleek look
        paddingHorizontal: '20@s',
        marginBottom: '100@s'
    },
    title: {
        fontSize: '24@s',
        fontFamily: 'Poppins-Bold, sans-serif',
        color: '#fff',
        textAlign: 'center',
        marginTop: '20@s',
        marginBottom: '20@s',
        fontWeight: 'bold',
    },
    balanceText: {
        fontSize: '24@s',
        fontFamily: 'Poppins-Bold, sans-serif',
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: '5@s'
    },
    balanceAmountMinus: {
        fontSize: '24@s',
        fontFamily: 'Poppins-Bold, sans-serif',
        color: '#b11111',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: '5@s'
    },
    balanceAmountPlus: {
        fontSize: '24@s',
        fontFamily: 'Poppins-Bold, sans-serif',
        color: '#FFA000',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: '5@s'
    },
    listContainer: {
        paddingBottom: '20@s',
    },
    transactionItem: {
        backgroundColor: '#2a2a40',
        borderRadius: '10@s',
        padding: '15@s',
        marginBottom: '10@s',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: '5@s',
        shadowOffset: { width: 0, height: '2@s' },
        elevation: 3, // For Android shadow
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    transactionTitle: {
        fontSize: '16@s',
        color: '#fff',
        fontFamily: 'Poppins-Medium, sans-serif',
    },
    transactionAmount: {
        fontSize: '16@s',
        color: '#b11111', // Green for positive transactions
        fontFamily: 'Poppins-Bold, sans-serif',
    },
    transactionDate: {
        fontSize: '12@s',
        color: '#a1a1b3',
        marginTop: '5@s',
        fontFamily: 'Poppins-Regular, sans-serif',
    },
    noTransactions: {
        fontSize: '16@s',
        color: '#888',
        textAlign: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    totalSum: {
        fontSize: '24@s',
        fontFamily: 'Poppins-Bold, sans-serif',
        color: '#fff',
        textAlign: 'center',
        marginTop: '20@s',
        marginBottom: '100@s',
        fontWeight: 'bold',
    }
});
