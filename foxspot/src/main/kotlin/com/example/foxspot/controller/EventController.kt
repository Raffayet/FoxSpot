package com.example.foxspot.controller

import com.example.foxspot.model.Event
import com.example.foxspot.service.EventService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/events")
class EventController(
    @Autowired val eventService: EventService
) {
    @GetMapping("/all")
    fun getAll(): List<Event> {
        return eventService.getAllEvents()
    }
}