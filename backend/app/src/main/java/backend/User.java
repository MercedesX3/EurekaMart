package backend;
import java.util.List;

public class User {
    private final String username;
    private final String password;
    private boolean isLoggedIn;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.isLoggedIn = false;
    }

    public String login(String usernameInput, String passwordInput) {
        if (usernameInput.isEmpty() && passwordInput.isEmpty()) {
            return "Username and password cannot be empty\n";
        }
        if (usernameInput.isEmpty()) {
            return "Username cannot be empty\n";
        }
        if (passwordInput.isEmpty()) {
            return "Password cannot be empty\n";
        }
        if (usernameInput.equalsIgnoreCase(username) && passwordInput.equals(password)) {
            isLoggedIn = true;
            return "Success: Redirected to home page\n";
        }
        if (usernameInput.equalsIgnoreCase(username) && passwordInput.equalsIgnoreCase(password)) {
            return "Fail: Invalid username or password\n";
        }
        return "Invalid username or password\n";
    }
    

    public String logout() {
        if (isLoggedIn) {
            return "You are logged in\n";
        }
        return "Something went wrong\n";
    }

    public static String searchRecipe(String itemName) {
    if (itemName == null || itemName.trim().isEmpty()) {
        return "Item name cannot be empty.";
    }

    List<String> availableRecipes = List.of(
        "Chicken Tortilla",
        "Chocolate Nutella",
        "Pasta"
    );

    for (String recipe : availableRecipes) {
        if (recipe.equalsIgnoreCase(itemName.trim())) {
            return "Recipe found: " + recipe;
        }
    }

    return "Item not found.";
}

}
