package com.example.foxspot.controller

import com.example.foxspot.model.classes.Event
import com.example.foxspot.service.EventService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.ZoneId
import java.time.ZoneOffset

@RestController
@RequestMapping("/events")
class EventController(
    @Autowired val eventService: EventService
) {
    @GetMapping("/all")
    fun getAll(): List<Event> {
        return eventService.getAll()
    }

    @PostMapping("/create")
    fun createEvent(@RequestBody event: Event): ResponseEntity<Event> {
        val savedEvent = eventService.create(event)
        return ResponseEntity.ok(savedEvent)
    }

    @DeleteMapping("/delete/{id}")
    fun deleteEvent(@PathVariable id: String): ResponseEntity<Void> {
        return try {
            eventService.deleteEventById(id = id?: throw Exception(id))
            ResponseEntity.noContent().build()
        } catch (e: Exception) {
            ResponseEntity.notFound().build()
        }
    }

    @PutMapping("/update/{id}")
    fun updateEvent(@PathVariable id: String, @RequestBody updatedEvent: Event): ResponseEntity<Event> {
        val updated = eventService.updateEvent(id, updatedEvent)
        return ResponseEntity.ok(updated)
    }
}