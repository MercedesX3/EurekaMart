package backend;

import java.util.List;

public class Recipe {
    private String id;                     // For MongoDB (_id)
    private String name;                   // Recipe name
    private List<Item> ingredients;        // List of required items with quantities
    private String instructions;           // Step-by-step as a single string
    private String imageUrl;               // Optional display image
    private List<String> tags;             // For filters (e.g., "vegetarian", "dinner")
    private int prepTime;                  // Preparation time in minutes

    public Recipe() {
        // Default constructor for deserialization / MongoDB
    }

    public Recipe(String name, List<Item> ingredients, String instructions, String imageUrl, int prepTime, List<String> tags) {
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.imageUrl = imageUrl;
        this.tags = tags;
        this.prepTime = prepTime;
    }

    // ID
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Ingredients
    public List<Item> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Item> ingredients) {
        this.ingredients = ingredients;
    }

    // Instructions
    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    // Image URL
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    // Preparation time
    public int getPrepTime() {
        return prepTime;
    }
    
    public void setPrepTime(int prepTime) {
        this.prepTime = prepTime;
    }

    // Tags
    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "name='" + name + '\'' +
                ", ingredients=" + ingredients +
                ", tags=" + tags +
                '}';
    }
}
