package com.example.foxspot.service

import com.example.foxspot.model.classes.Event
import com.example.foxspot.model.enum.EventStatus
import com.example.foxspot.repository.EventRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import java.time.Instant
import java.time.LocalDate
import java.time.LocalDateTime

@Service
class EventSyncService(
    @Autowired val eventRepository: EventRepository
) {
    // Runs every 10 seconds
    @Scheduled(fixedRate = 10 * 1000)
    fun startScheduledEvents() {
        val scheduledEvents = eventRepository.findAllByStatus(EventStatus.SCHEDULED)
        scheduledEvents.forEach { event ->
            if(event.startTime?.isAfter(Instant.now()) == true) {
                event.status = EventStatus.ACTIVE
                eventRepository.save(event)
            }
        }
    }
}