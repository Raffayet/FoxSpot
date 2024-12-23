package com.example.foxspot.service

import com.example.foxspot.model.Event
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
}