package com.example.foxspot.model

import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.LastModifiedDate
import java.time.Instant

open class Base(
    @Id
    var id: String? = null,

    @CreatedDate
    var insertDate: Instant? = null,

    @LastModifiedDate
    var updateDate: Instant? = null,
)