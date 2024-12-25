package com.example.foxspot

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@SpringBootApplication
@EnableScheduling
class FoxspotApplication

fun main(args: Array<String>) {
	runApplication<FoxspotApplication>(*args)
}
