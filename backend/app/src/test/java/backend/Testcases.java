package backend;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class Testcases {

    // log out - User.logout()
    @Test
    void logout_TC1() // user logged in, successfully logged out
    {
        User user = new User("josh", "password123");
        user.login("josh", "password123");
        assertEquals("You are logged in\n", user.logout());
    }

    @Test
    void logout_TC2() // user not logged in
    {
        User user = new User("josh", "password123");
        assertEquals("Something went wrong\n", user.logout());
    }

    // add new item - InventoryManager.addNewItem(Str name, int quantity, Str imagePath)
    @Test
    void addItem_TC1() // valid item added to inventory
    {
        Inventory inventory = new Inventory();
        InventoryManager manager = new InventoryManager(inventory);
        assertEquals("Success. Item added to inventory.", manager.addNewItem("Bread", 1, "bread.jpg"));
    }

    @Test
    void addItem_TC2() // null name, fail
    {
        Inventory inventory = new Inventory();
        InventoryManager manager = new InventoryManager(inventory);
        assertEquals("Error. Item name cannot be empty.", manager.addNewItem(null, 1, "bread.jpg"));
    }

    @Test
    void addItem_TC3() // quantity 0, fail
    {
        Inventory inventory = new Inventory();
        InventoryManager manager = new InventoryManager(inventory);
        assertEquals("Error. Item quantity must be greater than 0.", manager.addNewItem("Bread", 0, "bread.jpg"));
    }

    @Test
    void addItem_TC4() // image path empty, fail
    {
        Inventory inventory = new Inventory();
        InventoryManager manager = new InventoryManager(inventory);
        assertEquals("Error. Image path cannot be empty.", manager.addNewItem("Bread", 1, ""));
    }

    @Test
    void addItem_TC5() // quantity negative, fail
    {
        Inventory inventory = new Inventory();
        InventoryManager manager = new InventoryManager(inventory);
        assertEquals("Error. Item quantity must be greater than 0.", manager.addNewItem("Bread", -3, null));
    }

    @Test
    void addItem_TC6() 
    {
        Inventory inventory = new Inventory(); // name is empty string, fail
        InventoryManager manager = new InventoryManager(inventory);
        assertEquals("Error. Item name cannot be empty.", manager.addNewItem("", 1, "bread.jpg"));
    }

    @Test
    void addItem_TC7() // name is whitespace, fail
    {
        Inventory inventory = new Inventory();
        InventoryManager manager = new InventoryManager(inventory);
        assertEquals("Error. Item name cannot be empty.", manager.addNewItem(" ", 1, "bread.jpg"));
    }

    @Test
    void addItem_TC8() // image path is null, fail
    {
        Inventory inventory = new Inventory();
        InventoryManager manager = new InventoryManager(inventory);
        assertEquals("Error. Image path cannot be empty.", manager.addNewItem("Bread", 1, null));
    }





    // search recipe - User.searchRecipe(Str itemName)
    @Test
    void searchRecipe_TC1_validItem() // existing item, success
    {
        assertEquals("Recipe found: Chicken Tortilla", User.searchRecipe("Chicken Tortilla"));
    }

    @Test
    void searchRecipe_TC2_nonExistingItem() // non-existing item, fail
    {
        assertEquals("Item not found.", User.searchRecipe("Dragonfruit"));
    }

    @Test
    void searchRecipe_TC3_emptyInput() // empty input, fail
    {
        assertEquals("Item name cannot be empty.", User.searchRecipe(""));
    }





    // login - User.login(Str usernameInput, Str passwordInput)
    @Test
    void login_TC1_validCredentials() // valid login, success
    {
        User user = new User("josh", "password123");
        assertEquals("Success: Redirected to home page\n", user.login("josh", "password123"));
    }

    @Test
    void login_TC2_invalidUsername() // invalid username, fail
    {
        User user = new User("josh", "password123");
        assertEquals("Invalid username or password\n", user.login("wronguser", "password123"));
    }

    @Test
    void login_TC3_invalidPassword() // invalid password, fail
    {
        User user = new User("josh", "password123");
        assertEquals("Invalid username or password\n", user.login("josh", "wrongpass"));
    }

    @Test
    void login_TC4_passwordWrongCapitalization() // invalid password capialization, fail
    {
        User user = new User("josh", "password123");
        assertEquals("Fail: Invalid username or password\n", user.login("josh", "Password123"));
    }

    @Test
    void login_TC5_emptyPassword() // empty password, fail
    {
        User user = new User("josh", "password123");
        assertEquals("Password cannot be empty\n", user.login("josh", ""));
    }

    @Test
    void login_TC6_emptyUsername() // empty username, fail
    {
        User user = new User("josh", "password123");
        assertEquals("Username cannot be empty\n", user.login("", "password123"));
    }

    @Test
    void login_TC7_emptyUsernameAndPassword() // empty username and password, fail
    {
        User user = new User("josh", "password123");
        assertEquals("Username and password cannot be empty\n", user.login("", ""));
    }
}
