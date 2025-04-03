package backend;
public class Item {
    private String name;
    private int quantity;
    private String imagePath;

    public Item(String name, int quantity, String imagePath) {
        this.name = name;
        this.quantity = quantity;
        this.imagePath = imagePath;
    }

    public String getName() {
        return name;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getImagePath() {
        return imagePath;
    }
}
