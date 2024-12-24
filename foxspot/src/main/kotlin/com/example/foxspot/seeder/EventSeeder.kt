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
                Event(
                        name = "Coffee with Sarah",
                        address = "123 Main Street",
                        city = "Novi Sad",
                        eventType = "Meeting",
                        description = "Enjoy a casual coffee with Sarah at the corner cafe.",
                        image = "https://example.com/images/coffee_with_sarah.jpg",
                        location = Point(45.2565, 19.8376)
                ),
                Event(
                        name = "Meeting with John",
                        address = "456 Business Blvd",
                        city = "Novi Sad",
                        eventType = "Work",
                        description = "Discuss project updates and future plans with John.",
                        image = "https://example.com/images/meeting_with_john.jpg",
                        location = Point(45.2671, 19.8343)
                ),
                Event(
                        name = "Morning Run",
                        address = "789 Park Lane",
                        city = "Novi Sad",
                        eventType = "Exercise",
                        description = "Start your day with a refreshing morning run in the park.",
                        image = "https://example.com/images/morning_run.jpg",
                        location = Point(45.2524, 19.8495)
                ),
                Event(
                        name = "Visit to the Gallery",
                        address = "101 Art Street",
                        city = "Novi Sad",
                        eventType = "Culture",
                        description = "Explore stunning artwork at the local gallery.",
                        image = "https://example.com/images/visit_to_gallery.jpg",
                        location = Point(45.2552, 19.8433)
                ),
                Event(
                        name = "Dinner with Alex",
                        address = "202 Gourmet Avenue",
                        city = "Novi Sad",
                        eventType = "Dinner",
                        description = "Enjoy a fine dining experience with Alex at a fancy restaurant.",
                        image = "https://example.com/images/dinner_with_alex.jpg",
                        location = Point(45.2530, 19.8590)
                )
        )
        eventRepository.saveAll(notes)
    }

}
