//package com.example.foxspot.model
//
//import org.springframework.data.annotation.Id
//import org.springframework.data.mongodb.core.mapping.Document
//
//@Document(collection = "events")
//class Event(
//    val name: String,
//    val location: Point
//): Base()
package com.example.foxspot.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "events")
class Event(
        val name: String,
        val address: String,
        val city: String,
        val eventType: String,
        val description: String,
        val image: String,
        val location: Point
) : Base()
