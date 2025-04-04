package backend;

import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;

public class Item{
    public String itemName;
    public final int itemID;
    public String itemType;    // fruit, vegetable, appliance, etc.
    public String itemDesc; // Item description
    public ArrayList<String> tags; // Item tags (Kosher, Halal, etc.)

    public Item(String itemName, int itemID, String itemType, String itemDesc, ArrayList<String>tags){
        this.itemName = itemName;
        this.itemID = itemID;
        this.itemType = itemType;
        this.itemDesc = itemDesc;
        this.tags = tags;
    }

    public Item(String itemName, int quantity, String imagePath) {
        this.itemName = itemName;
        this.itemID = 0; // Default/filler ID
        this.itemType = ""; // Default/filler
        this.itemDesc = imagePath; // Assign imagePath to description for now
        this.tags = new ArrayList<>();
    }    

    public String GetItemType(){
        return itemType;
    }
    
    public String GetDescription(){
        return itemDesc;
    }

    public ArrayList<String> GetTags(){
        return tags;
    }

    public void SetItemName(String itemName){
        this.itemName = itemName;
    }
    public void SetItemType(String itemType){
        this.itemType = itemType;
    }
    public void SetItemDescription(String itemDesc){
        this.itemDesc = itemDesc;
    }
    public void SetTags(ArrayList<String> itemTags){
        this.tags = itemTags;
    }

    public class inventory{
        private Map<Integer, String> items;

        public inventory() {
            items = new HashMap<>();
            items.put(1, "Item 1");
            items.put(2, "Item 2");
        }
    }

}
