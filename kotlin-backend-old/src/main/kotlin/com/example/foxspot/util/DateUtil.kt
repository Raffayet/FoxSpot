package com.example.foxspot.util

import java.time.Instant
import java.time.ZoneId
import java.time.ZonedDateTime

class DateUtil {
    companion object{
        fun parseToBelgradeTime(isoDateString: String): ZonedDateTime {
            val instant = Instant.parse(isoDateString)

            // Convert the Instant to a ZonedDateTime in Belgrade time zone
            return instant.atZone(ZoneId.of("Europe/Belgrade"))
        }
    }
}