package com.example.foxspot.seeder

import com.example.foxspot.model.Event
import com.example.foxspot.model.Point
import com.example.foxspot.repository.EventRepository
import jakarta.annotation.PostConstruct
import org.springframework.stereotype.Component

@Component
class EventSeeder(private val eventRepository: EventRepository) {

    @PostConstruct
    fun init() {
        deleteSeedData()
        createInitialNotes()
    }

    // Every time we run the app we must first delete the data from the previous runtime
    private fun deleteSeedData() {
        eventRepository.deleteAll()
    }

    private fun createInitialNotes() {
        val notes = listOf(
            Event("Coffee with Sarah", Point(45.2565, 19.8376)),
            Event("Meeting with John", Point(45.2671, 19.8343)),
            Event("Morning Run", Point(45.2524, 19.8495)),
            Event("Visit to the Gallery", Point(45.2552, 19.8433)),
            Event("Dinner with Alex", Point(45.2530, 19.8590))
        )
        eventRepository.saveAll(notes)
    }
}
