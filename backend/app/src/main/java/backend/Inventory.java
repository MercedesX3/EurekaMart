package backend;

import java.util.*;

public class Inventory {
    // Maps item name to a list of items (to allow duplicates)
    private Map<String, List<Item>> items;

    public Inventory() {
        this.items = new HashMap<>();
    }

    public void addItem(Item item) {
        String key = item.getName().toLowerCase();
        items.putIfAbsent(key, new ArrayList<>());
        items.get(key).add(item);
    }

    public List<Item> getItemsByName(String name) {
        return items.getOrDefault(name.toLowerCase(), new ArrayList<>());
    }

    public List<Item> getAllItems() {
        List<Item> all = new ArrayList<>();
        for (List<Item> group : items.values()) {
            all.addAll(group);
        }
        return all;
    }

    public boolean removeItem(String name) {
        return items.remove(name.toLowerCase()) != null;
    }

    @Override
    public String toString() {
        return "Inventory{" + "items=" + items + '}';
    }

    public boolean removeQuantity(String name, double amount) {
        String key = name.toLowerCase();
        List<Item> itemList = items.getOrDefault(key, new ArrayList<>());
    
        Iterator<Item> iterator = itemList.iterator();
        while (iterator.hasNext() && amount > 0) {
            Item item = iterator.next();
            double q = item.getQuantity();
    
            if (q <= amount) {
                amount -= q;
                iterator.remove(); // Remove whole item
            } else {
                item.setQuantity(q - amount);
                amount = 0;
            }
        }
    
        // If all items were removed, clean up empty entry
        if (itemList.isEmpty()) {
            items.remove(key);
        }
    
        return amount <= 0;  // true if enough quantity was available
    }
    
    public double getTotalQuantity(String name) {
        String key = name.toLowerCase();
        List<Item> itemList = items.getOrDefault(key, new ArrayList<>());
        return itemList.stream().mapToDouble(Item::getQuantity).sum();
    }
    
}
