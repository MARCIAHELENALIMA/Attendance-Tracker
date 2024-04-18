package br.com.dreamydesigns.attendancetracker.service

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseAuthException
import com.google.firebase.auth.UserRecord

class FirebaseAuthentication(private val firebaseAuthProvider: FirebaseAuthProvider) {
    private val firebaseAuth: FirebaseAuth = firebaseAuthProvider.getFirebaseAuth()

    fun createUser(email: String, password: String): String? {
        return try {
            val request = UserRecord.CreateRequest()
                .setEmail(email)
                .setPassword(password)

            val userRecord = firebaseAuth.createUser(request)
            userRecord.uid
        } catch (e: FirebaseAuthException) {
            null
        }
    }

    fun generateCustomToken(uid: String): String? {
        return try {
            val customToken = firebaseAuth.createCustomToken(uid)
            customToken
        } catch (e: FirebaseAuthException) {
            null
        }
    }
}

class FirebaseAuthProvider {
    fun getFirebaseAuth(): FirebaseAuth {
        return FirebaseAuth.getInstance()
    }
}