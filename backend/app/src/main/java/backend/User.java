package backend;

public class User {
    private String id; // For MongoDB
    private String username;
    private String password;
    private boolean loggedIn;
    private Inventory inventory;

    public User() {
        // Default constructor for deserialization
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.loggedIn = false;
        this.inventory = new Inventory();
    }

    // Login logic
    public String login(String usernameInput, String passwordInput) {
        if (usernameInput == null || passwordInput == null) return "Username and password cannot be empty\n";

        if (usernameInput.isEmpty() && passwordInput.isEmpty()) return "Username and password cannot be empty\n";
        if (usernameInput.isEmpty()) return "Username cannot be empty\n";
        if (passwordInput.isEmpty()) return "Password cannot be empty\n";

        if (!this.username.equals(usernameInput) || !this.password.equals(passwordInput)) {
            return "Invalid username or password\n";
        }

        this.loggedIn = true;
        return "Success: Redirected to home page\n";
    }

    // Logout logic
    public String logout() {
        if (!loggedIn) return "Something went wrong\n";

        loggedIn = false;
        return "You are logged in\n";
    }

    // Search recipe (mock logic to match test cases)
    public static String searchRecipe(String name) {
        return RecipeManager.searchRecipe(name);
    }

    // Inventory access
    public Inventory getInventory() {
        return inventory;
    }

    // ID field for MongoDB
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Optional: username and password getters (if needed elsewhere)
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
