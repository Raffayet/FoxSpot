package com.example.foxspot.repository

import com.example.foxspot.model.classes.Event
import com.example.foxspot.model.enum.EventStatus
import org.springframework.data.mongodb.repository.MongoRepository

interface EventRepository: MongoRepository<Event, String> {
    fun findAllByStatus(status: EventStatus): List<Event>
}