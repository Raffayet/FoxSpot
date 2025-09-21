package com.example.foxspot.model.classes

import org.springframework.data.mongodb.core.mapping.Document

@Document("invoices")
class Invoice(
    var totalAmount: Double = 0.0
): BaseModel()