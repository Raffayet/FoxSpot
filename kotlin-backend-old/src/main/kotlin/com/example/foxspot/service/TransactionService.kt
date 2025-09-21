package com.example.foxspot.service

import com.example.foxspot.model.classes.Event
import com.example.foxspot.model.classes.Transaction
import com.example.foxspot.repository.PricingRepository
import com.example.foxspot.repository.TransactionRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.time.Duration

@Service
class TransactionService(
    @Autowired val invoiceService: InvoiceService,

    @Autowired val transactionRepository: TransactionRepository,
    @Autowired val pricingRepository: PricingRepository
): BaseService<Transaction> {

    override fun getAll(): List<Transaction> {
        return transactionRepository.findAll()
    }

    override fun create(entity: Transaction): Transaction {
        val transactionAmount = entity.amount
        val invoice = invoiceService.getAll().first()
        if (transactionAmount != null) {
            invoice.totalAmount += transactionAmount
        }
        invoiceService.update(invoice)
        return transactionRepository.save(entity)
    }

    fun fillTransactionFields(event: Event): Transaction {
        val transaction = Transaction(
            eventId = event.id,
            eventName = event.name,
            eventStartTime = event.startTime,
            eventEndTime = event.endTime,
            amount = calculateTransactionAmount(event)
        )
        return transaction
    }

    fun calculateTransactionAmount(event: Event): Double {
        val pricing = pricingRepository.findFirst()
        val pricePerHour = pricing?.pricePerHour

        // Calculating minutes for now for testing purposes - in real situation metric would be price / hour
        val minutesOnMap = Duration.between(event.startTime, event.endTime).toMinutes()

        // Calculate the amount and return the negative value or 0.0 if null
        val amount = pricePerHour?.times(minutesOnMap) ?: 0.0
        return -amount
    }
}