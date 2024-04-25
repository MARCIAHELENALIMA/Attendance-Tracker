import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseToken
import org.springframework.stereotype.Service

@Service
class AuthenticationService {

    fun verifyIdToken(idToken: String): String {
        return try {
            val decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken)
            // Aqui você pode acessar as informações do usuário, como UID, e fazer lógica adicional
            "Token verificado com sucesso! UID: ${decodedToken.uid}"
        } catch (e: Exception) {
            "Erro ao verificar token: ${e.message}"
        }
    }
}
