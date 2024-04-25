import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam

@Controller
class HomeController(private val authenticationService: AuthenticationService) {

    @GetMapping("/")
    fun home(): String {
        return "index"
    }

    @PostMapping("/login")
    fun login(@RequestParam email: String, @RequestParam password: String): String {
        // Como não estamos mais usando signInWithEmailAndPassword, você pode lidar com a autenticação de outra forma
        // Por exemplo, você pode redirecionar para outra rota para lidar com a autenticação via token JWT
        return "redirect:/verifyToken"
    }
}
