package backend;

public class Item {
    private String id;
    private String name;
    private double quantity;

    public Item() {
    }

    public Item(String name, double quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    // MongoDB ID getter/setter
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

    // Quantity
    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "Item{name='" + name + "', quantity=" + quantity + "}";
    }
}
