package backend;

import java.util.ArrayList;
import java.util.List;

public class FilterSystem {

    List<Recipe> filtered = new ArrayList<>();


    List<String> validTags = new ArrayList<>();
    validTags.add("None");
    validTags.add("Halal");
    validTags.add("Gluten-Free");
    validTags.add("Vegan");
    validTags.add("Vegetarian");

    //arrlist that holds the dummy data
    List<Recipe> testRecipeList = new ArrayList<>();

    //Filter type: "None" -----------------
    //ingredientList for the chocolate cake 
    List<Item> chocCakeIngrList = new ArrayList<>(); //need arraylist of items for the r arraylist

    //creating items
    Item flour = new Item("Flour", 1.5);
    Item sugar = new Item("Sugar", 1);
    Item cocoaPowder = new Item("Cocoa Powder", 0.5);
    Item bakingSoda = new Item("Baking Soda", 1);
    Item salt = new Item("Salt", 0.5);
    Item eggs = new Item("Eggs", 2);
    Item milk = new Item("Milk", 1);
    Item butter = new Item("Butter", 0.5;)

    chocCakeIngrList.add (flour, sugar, cocoaPowder, bakingSoda, salt, eggs, milk, butter);

    //instructions as a single string
    String chocCakeRecipeInstr = "Preheat oven to 350°F (175°C). Mix flour, sugar, cocoa powder, baking soda, and salt in a bowl. Add eggs, milk, and melted butter. Mix until smooth. Pour batter into a greased cake pan. Bake for 30–35 minutes or until a toothpick comes out clean. Let cool, then enjoy!";
    
    //imageURL
    String chocCakeImgURL = "https://thescranline.com/wp-content/uploads/2022/08/CHOCOLATE-FUDGE-CAKE-24-WEB-07-1152x1536.jpg";
    
    //adding chocolate cake and its info to the dummy data arrlist
    testRecipeList.add("Chocolate Cake", chocCakeIngrList, chocCakeRecipeInstr, chocCakeImgURL, 60, "None");




    //Filter type: "Halal" -------------------------
    //recipe 1: halal - Cart Chicken                        //recipe 2: ?
    List<Item> cartChickenIngrList = new ArrayList<>();

    Item chickenBreast = new Item("Chicken Breast", 2.5);
    Item garlic = new Item("Garlic", 6);
    Item oliveOil = new Item("Olive Oil", 0.25);
    Item lemonJuice = new Item("Lemon Juice", 1);
    Item whiteVinegar = new Item("White Vinegar", 1);
    Item oregano = new Item("Oregano", 1);
    Item coriander = new Item("Coriander", 2);
    Item paprika = new Item("Paprika", 1);
    Item cumin = new Item("Cumin", 1);
    Item salt2 = new Item("Salt", 2);
    Item blackPepper = new Item("Black Pepper", 1);
    Item turmeric = new Item("Turmeric", 0.5);
    Item whiteSauce = new Item("White Sauce", 4);
    Item yellowRice = new Item("Yellow Rice", 4);
    Item tomatoes = new Item("Tomatoes", 2);
    Item lettuce = new Item("Lettuce", 2);

    cartChickenIngrlist.add(chickenBreast, garlic, oliveOil, lemonJuice, whiteVinegar, oregano, coriander, paprika, cumin, salt2, blackPepper, turmeric, whiteSauce, yellowRice, tomatoes, lettuce);

    String cartChickenInstr = "Mix chicken with garlic, olive oil, lemon juice, vinegar, and all spices. Marinate for 1–2 hours. Sear chicken in a hot pan until browned and cooked through (about 6–8 mins). Serve chicken over yellow rice with chopped lettuce, tomatoes, and white sauce on top.";

    String cartChickenImgURL = "https://www.fufuskitchen.com/wp-content/uploads/2022/05/halal-guys.webp";

    testRecipeList.add("Halal Cart Chicken", cartChickenIngrList, cartChickenInstr, cartChickenImgURL, 120, "Halal");



    //Filter type: "Gluten Free" ---------------------
    //recipe 1: gluten free cookies                     //recipe 2: ?
    List<Item> cookieIngrList = new ArrayList<>();

    Item glutenFreeFlour = new Item("Gluten-Free Flour", 1);
    Item brownSugar = new Item("Brown Sugar", 0.5);
    Item chocChips = new Item("Chocolate Chips", 0.3);
    Item almondFlour = new Item("Almond Flour", 0.5);
    Item vanillaExtract = new Item("Vanilla Extract", 1);
    Item sugar2 = new Item("Sugar", 0.25);
    Item egg = new Item("Egg", 1);
    Item milk2 = new Item("Milk", 2);
    Item salt3 = new Item ("Salt", 0.25);
    Item bakingSoda2 = new Item("Baking Soda", 0.5);
    
    cookieIngrList.add(glutenFreeFlour, brownSugar, chocChips, almondFlour, vanillaExtract, sugar2, egg, milk2, salt3, bakingSoda2);

    String cookieInstr = "Preheat oven to 350°F (175°C). In a bowl, mix flours, sugars, baking soda, and salt. Add egg, milk, and vanilla. Mix until smooth. Fold in chocolate chips. Scoop onto a lined baking sheet. Bake for 10–12 minutes or until edges are golden. Cool and enjoy!";

    String cookieImgURL = "https://mygluten-freekitchen.com/wp-content/uploads/2015/10/The-Best-Chewy-Gluten-free-Chocolate-Chip-Cookies.jpg.webp";

