package com.example.foxspot.repository

import com.example.foxspot.model.classes.Transaction
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface TransactionRepository: MongoRepository<Transaction, String> {
}