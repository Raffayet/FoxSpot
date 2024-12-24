package com.example.foxspot.model

import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "events")
data class Event(
        val name: String,
        val address: String,
        val city: String,
        val eventType: String,
        val description: String,
        val image: String,
        val location: Point
) : Base()
