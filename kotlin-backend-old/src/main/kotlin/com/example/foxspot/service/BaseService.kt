package com.example.foxspot.service

interface BaseService<T> {
    fun getAll(): List<T>

    fun create(entity: T): T
}