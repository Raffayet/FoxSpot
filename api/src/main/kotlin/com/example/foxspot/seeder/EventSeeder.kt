package com.example.foxspot.seeder

import com.example.foxspot.model.classes.Event
import com.example.foxspot.model.classes.Point
import com.example.foxspot.repository.EventRepository
import org.springframework.stereotype.Component

@Component
class EventSeeder(private val eventRepository: EventRepository): SeedCommon {

    override fun createSeedData() {
        val events = listOf(
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
                "Morning Run",
                "789 Park Lane",
                "Novi Sad",
                "Exercise",
                "Start your day with a refreshing morning run in the park.",
                "https://example.com/images/morning_run.jpg",
                Point(45.2524, 19.8495)
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
            ),
            Event(
                name = "Coffee with Sarah",
                address = "123 Main Street",
                city = "Novi Sad",
                eventType = "Party",
                description = "Enjoy a casual coffee with Sarah at the corner cafe.",
                image = "https://example.com/images/coffee_with_sarah.jpg",
                location = Point(45.2515, 19.8316)
            ),
            Event(
                name = "Concert at the Fortress",
                address = "Petrovaradin Fortress",
                city = "Petrovaradin",
                eventType = "Music",
                description = "Enjoy a live concert under the stars at the Petrovaradin Fortress.",
                image = "https://example.com/images/concert_fortress.jpg",
                location = Point(45.2520, 19.8610)
            ),
            Event(
                name = "Wine Tasting",
                address = "Vinarija Fruška Gora",
                city = "Irig",
                eventType = "Gastronomy",
                description = "Taste exquisite wines at a vineyard near Novi Sad.",
                image = "https://example.com/images/wine_tasting.jpg",
                location = Point(45.1443, 19.9112)
            ),
            Event(
                name = "Nature Walk",
                address = "Fruška Gora National Park",
                city = "Irig",
                eventType = "Outdoor",
                description = "Explore the beauty of Fruška Gora through a guided nature walk.",
                image = "https://example.com/images/nature_walk.jpg",
                location = Point(45.1628, 19.9348)
            ),
            Event(
                name = "Zmaj Jovina Street Tour",
                address = "Zmaj Jovina Street",
                city = "Novi Sad",
                eventType = "Sightseeing",
                description = "Discover the history and charm of Novi Sad's main pedestrian street.",
                image = "https://example.com/images/zmaj_jovina_tour.jpg",
                location = Point(45.2567, 19.8473)
            ),
            Event(
                name = "Cycling Adventure",
                address = "Danube Cycling Route",
                city = "Novi Sad",
                eventType = "Exercise",
                description = "Join a group cycling adventure along the Danube.",
                image = "https://example.com/images/cycling_adventure.jpg",
                location = Point(45.2495, 19.8514)
            ),
            Event(
                name = "Kayaking on the Danube",
                address = "Danube River",
                city = "Novi Sad",
                eventType = "Outdoor",
                description = "Paddle along the Danube and enjoy scenic river views.",
                image = "https://example.com/images/kayaking_danube.jpg",
                location = Point(45.2383, 19.8598)
            ),
            Event(
                name = "Traditional Market Day",
                address = "Futoška Pijaca",
                city = "Novi Sad",
                eventType = "Market",
                description = "Experience the local flavors and crafts at Futoška Market.",
                image = "https://example.com/images/market_day.jpg",
                location = Point(45.2526, 19.8445)
            ),
            Event(
                name = "Fishing by the River",
                address = "Kamenički Park",
                city = "Novi Sad",
                eventType = "Outdoor",
                description = "Relax and fish in the peaceful surroundings of Kamenički Park.",
                image = "https://example.com/images/fishing_river.jpg",
                location = Point(45.2312, 19.8184)
            )
        )
        eventRepository.saveAll(events)
    }

    override fun deleteSeedData() {
        eventRepository.deleteAll()
    }
}
