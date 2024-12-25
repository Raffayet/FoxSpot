package com.example.foxspot

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class FoxspotApplication

fun main(args: Array<String>) {
	runApplication<FoxspotApplication>(*args)
}
