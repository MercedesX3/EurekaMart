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
        // username Valid && password Valid
        if (usernameInput.equalsIgnoreCase(username) && passwordInput.equals(password)) {
            isLoggedIn = true;
            return "Success: Redirected to home page\n";
        }
        // username Valid && password Invalid ( due to case sensitivity)
        else if (usernameInput.equalsIgnoreCase(username) && passwordInput.equalsIgnoreCase(password)) {
            return "Fail: Invalid username or password\n";
        } else if (passwordInput.isEmpty()) {
            return "Password cannot be empty\n";
        }
        // username Empty && password Valid
        else if (usernameInput.isEmpty()) {
            return "Username cannot be empty\n";
        }
        // username Empty && password Empty
        else if (usernameInput.isEmpty() && passwordInput.isEmpty()) {
            return "Username and password cannot be empty\n";
        }
        // username Invalid && password Valid
        // username Valid && password Invalid
        else {
            return "Invalid username or password\n";
        }
    }

    public String logout() {
        if (isLoggedIn) {
            return "You are logged in\n";
        }
        return "Something went wrong\n";
    }


}