    testRecipeList.add("Cookies", cookieIngrList, cookieInstr, cookieImgURL, 55, "Gluten-Free");



    //Filter type: "Vegan" ---------------------
    //recipe 1: vegan spaghetti                         //recipe 2: ?
    List<Item> spaghettiIngrList = new ArrayList<>();

    Item shallots = new Item("Shallots", 2);
    Item garlic2 = new Item("Garlic", 3);
    Item spinach = new Item("Spinach", 3);
    Item linguine = new Item("Linguine", 8);
    //oliveOil

    spaghettiIngrList.add(shallots, garlic2, spinach, linguine, oliveOil);

    String spaghettiInstr = "Cook linguine in salted water (8–10 mins). In a pan, heat olive oil. Sauté shallots and garlic (2–3 mins). Add spinach, cook until wilted (2–3 mins). Drain pasta and mix with spinach. ";

    String spaghettiImgURL = "https://www.delishknowledge.com/wp-content/uploads/Easy-20-minute-Vegan-pasta-1097x1536.jpg";

    testRecipeList.add("Vegan Spaghetti", spaghettiIngrList, spaghettiInstr, spaghettiImgURL, 20, "Vegan");


    
    //Filter type: "Vegetarian" --------------------
    //recipe 1: vegetarian enchiladas                  //recipe 2: ?
    List<Item> enchiladasIngrList = new ArrayList<>();

    Item vegetableOil = new Item("Vegetable Oil", 2);
    Item onion = new Item("Onion", 0.5);
    Item garlic3 = new Item("Garlic", 2);
    Item chilePowder = new Item("Chile Powder", 2);
    //cumin
    Item cayennePepper = new Item("Cayenne Pepper", 0.75);
    Item tomatoPuree = new Item("Tomato Puree", 15);
    //spinach
    Item cheddar = new Item("Cheddar", 4);
    Item pepperJack = new Item("Pepper Jack", 4);
    Item sourCream = new Item("Sour Cream", 0.5);
    Item scallion = new Item("Scallion", 3);
    //salt
    Item tortilla = new Item("Tortilla", 12);
    Item limeJuice = new Item("Lime Juice", 0.5);

    enchiladasIngrList.add(vegetableOil, onion, garlic3, chilePowder, cumin, cayennePepper, tomatoPuree, spinach, 
    cheddar, pepperJack, sourCream, scallion, salt, tortilla, limeJuice);

    String enchiladasInstr = "Heat 1 tbsp vegetable oil in a pan. Sauté 1 chopped onion and 3 minced garlic cloves for 2–3 minutes. Add 1 tbsp chili powder, 1 tsp cumin, a pinch of cayenne, and ½ tsp salt. Cook 1 minute. Stir in 1 cup tomato puree and juice of ½ lime. Simmer for 5 minutes. In another pan, sauté 2 cups spinach until wilted.Mix spinach with ½ cup shredded cheddar and ½ cup shredded pepper jack.
        Fill 6–8 tortillas with the mixture. Roll and place in a baking dish. Pour sauce over enchiladas. Top with more cheese if desired. Bake at 375°F (190°C) for 15–20 minutes. Top with sliced scallions and sour cream before serving.";

    String enchiladasImgURL = "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/11/6/1/FNK_Vegetarian-Enchiladas_s4x3.jpg.rend.hgtvcom.826.620.suffix/1447277610191.webp";

    testRecipeList.add("Vegetarian Enchiladas", enchiladasIngrList, enchiladasInstr, enchiladasImgURL, 35, "Vegetarian");

    /*/
    public static main()
    {
        
    }*/
    

    public static List<Recipe> filterByTags(List<Recipe> recipes, List<String> requiredTags, List<String> validTags) {

        for (Recipe recipe : recipes) {
            if (recipe.getTags() != null && recipe.getTags().containsAll(requiredTags)) { //if tags are not null and the recipe has all required tags...
                filtered.add(recipe); //then add the recipe 
            }
            else if (recipe.getTags() == null) 
            {
                System.out.println("Please add tags to the recipe."); //TC recipe has no tags
            }
            else if (recipe.getTags().containsAll(requiredTags) == null) 
            {
                System.out.println("Please enter a recipe that contains all the required tags."); //TC no required tags
            }
            else if (recipe == null)
            {
                System.out.println("Please enter a recipe."); //TC recipe is null
            }
            else if (recipe == "")
            {
                System.out.println("Please enter a valid recipe."); //TC recipe is empty str
            }            
        }

        boolean validTagFound = false;
        for (int i = 0; i < recipes.size(); i++)
        {
            for (int j = 0; j < validTags.size(); j++)
            {
                if (recipes.at(i).getTags() == validTags)
                {
                    validTagFound = true;
                }

                if (j == validTags.size - 1 ** validTagFound == false)
                {
                    System.out.println("Please enter a valid recipe tag."); //TC a recipe does not have a valid tag
                }
            }
        }

        System.out.println("Your results have been updated."); //TC recipes valid, has req tags, and tag is valid
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
                else if (time > maxMinutes)
                {
                    System.out.println("Please enter a valid maximum cooking time."); //TC maxMinutes out of range
                }
                else if (maxMinutes <= 0)
                {
                    System.out.println("Please enter a valid maximum cooking time."); //TC is neg or 0
                }
                else if (maxMinutes >= 999)
                {
                    System.out.println("Please enter a valid maximum cooking time."); //TC is too high
                }

            } catch (NumberFormatException e) {
                // skip invalid time format
                System.out.println("Please enter a valid maximum cooking time."); 
            }
        }

        return filtered; 
    }
}
