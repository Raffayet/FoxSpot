package com.example.foxspot.model.enum

enum class Currency(val code: String, val symbol: String, val fullName: String) {
    RSD("RSD", "din", "Serbian Dinar"),
    USD("USD", "$", "United States Dollar"),
    EUR("EUR", "€", "Euro"),
    GBP("GBP", "£", "British Pound Sterling"),
    JPY("JPY", "¥", "Japanese Yen"),
    AUD("AUD", "A$", "Australian Dollar"),
    CAD("CAD", "C$", "Canadian Dollar"),
    CHF("CHF", "CHF", "Swiss Franc"),
    CNY("CNY", "¥", "Chinese Yuan"),
    SEK("SEK", "kr", "Swedish Krona"),
    NZD("NZD", "NZ$", "New Zealand Dollar"),
    INR("INR", "₹", "Indian Rupee"),
    RUB("RUB", "₽", "Russian Ruble"),
    ZAR("ZAR", "R", "South African Rand"),
    BRL("BRL", "R$", "Brazilian Real");

    override fun toString(): String {
        return "$fullName ($code)"
    }
}