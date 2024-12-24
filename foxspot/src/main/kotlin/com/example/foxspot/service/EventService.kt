package com.example.foxspot.service

import com.example.foxspot.model.Event
import com.example.foxspot.repository.EventRepository
import org.bson.types.ObjectId
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class EventService(
    @Autowired val eventRepository: EventRepository
) {
    fun getAllEvents(): List<Event> {
        return eventRepository.findAll()
    }

    fun saveEvent(event: Event): Event {
        return eventRepository.save(event)
    }

    fun deleteEventById(id: String) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id)
        } else {
            throw RuntimeException("Event with ID $id not found")
        }
    }
}