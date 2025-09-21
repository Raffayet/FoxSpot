package com.example.foxspot.seeder

import com.example.foxspot.model.classes.Invoice
import com.example.foxspot.repository.InvoiceRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
/*
    Used only for MVP - in final product this should be created automatically once per month
    We need to have InvoiceScheduler service which will create one invoice per month and manage the invoice calculations

    @Component
    class InvoiceScheduler(
        private val invoiceService: InvoiceService
    ) {
        // Runs at application startup to create the current month's invoice
        @Scheduled(initialDelay = 1000, fixedDelay = Long.MAX_VALUE) // Runs once shortly after startup
        fun generateInitialInvoice() {
            invoiceService.createInvoiceForCurrentMonth()
        }

        // Scheduled to run on the 1st of every month at midnight
        @Scheduled(cron = "0 0 0 1 * *")
        fun generateMonthlyInvoice() {
            invoiceService.createInvoiceForCurrentMonth()
        }
    }
*/

@Component
class InvoiceSeeder(
    @Autowired val invoiceRepository: InvoiceRepository
): SeedCommon {
    override fun createSeedData() {
        val invoice = Invoice(
            totalAmount = 0.0
        )
        invoiceRepository.save(invoice)
    }

    override fun deleteSeedData() {
        invoiceRepository.deleteAll()
    }
}