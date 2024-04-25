package br.com.dreamydesigns.attendancetracker.config

import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.core.io.ClassPathResource

@SpringBootApplication
class AttendanceTrackerApplication {

    @Bean
    fun firebaseInitialization(): FirebaseApp {
        val resource = ClassPathResource("attendance-tracker.json")
        val serviceAccount = resource.inputStream
        val options = FirebaseOptions.Builder()
            .setCredentials(GoogleCredentials.fromStream(serviceAccount))
            .setDatabaseUrl("https://attendance-tracker-dcab1-default-rtdb.firebaseio.com")
            .build()

        val firebaseApp = FirebaseApp.initializeApp(options)
        println("FirebaseApp initialized successfully!")
        return firebaseApp
    }
}

fun main(args: Array<String>) {
    runApplication<AttendanceTrackerApplication>(*args)
}
