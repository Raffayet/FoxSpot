package com.example.foxspot.service

import com.example.foxspot.model.enum.EventStatus
import com.example.foxspot.repository.EventRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class EventSyncService(
    @Autowired val eventRepository: EventRepository,
    @Autowired val transactionService: TransactionService
) {
    // Runs every 10 seconds
    @Scheduled(fixedRate = 10 * 1000)
    fun startScheduledEvents() {
        val scheduledEvents = eventRepository.findAllByStatus(EventStatus.SCHEDULED)
        val now = Instant.now()
        scheduledEvents.forEach { event ->
            if(event.startTime != null && event.startTime?.isBefore(now) == true) {
                event.status = EventStatus.ACTIVE
                eventRepository.save(event)
            }
        }
    }

    @Scheduled(fixedRate = 10 * 1000)
    fun endActiveEvents() {
        val activeEvents = eventRepository.findAllByStatus(EventStatus.ACTIVE)
        val now = Instant.now()
        activeEvents.forEach { event ->
            if(event.endTime?.isBefore(now) == true) {
                event.status = EventStatus.FINISHED
                eventRepository.save(event)
                val transaction = transactionService.fillTransactionFields(event)
                transactionService.create(transaction)
            }
        }
    }
}