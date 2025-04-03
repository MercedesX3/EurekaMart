package backend;
public class InventoryManager {
    private Inventory inventory;

    public InventoryManager(Inventory inventory) {
        this.inventory = inventory;
    }

    public boolean addNewItem(String name, int quantity, String imagePath) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Item name cannot be empty.");
        }
        if (quantity <= 0) {
            throw new IllegalArgumentException("Item quantity must be greater than 0.");
        }
        if (imagePath == null || imagePath.trim().isEmpty()) {
            throw new IllegalArgumentException("Image path cannot be empty.");
        }

        Item newItem = new Item(name, quantity, imagePath);
        inventory.addItem(newItem);
        return true;
    }
}
