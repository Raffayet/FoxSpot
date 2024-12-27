package com.example.foxspot.seeder

import jakarta.annotation.PostConstruct
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.stereotype.Component

@Component
class Seeder(
    @Autowired val eventSeeder: EventSeeder,
    @Autowired val pricingSeeder: PricingSeeder,
    private val mongoTemplate: MongoTemplate
) {

    @PostConstruct
    fun init() {
        deleteAllSeedData()
        createInitialData()
    }

    fun createInitialData() {
        eventSeeder.createSeedData()
        pricingSeeder.createSeedData()
    }

    // Every time we run the app we must first delete the data from the previous runtime
    fun deleteAllSeedData() {
        val collections = mongoTemplate.db.listCollectionNames()
        collections.forEach { collectionName ->
            mongoTemplate.db.getCollection(collectionName).drop()
        }
        println("All collections dropped successfully!")
    }
}