package com.example.foxspot.controller

import com.example.foxspot.model.classes.Event
import com.example.foxspot.service.EventService
import com.example.foxspot.service.InvoiceService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/invoices")
class InvoiceController(
    @Autowired val invoiceService: InvoiceService
) {
    @GetMapping("/current")
    fun getAll(): Double? {
        return invoiceService.getCurrentInvoiceTotal()
    }
}