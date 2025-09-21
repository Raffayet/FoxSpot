package com.example.foxspot.model.classes

import org.springframework.data.mongodb.core.mapping.Document
import java.time.Instant

@Document("transactions")
class Transaction(
    val amount: Double? = null,
    val eventStartTime: Instant? = null,
    val eventEndTime: Instant? = null,

    val eventId: String? = null,
    val eventName: String? = null,
): BaseModel()