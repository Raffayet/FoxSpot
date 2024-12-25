package com.example.foxspot.seeder

import jakarta.annotation.PostConstruct
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class Seeder(
    @Autowired val eventSeeder: EventSeeder,
    @Autowired val pricingSeeder: PricingSeeder
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
        eventSeeder.deleteSeedData()
        pricingSeeder.deleteSeedData()
    }
}