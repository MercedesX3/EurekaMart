package backend;

import java.util.ArrayList;
import java.util.List;

public class RecipeManager {
    private static List<Recipe> recipes = new ArrayList<>();

    // Simulate database loading, FOR TEST CASES ONLY
    static {
        List<Item> ingredients = new ArrayList<>();
        ingredients.add(new Item("chicken", 1));
        ingredients.add(new Item("tortilla", 2));
        recipes.add(new Recipe("Chicken Tortilla", ingredients, "Cook chicken, wrap in tortilla.", "", 0, List.of("mexican")));
    }

    public static String searchRecipe(String name) {
        if (name == null || name.trim().isEmpty()) {
            return "Item name cannot be empty.";
        }

        for (Recipe recipe : recipes) {
            if (recipe.getName().equalsIgnoreCase(name.trim())) {
                return "Recipe found: " + recipe.getName();
            }
        }

        return "Item not found.";
    }

    public static List<Recipe> getAllRecipes() {
        return recipes;
    }

    public static void addRecipe(Recipe recipe) {
        recipes.add(recipe);
    }
}
