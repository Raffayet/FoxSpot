package com.example.foxspot.service

import com.example.foxspot.model.classes.Event
import com.example.foxspot.repository.EventRepository
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

    fun updateEvent(id: String, updatedEvent: Event): Event {
        val existingEvent = eventRepository.findById(id)
        if (existingEvent.isPresent) {
            val eventToUpdate = existingEvent.get().copy(
                    name = updatedEvent.name,
                    address = updatedEvent.address,
                    city = updatedEvent.city,
                    eventType = updatedEvent.eventType,
                    description = updatedEvent.description,
                    image = updatedEvent.image,
                    location = updatedEvent.location
            )

            // Ensure the `id` is preserved to avoid creating a new document
            eventToUpdate.id = id

            return eventRepository.save(eventToUpdate)
        } else {
            throw RuntimeException("Event with ID $id not found")
        }
    }
}