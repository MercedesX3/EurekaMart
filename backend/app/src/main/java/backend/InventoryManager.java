package backend;

public class InventoryManager {
    private Inventory inventory;

    public InventoryManager(Inventory inventory) {
        this.inventory = inventory;
    }

    public String addNewItem(String name, double quantity) {
        if (name == null || name.trim().isEmpty()) {
            return "Error. Item name cannot be empty.";
        }

        if (quantity <= 0) {
            return "Error. Item quantity must be greater than 0.";
        }

        Item item = new Item(name, quantity);
        inventory.addItem(item);
        return "Success. Item added to inventory.";
    }
}
