package com.example.foxspot.configuration
import com.mongodb.client.MongoClients
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.MongoDatabaseFactory
import org.springframework.data.mongodb.MongoTransactionManager
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory

@Configuration
class MongoConfig {

    @Bean
    fun mongoDatabaseFactory(): MongoDatabaseFactory {
        val mongoUri = System.getenv("MONGO_URI") ?: throw RuntimeException("MONGO_URI environment variable is not set")
        return SimpleMongoClientDatabaseFactory(MongoClients.create(mongoUri), "foxspot")
    }

    @Bean
    fun mongoTemplate(mongoDatabaseFactory: MongoDatabaseFactory): MongoTemplate {
        return MongoTemplate(mongoDatabaseFactory)
    }

    @Bean
    fun transactionManager(mongoDatabaseFactory: MongoDatabaseFactory): MongoTransactionManager {
        return MongoTransactionManager(mongoDatabaseFactory)
    }
}
