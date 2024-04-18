package br.com.dreamydesigns.attendancetracker.service

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.mockito.Mockito.`when`
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.UserRecord
import org.junit.jupiter.api.extension.ExtendWith
import org.mockito.junit.jupiter.MockitoExtension

@ExtendWith(MockitoExtension::class)
class FirebaseAuthenticationTest {

    private lateinit var firebaseAuth: FirebaseAuth
    private lateinit var firebaseAuthProvider: FirebaseAuthProvider
    private lateinit var firebaseAuthentication: FirebaseAuthentication

    @BeforeEach
    fun setUp() {
        firebaseAuth = Mockito.mock(FirebaseAuth::class.java)
        firebaseAuthProvider = Mockito.mock(FirebaseAuthProvider::class.java)
        `when`(firebaseAuthProvider.getFirebaseAuth()).thenReturn(firebaseAuth)
        firebaseAuthentication = FirebaseAuthentication(firebaseAuthProvider)
    }

    @Test
    fun testCreateUser() {
        val email = "test@example.com"
        val password = "password"
        val uid = "123456"

        val userRecord = Mockito.mock(UserRecord::class.java)
        `when`(userRecord.uid).thenReturn(uid)

        `when`(firebaseAuth.createUser(Mockito.any(UserRecord.CreateRequest::class.java))).thenReturn(userRecord)

        val result = firebaseAuthentication.createUser(email, password)
        assertEquals(uid, result)
    }

    @Test
    fun testGenerateCustomToken() {
        val uid = "123456"
        val token = "customToken"

        `when`(firebaseAuth.createCustomToken(uid)).thenReturn(token)

        val result = firebaseAuthentication.generateCustomToken(uid)
        assertEquals(token, result)
    }
}
