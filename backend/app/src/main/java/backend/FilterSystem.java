package backend;

import java.util.ArrayList;
import java.util.List;

public class FilterSystem {

    public static List<Recipe> filterByTags(List<Recipe> recipes, List<String> requiredTags) {
        List<Recipe> filtered = new ArrayList<>();

        for (Recipe recipe : recipes) {
            if (recipe.getTags() != null && recipe.getTags().containsAll(requiredTags)) {
                filtered.add(recipe);
            }
        }

        return filtered;
    }

    public static List<Recipe> filterByMaxPrepTime(List<Recipe> recipes, int maxMinutes) {
        List<Recipe> filtered = new ArrayList<>();

        for (Recipe recipe : recipes) {
            try {
                int time = recipe.getPrepTime();
                if (time <= maxMinutes) {
                    filtered.add(recipe);
                }
            } catch (NumberFormatException e) {
                // skip invalid time format
            }
        }

        return filtered;
    }
}
