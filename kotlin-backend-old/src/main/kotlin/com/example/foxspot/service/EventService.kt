package com.example.foxspot.service

import com.example.foxspot.model.classes.Event
import com.example.foxspot.repository.EventRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.stereotype.Service

@Service
class EventService(
    @Autowired val eventRepository: EventRepository,
    @Autowired val mongoTemplate: MongoTemplate
): BaseService<Event> {
    override fun getAll(): List<Event> {
        return eventRepository.findAll()
    }

    override fun create(entity: Event): Event {
        return eventRepository.save(entity)
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

    fun searchEvents(query: String): List<Event> {
        if(query == "") return eventRepository.findAll()

        val criteria = Criteria().orOperator(
            Criteria.where("name").regex(query, "i"),
            Criteria.where("description").regex(query, "i"),
            Criteria.where("address").regex(query, "i"),
            Criteria.where("city").regex(query, "i"),
            Criteria.where("eventType").regex(query, "i")
        )
        val searchQuery = Query(criteria)
        return mongoTemplate.find(searchQuery, Event::class.java)
    }
}