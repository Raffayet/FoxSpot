package com.example.foxspot.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "events")
class Event(
    val name: String,
    val location: Point
): Base()