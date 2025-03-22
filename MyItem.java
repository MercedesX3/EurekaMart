import java.util.List;
import java.util.LinkedList;

public class MyItem implements IDedObject {
    private int itemID;
    private int itemPrice;
    private List<Integer> itemDescription;

    // Constructors
    // Default Constructor
    public MyItem() {
        itemID = 0;
        itemPrice = 0;
        itemDescription = new LinkedList<>();
    }

    // Parameterized Constructor
    public MyItem(int id, int price, List<Integer> description) {
        itemID = id;
        itemPrice = price;
        itemDescription = new LinkedList<>();
        for (int i = 0; i < description.size(); i++) {
            itemDescription.add(description.get(i));
        }
    }

    // accessors
    public int getItemPrice() {
        return itemPrice;
    }

    public int getID() {
        return itemID;
    }

    public String printID() {
        String returnString = itemID + " " + itemPrice + " ";
        for (int i = 0; i < itemDescription.size(); i++) {
            returnString += itemDescription.get(i) + " ";
        }
        return returnString;
    }
}
