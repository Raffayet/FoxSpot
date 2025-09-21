package com.example.foxspot.seeder

import com.example.foxspot.model.classes.Pricing
import com.example.foxspot.repository.PricingRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class PricingSeeder(
    @Autowired val pricingRepository: PricingRepository
) : SeedCommon {

    override fun createSeedData() {
        val pricing = Pricing(
            totalPrice = 0.0,
            pricePerHour = 2.0,
        )

        pricingRepository.save(pricing)
    }

    override fun deleteSeedData() {
        pricingRepository.deleteAll()
    }
}