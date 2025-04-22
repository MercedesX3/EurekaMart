package backend;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

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
        assertEquals("Success. Item added to inventory.", manager.addNewItem("Bread", 1));
    }

    @Test
    void addItem_TC2() // null name, fail
    {
        Inventory inventory = new Inventory();
        InventoryManager manager = new InventoryManager(inventory);
        assertEquals("Error. Item name cannot be empty.", manager.addNewItem(null, 1));
    }

    @Test
    void addItem_TC3() // quantity 0, fail
    {
        Inventory inventory = new Inventory();
        InventoryManager manager = new InventoryManager(inventory);
        assertEquals("Error. Item quantity must be greater than 0.", manager.addNewItem("Bread", 0));
    }


    @Test
    void addItem_TC5() // quantity negative, fail
    {
        Inventory inventory = new Inventory();
        InventoryManager manager = new InventoryManager(inventory);
        assertEquals("Error. Item quantity must be greater than 0.", manager.addNewItem("Bread", -3));
    }

    @Test
    void addItem_TC6() 
    {
        Inventory inventory = new Inventory(); // name is empty string, fail
        InventoryManager manager = new InventoryManager(inventory);
        assertEquals("Error. Item name cannot be empty.", manager.addNewItem("", 1));
    }

    @Test
    void addItem_TC7() // name is whitespace, fail
    {
        Inventory inventory = new Inventory();
        InventoryManager manager = new InventoryManager(inventory);
        assertEquals("Error. Item name cannot be empty.", manager.addNewItem(" ", 1));
    }



 // search recipe - RecipeManager.searchRecipe(Str itemName)
@Test
void searchRecipe_TC1_validItem() {
    assertEquals("Recipe found: Chicken Tortilla", RecipeManager.searchRecipe("Chicken Tortilla"));
}

@Test
void searchRecipe_TC2_nonExistingItem() {
    assertEquals("Item not found.", RecipeManager.searchRecipe("Dragonfruit"));
}

@Test
void searchRecipe_TC3_emptyInput() {
    assertEquals("Item name cannot be empty.", RecipeManager.searchRecipe(""));
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
        assertEquals("Invalid username or password\n", user.login("josh", "Password123"));
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



    //Recommendation system
        @Test
    void testRecommendationEngine() {
        Inventory inventory = new Inventory();
        inventory.addItem(new Item("milk", 2));
        inventory.addItem(new Item("eggs", 4));

        List<Item> ingredients1 = List.of(new Item("milk", 2), new Item("eggs", 2));
        List<Item> ingredients2 = List.of(new Item("milk", 3));
        List<Recipe> allRecipes = new ArrayList<>();
        allRecipes.add(new Recipe("Omelette", ingredients1, "", "", 0, List.of()));
        allRecipes.add(new Recipe("Milkshake", ingredients2, "", "", 0, List.of()));

        List<Recipe> recommended = RecommendationEngine.recommendRecipes(inventory, allRecipes);
        assertEquals(1, recommended.size());
        assertEquals("Omelette", recommended.get(0).getName());
    }


    //filter system
    @Test
    void testFilterByTags() {
        List<Recipe> recipes = new ArrayList<>();

        recipes.add(new Recipe("A", List.of(), "", "", 0, List.of("vegetarian", "breakfast")));
        recipes.add(new Recipe("B", List.of(), "", "", 0,  List.of("dinner")));
        recipes.add(new Recipe("C", List.of(), "", "", 0, List.of("vegetarian")));

        List<Recipe> filtered = FilterSystem.filterByTags(recipes, List.of("vegetarian"));
        assertEquals(2, filtered.size());

        filtered = FilterSystem.filterByTags(recipes, List.of("vegetarian", "breakfast"));
        assertEquals(1, filtered.size());
    }

    @Test
    void testFilterByMaxPrepTime() {
        List<Recipe> recipes = new ArrayList<>();
        recipes.add(new Recipe("Fast", List.of(), "", "", 10, List.of()));
        recipes.add(new Recipe("Medium", List.of(), "", "", 30, List.of()));
        recipes.add(new Recipe("Slow", List.of(), "", "", 60, List.of()));

        List<Recipe> filtered = FilterSystem.filterByMaxPrepTime(recipes, 20);
        assertEquals(1, filtered.size());
        assertEquals("Fast", filtered.get(0).getName());
    }
}
