package com.example.foxspot.repository

import com.example.foxspot.model.classes.Pricing
import org.springframework.data.mongodb.repository.MongoRepository

interface PricingRepository: MongoRepository<Pricing, String> {
}