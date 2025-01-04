package com.example.foxspot.repository

import com.example.foxspot.model.classes.Invoice
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface InvoiceRepository: MongoRepository<Invoice, String> {
}