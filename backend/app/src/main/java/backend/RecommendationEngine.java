package backend;

import java.util.ArrayList;
import java.util.List;

public class RecommendationEngine {

    public static List<Recipe> recommendRecipes(Inventory inventory, List<Recipe> allRecipes) {
        List<Recipe> recommended = new ArrayList<>();

        for (Recipe recipe : allRecipes) {
            boolean canMake = true;

            for (Item required : recipe.getIngredients()) {
                double available = inventory.getTotalQuantity(required.getName());
                if (available < required.getQuantity()) {
                    canMake = false;
                    break;
                }
            }

            if (canMake) {
                recommended.add(recipe);
            }
        }

        return recommended;
    }
}
