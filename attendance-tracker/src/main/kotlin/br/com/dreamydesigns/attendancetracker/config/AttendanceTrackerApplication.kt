// Arquivo AttendanceTrackerApplication.kt para o pacote br.com.dreamydesigns.attendancetracker
package br.com.dreamydesigns.attendancetracker.config

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class AttendanceTrackerApplication

fun main(args: Array<String>) {
    runApplication<AttendanceTrackerApplication>(*args)
}
