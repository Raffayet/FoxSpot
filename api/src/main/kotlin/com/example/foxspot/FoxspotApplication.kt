package com.example.foxspot

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableScheduling
@EnableMongoRepositories(basePackages = ["com.example.foxspot.repository"])
class FoxspotApplication

fun main(args: Array<String>) {
	runApplication<FoxspotApplication>(*args)
}
