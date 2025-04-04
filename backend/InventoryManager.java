package backend;
public class InventoryManager {
    private Inventory inventory;

    public InventoryManager(Inventory inventory) {
        this.inventory = inventory;
    }

    public String addNewItem(String name, int quantity, String imagePath) {
        if (name == null || name.trim().isEmpty()) {
            return "Error. Item name cannot be empty.";
        }
        if (quantity <= 0) {
            return "Error. Item quantity must be greater than 0.";
        }
        if (imagePath == null || imagePath.trim().isEmpty()) {
            return "Error. Image path cannot be empty.";
        }
    
        Item newItem = new Item(name, quantity, imagePath);
        inventory.addItem(newItem);
        return "Success. Item added to inventory.";
    }

    
}
