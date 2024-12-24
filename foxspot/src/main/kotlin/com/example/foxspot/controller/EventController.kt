package com.example.foxspot.controller

import com.example.foxspot.model.Event
import com.example.foxspot.service.EventService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/events")
class EventController(
    @Autowired val eventService: EventService
) {
    @GetMapping("/all")
    fun getAll(): List<Event> {
        return eventService.getAllEvents()
    }

    @PostMapping("/create")
    fun createEvent(@RequestBody event: Event): ResponseEntity<Event> {
        val savedEvent = eventService.saveEvent(event)
        return ResponseEntity.ok(savedEvent)
    }
}