import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class UserTest {
    public void testLogin() {
        User user = new User("username", "password");
        assertEquals("Success: Redirected to home page", user.login("username", "password"));
    }
}
