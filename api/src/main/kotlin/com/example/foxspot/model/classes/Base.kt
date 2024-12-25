package com.example.foxspot.model.classes

import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.LastModifiedDate

open class Base(
    @Id
    var id: String? = null,

    @CreatedDate
    val insertDate: Long = System.currentTimeMillis(),

    @LastModifiedDate
    val updateDate: Long = System.currentTimeMillis()
)