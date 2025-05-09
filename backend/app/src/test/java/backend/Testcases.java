package backend;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.InputMismatchException;
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



    // Recommendation system
        @Test
    void testRecommendationEngine_TC1_validRecommendation() {
        Inventory inventory = new Inventory();
        inventory.addItem(new Item("spaghetti", 2));
        inventory.addItem(new Item("tomato", 3));

        List<Item> ingredients1 = List.of(new Item("spaghetti", 2), new Item("tomato", 2));;
        List<Recipe> allRecipes = new ArrayList<>();
        allRecipes.add(new Recipe("Spaghetti with Tomato Sauce", ingredients1, "", "", 0, List.of()));

        List<Recipe> recommended = RecommendationEngine.recommendRecipes(inventory, allRecipes);
        assertEquals(1, recommended.size());
        assertEquals("Spaghetti with Tomato Sauce", recommended.get(0).getName()); // Spaghetti recipe, inventory has enough ingredients
    }

        @Test
    void testRecommendationEngine_TC2_noMatchingRecipe() {
        Inventory inventory = new Inventory();
        inventory.addItem(new Item("spaghetti", 1));
        inventory.addItem(new Item("tomato", 1));
    
        List<Item> ingredients1 = List.of(new Item("spaghetti", 2), new Item("tomato", 2));
        List<Item> ingredients2 = List.of(new Item("white rice", 1));
        List<Recipe> allRecipes = new ArrayList<>();
        allRecipes.add(new Recipe("Spaghetti with Tomato Sauce", ingredients1, "", "", 0, List.of()));
        allRecipes.add(new Recipe("White Rice", ingredients2, "", "", 0, List.of()));
    
        List<Recipe> recommended = RecommendationEngine.recommendRecipes(inventory, allRecipes);
        assertEquals(0, recommended.size());
        // Not enough ingredients, no recipes found
    }

        @Test
    void testRecommendationEngine_TC3_emptyInventory() {
        Inventory inventory = new Inventory();

        List<Item> ingredients1 = List.of(new Item("spaghetti", 2), new Item("tomato", 2));
        List<Item> ingredients2 = List.of(new Item("chicken", 1), new Item("tomato", 1));
        List<Recipe> allRecipes = new ArrayList<>();
        allRecipes.add(new Recipe("Spaghetti with Tomato Sauce", ingredients1, "", "", 0, List.of()));
        allRecipes.add(new Recipe("Chicken Soup", ingredients2, "", "", 0, List.of()));

        List<Recipe> recommended = RecommendationEngine.recommendRecipes(inventory, allRecipes);
        assertEquals(0, recommended.size());
        // No ingredients in inventory, no recipes found
    }

        @Test
    void testRecommendationEngine_TC4_nullIngredientException() {
        Inventory inventory = null;
        List<Item> ingredients1 = List.of(new Item("spaghetti", 2), new Item("tomato", 2));
        List<Item> ingredients2 = List.of(new Item("spaghetti", 3), new Item("tomato", 1));
        List<Recipe> allRecipes = new ArrayList<>();
        allRecipes.add(new Recipe("Spaghetti with Tomato Sauce", ingredients1, "", "", 0, List.of()));
        allRecipes.add(new Recipe("Tomato Soup", ingredients2, "", "", 0, List.of()));

        try {
            List<Recipe> recommended = RecommendationEngine.recommendRecipes(inventory, allRecipes);
            fail("An exception should be thrown because the inventory is null.");
        } catch (NullPointerException e) {
            assertEquals("Inventory has not been created", e.getMessage());
            // Exception handled, test passes
        }
    }

    //filter system
    @Test   // Filter recipes without the desired tags
    void testFilterByTags_TC1() {
        List<Recipe> recipes = new ArrayList<>();

        recipes.add(new Recipe("A", List.of(), "", "", 10, List.of("Vegetarian", "Breakfast")));
        recipes.add(new Recipe("B", List.of(), "", "", 30,  List.of("Dinner")));
        recipes.add(new Recipe("C", List.of(), "", "", 60, List.of("Vegetarian")));

        List<Recipe> filtered = FilterSystem.filterByTags(recipes, List.of("Vegetarian"));
        assertEquals(2, filtered.size());

        filtered = FilterSystem.filterByTags(recipes, List.of("Vegetarian", "Breakfast"));
        assertEquals(1, filtered.size());
    }
    @Test   // Filter by Max Prep Time
    void testFilterByMaxPrepTime_TC2() {
        List<Recipe> recipes = new ArrayList<>();
        recipes.add(new Recipe("Recipe A", List.of(), "", "", 10, List.of("Vegetarian", "Breakfast")));
        recipes.add(new Recipe("Recipe B", List.of(), "", "", 30,  List.of("Dinner")));
        recipes.add(new Recipe("Recipe C", List.of(), "", "", 60, List.of("Vegetarian")));

        List<Recipe> filtered = FilterSystem.filterByMaxPrepTime(recipes, 20);
        assertEquals(1, filtered.size());
        assertEquals("Recipe A", filtered.get(0).getName());
    }
    

    @Test
    void testFilterByTags_TC3(){
        List<Recipe> recipes = new ArrayList<>();
        
        List<Recipe> filtered = FilterSystem.filterByTags(recipes, List.of("Vegetarian"));
            
        
        assertEquals(0, filtered.size());
        // Recipe list is empty. reject this input
    }
    @Test
    void testFilterByTags_TC4(){
        List<Recipe> recipes = new ArrayList<>();
        List<String> tags = null;
        recipes.add(new Recipe("Recipe A", List.of(), "", "", 10, tags));
        recipes.add(new Recipe("Recipe B", List.of(), "", "", 30,  List.of("Dinner")));
        recipes.add(new Recipe("Recipe C", List.of(), "", "", 60, List.of("Vegetarian")));

        try {
            List<Recipe> filtered = FilterSystem.filterByTags(recipes, List.of("Vegetarian"));
            fail("An exception should be thrown because the tags in Recipe A are null.");
        } catch (NullPointerException e) {
            assertEquals("Please input a valid list of recipes.", e.getMessage());
            // Exception handled, test passes
        }
    }

    @Test
    void testFilterByTags_TC5(){
        List<Recipe> recipes = new ArrayList<>();

        recipes.add(new Recipe("A", List.of(), "", "", 10, List.of("Vegetarian", "Breakfast")));
        recipes.add(new Recipe("B", List.of(), "", "", 30,  List.of("Dinner")));
        recipes.add(new Recipe("C", List.of(), "", "", 60, List.of("Vegetarian")));

        List<Recipe> filtered = FilterSystem.filterByTags(recipes, List.of("Yellow"));
        assertEquals(0, filtered.size());
    }

    @Test
    void testFilterByTags_TC6(){
        List<Recipe> recipes = new ArrayList<>();
        recipes.add(new Recipe("Recipe A", List.of(), "", "", 10, List.of("Vegetarian", "Breakfast")));
        recipes.add(new Recipe("Recipe B", List.of(), "", "", 30,  List.of("Dinner")));
        recipes.add(new Recipe("Recipe C", List.of(), "", "", 60, List.of("Vegetarian")));

        try {
            List<Recipe> filtered = FilterSystem.filterByTags(recipes, List.of(70));
            fail("An exception should be thrown because the desired tag is not a string.");
        } catch (InputMismatchException e) {
            assertEquals("Please input a valid list of filter tags.", e.getMessage());
            // Exception handled, test passes
        }
    }

    @Test   // Filter by max prep time, but the integer is negative
    void testFilterByMaxPrepTime_TC7() {
        List<Recipe> recipes = new ArrayList<>();
        recipes.add(new Recipe("Recipe A", List.of(), "", "", 10, List.of("Vegetarian", "Breakfast")));
        recipes.add(new Recipe("Recipe B", List.of(), "", "", 30,  List.of("Dinner")));
        recipes.add(new Recipe("Recipe C", List.of(), "", "", 60, List.of("Vegetarian")));

        List<Recipe> filtered = FilterSystem.filterByMaxPrepTime(recipes, -20);
        assertEquals(0, filtered.size());
        //assertEquals("Recipe A", filtered.get(0).getName());
    }

    @Test   // Filter by Max Prep Time, but the max prep time is not an integer
    void testFilterByMaxPrepTime_TC8() {
        List<Recipe> recipes = new ArrayList<>();
        recipes.add(new Recipe("Recipe A", List.of(), "", "", 10, List.of("Vegetarian", "Breakfast")));
        recipes.add(new Recipe("Recipe B", List.of(), "", "", 30,  List.of("Dinner")));
        recipes.add(new Recipe("Recipe C", List.of(), "", "", 60, List.of("Vegetarian")));

        try {
            List<Recipe> filtered = FilterSystem.filterByMaxPrepTime(recipes, "Twenty minutes");
            fail("An exception should be thrown because the desired prep time is not an integer.");
        } catch (InputMismatchException e) {
            assertEquals("Please input a valid maximum prep time.", e.getMessage());
            // Exception handled, test passes
        }
    }
}
