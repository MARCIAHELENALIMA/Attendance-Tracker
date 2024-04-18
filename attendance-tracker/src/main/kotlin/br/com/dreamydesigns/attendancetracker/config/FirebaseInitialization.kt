package br.com.dreamydesigns.attendancetracker.config

import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import org.springframework.stereotype.Component
import javax.annotation.PostConstruct
import java.io.FileInputStream

@Component
class FirebaseInitialization {

    @PostConstruct
    fun initialize() {
        try {
            val serviceAccount = FileInputStream("C:\\Users\\MÁRCIA\\Desktop\\ESTUDO\\attendance-tracker\\attendance-tracker\\src\\main\\kotlin\\br\\com\\dreamydesigns\\attendancetracker\\config\\attendance-tracker-dcab1-firebase-adminsdk-75g19-40eb3d0bbb.json")

            val options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build()

            FirebaseApp.initializeApp(options)

            // Adicionar log de registro
            println("FirebaseApp initialized successfully!")
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}
