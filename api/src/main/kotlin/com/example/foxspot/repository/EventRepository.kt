package com.example.foxspot.repository

import com.example.foxspot.model.classes.Event
import org.springframework.data.mongodb.repository.MongoRepository

interface EventRepository: MongoRepository<Event, String> {
}