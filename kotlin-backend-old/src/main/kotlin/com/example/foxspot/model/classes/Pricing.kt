package com.example.foxspot.model.classes

import com.example.foxspot.model.enum.Currency
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "pricing")
class Pricing(
    var pricePerHour: Double?,
    var totalPrice: Double?,
    var currency: Currency? = Currency.EUR
): BaseModel()