package com.example.foxspot.repository

import com.example.foxspot.model.classes.Pricing
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

interface PricingRepository: MongoRepository<Pricing, String> {
    @Query("{}")
    fun findFirst(): Pricing?
}