import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class Testcases extends User extends inventoryManager {

    // log out - User.logout(Boolean isLoggedIn)
    @Test
    void logout_TC1 //user logged in, successfully logged out
    {
        assertEquals(User.logout(true), "You have successfully logged out.");
    }

    @Test
    void logout_TC2 //user not logged in
    {
        assertEquals(User.logout(false), "Something went wrong.");

    }

    // add new item -  inventoryManager.addNewItem(str name, int quantity, str imagepath)
    @Test
    void addItem_TC1
    {
        assertEquals(inventoryManager.addNewItem("Bread", 1, "bread.jpg"), "Success. Item added to inventory.");
    }

    @Test
    void addItem_TC2
    {
        assertEquals(inventoryManager.addNewItem(null, 1, "bread.jpg"), "Error. Item name cannot be empty.");
    }

    @Test
    void addItem_TC3
    {
        assertEquals(inventoryManager.addNewItem("Bread", 0, "bread.jpg"), "Error. Item quantity must be greater than 0.");
    }

    @Test
    void addItem_TC4
    {
        assertEquals(inventoryManager.addNewItem("Bread", 1, ""), "Error. Image path cannot be empty.");
    }

    @Test
    void addItem_TC5
    {
        assertEquals(inventoryManager.addNewItem("Bread", -3, null), "Error. Item quantity must be greater than 0.");
    }

    @Test
    void addItem_TC6
    {
        assertEquals(inventoryManager.addNewItem("", 1, "bread.jpg"), "Error. Item name cannot be empty.");
    }

    @Test
    void addItem_TC7
    {
        assertEquals(inventoryManager.addNewItem(" ", 1, "bread.jpg"), "Error. Item name cannot be empty.");
    }

    @Test
    void addItem_TC8
    {
        assertEquals(inventoryManager.addNewItem("Bread", 1, null), "Error. Image path cannot be empty.");
    }

    // search recipe - User.searchRecipe(String itemName)
    @Test
    void searchRecipe_TC1_validItem 
    {
        assertEquals("Recipe found: Chicken Tortilla", User.searchRecipe("Chicken Tortilla"));
    }

    @Test
    void searchRecipe_TC2_nonExistingItem 
    {
        assertEquals("Item not found.", User.searchRecipe("Dragonfruit"));
    }

    @Test
    void searchRecipe_TC3_emptyInput 
    {
        assertEquals("Item name cannot be empty.", User.searchRecipe(""));
    }

    // login - User.login(Str usernameInput, Str passwordInput)
    @Test
    void login_TC1_validCredentials 
    {
        User user = new User("josh", "password123");
        assertEquals("Success: Redirected to home page\n", user.login("josh", "password123"));
    }

    @Test
    void login_TC2_invalidUsername 
    {
        User user = new User("josh", "password123");
        assertEquals("Invalid username or password\n", user.login("wronguser", "password123"));
    }

    @Test
    void login_TC3_invalidPassword 
    {
        User user = new User("josh", "password123");
        assertEquals("Invalid username or password\n", user.login("josh", "wrongpass"));
    }

    @Test
    void login_TC4_passwordWrongCapitalization 
    {
        User user = new User("josh", "password123");
        assertEquals("Fail: Invalid username or password\n", user.login("josh", "Password123"));
    }

    @Test
    void login_TC5_emptyPassword 
    {
        User user = new User("josh", "password123");
        assertEquals("Password cannot be empty\n", user.login("josh", ""));
    }

    @Test
    void login_TC6_emptyUsername 
    {
        User user = new User("josh", "password123");
        assertEquals("Username cannot be empty\n", user.login("", "password123"));
    }

    @Test
    void login_TC7_emptyUsernameAndPassword 
    {
        User user = new User("josh", "password123");
        assertEquals("Username and password cannot be empty\n", user.login("", ""));
    }

}
