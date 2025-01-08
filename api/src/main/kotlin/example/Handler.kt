package example

import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.RequestHandler
import com.example.foxspot.FoxspotApplication
import com.example.foxspot.controller.EventController
import com.example.foxspot.controller.InvoiceController
import com.example.foxspot.controller.TransactionController
import com.example.foxspot.model.classes.Point
import org.springframework.boot.SpringApplication
import org.springframework.context.ApplicationContext
import org.springframework.http.ResponseEntity
import java.time.Instant

class Handler : RequestHandler<Map<String, Any>, String> {

    private val applicationContext: ApplicationContext = SpringApplication.run(FoxspotApplication::class.java)
    private val eventController: EventController = applicationContext.getBean(EventController::class.java)
    private val invoiceController: InvoiceController = applicationContext.getBean(InvoiceController::class.java)
    private val transactionController: TransactionController = applicationContext.getBean(TransactionController::class.java)

    override fun handleRequest(input: Map<String, Any>, context: Context): String {
        val action = input["action"] as? String ?: return "Missing 'action' field in the input."

        return when (action) {
            "getAllEvents" -> {
                val events = eventController.getAll()
                events.toString()
            }
            "searchEvents" -> {
                val query = input["query"] as? String ?: return "Missing 'query' field."
                val events = eventController.search(query)
                events.toString()
            }
            "createEvent" -> {
                val eventData = input["event"] as? Map<String, Any> ?: return "Missing 'event' data."
                val event = createEventFromInput(eventData)
                val response: ResponseEntity<*> = eventController.createEvent(event)
                response.body.toString()
            }
            "deleteEvent" -> {
                val id = input["id"] as? String ?: return "Missing 'id' field."
                eventController.deleteEvent(id)
                "Event with ID $id deleted."
            }
            "updateEvent" -> {
                val id = input["id"] as? String ?: return "Missing 'id' field."
                val updatedEventData = input["event"] as? Map<String, Any> ?: return "Missing 'event' data."
                val updatedEvent = createEventFromInput(updatedEventData)
                val response = eventController.updateEvent(id, updatedEvent)
                response.body.toString()
            }
            "getCurrentInvoiceTotal" -> {
                val total = invoiceController.getAll()
                "Current Invoice Total: $total"
            }
            "getAllTransactions" -> {
                val transactions = transactionController.getAll()
                transactions.toString()
            }
            else -> "Unknown action: $action"
        }
    }

    private fun createEventFromInput(eventData: Map<String, Any>): com.example.foxspot.model.classes.Event {
        val startTimeString = eventData["startTime"] as? String
        val endTimeString = eventData["endTime"] as? String

        // Retrieve latitude and longitude from input
        val latitude = eventData["latitude"] as? Double
                ?: throw IllegalArgumentException("Missing 'latitude' field in event data.")
        val longitude = eventData["longitude"] as? Double
                ?: throw IllegalArgumentException("Missing 'longitude' field in event data.")
        val location = Point(latitude, longitude)

        return com.example.foxspot.model.classes.Event(
                name = eventData["name"] as? String,
                address = eventData["address"] as? String,
                city = eventData["city"] as? String,
                eventType = eventData["eventType"] as? String,
                description = eventData["description"] as? String,
                image = eventData["image"] as? String,
                startTime = startTimeString?.let { Instant.parse(it) },
                endTime = endTimeString?.let { Instant.parse(it) },
                status = com.example.foxspot.model.enum.EventStatus.valueOf(eventData["status"] as? String ?: "SCHEDULED"),
                location = location
        )
    }
}
