package com.example.foxspot.model.classes

import com.example.foxspot.model.enum.EventStatus
import org.springframework.data.mongodb.core.mapping.Document
import java.time.Instant
import java.time.LocalDateTime

@Document(collection = "events")
data class Event(
    val name: String? = null,
    val address: String? = null,
    val city: String? = null,
    val eventType: String? = null,
    val description: String? = null,
    val image: String? = null,
    val location: Point? = null,

    val startTime: Instant? = null,
    val endTime: Instant? = null,

    // Indicate whether event should be shown on map
    var status: EventStatus? = EventStatus.SCHEDULED
) : BaseModel()
