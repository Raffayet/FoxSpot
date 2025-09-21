package com.example.foxspot.controller

import com.example.foxspot.model.classes.Event
import com.example.foxspot.model.classes.Transaction
import com.example.foxspot.service.TransactionService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/transactions")
class TransactionController(
    @Autowired val transactionService: TransactionService
) {
    @GetMapping("/all")
    fun getAll(): List<Transaction> {
        return transactionService.getAll()
    }
}