package com.example.foxspot.service

import com.example.foxspot.model.classes.Event
import com.example.foxspot.model.classes.Invoice
import com.example.foxspot.repository.InvoiceRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class InvoiceService(
    @Autowired val invoiceRepository: InvoiceRepository
): BaseService<Invoice> {
    override fun getAll(): List<Invoice> {
        return invoiceRepository.findAll()
    }

    override fun create(entity: Invoice): Invoice {
        return invoiceRepository.save(entity)
    }

    fun getCurrentInvoiceTotal(): Double? {
        return invoiceRepository.findAll().first().totalAmount
    }

    fun update(entity: Invoice) {
        invoiceRepository.save(entity)
    }
}