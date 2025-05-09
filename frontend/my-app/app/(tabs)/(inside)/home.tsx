import { Animated, StyleSheet, Pressable, ScrollView, ImageBackground } from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '@/constants/Colors';
import {useRef} from 'react';
import { useNavigation } from '@react-navigation/native';

import { Text, View } from '@/components/Themed';
import RecipeData from '@/assets/data/recipe.json';
import Popup from '@/components/popup';
import SearchBar from '@/components/searchbar';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
        Inter_300Light,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
        Inter_900Black,
      });

    const [name, setName] = useState("");
    const [items, setItems] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [breakfast, setBreakfast] = useState([]);
    const [mainCourse, setMainCourse] = useState([]);
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [searchButtonStatus, setSearchButtonStatus] = useState(false);
    const [searchedText, setSearchText] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);

    const fetchName = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
          const response = await axios.post("http://127.0.0.1:5001/get-name", {}, {
            headers: {
              Authorization: token,
            },
          });
          setName(response.data.name);
        } catch (error) {
          console.error("Error fetching name:", error.response?.data || error.message);
        }
    };

    const fetchItems = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
          const response = await axios.post("http://127.0.0.1:5001/get-item", {}, {
            headers: { Authorization: token },
          });
          setItems(response.data.name);
          return response.data.name; // return for chaining
        } catch (error) {
          console.error("Error fetching items:", error.response?.data || error.message);
          return [];
        }
      };

      const fetchRecipes = async (items) => {
        console.log("📦 Sending to backend /get-recipe:", items);  // ✅ ADD THIS LINE
      
        try {
          const response = await axios.post("http://127.0.0.1:5001/get-recipe", { items });
          setRecipes(response.data);
          console.log(response.data)
        } catch (error) {
          console.log(error);
        }
      };

      const fetchCategory = async (type) => {
        try {
            const response = await axios.post("http://127.0.0.1:5001/get-type", {type}, {
                headers: {"Content-Type": "application/json"},
            });
            if(type == "Breakfast")
            {
                setBreakfast(response.data.results);
                console.log(response.data, "BREAKFAST");
            }
            else {
                setMainCourse(response.data.results);
            }
        } catch (error) {
            console.log(error, "there was an error with fetch category");
        }
      }

      const searchItem = async (search) => {
        try {
            const response = await axios.post("http://127.0.0.1:5001/get-search", {search}, {
                headers: {"Content-Type": "application/json"},
            });
            console.log(search);
            console.log("BOBBY: ", response.data.results);
            setSearchedRecipes(response.data.results);
        } catch (error) {
            console.log(error, "There was an error with search Item");
        }
      }

      useEffect(() => {
        const fetchAll = async () => {
          await fetchName();
          const realItems = await fetchItems();
          console.log("Items being sent to get-recipe:", realItems);
          await fetchRecipes(realItems);
          console.log("STOP");
          await fetchCategory("Breakfast");
          console.log("STOP");
          await fetchCategory("main course");
        };
        fetchAll();
        console.log("REFRESH");
      }, [refreshKey]);

    const getCategories = () => {
        return ['Chinese', 'Vegetarian', 'American', 'Italian', 'Mexican'];
    };

    const categories = getCategories();

    const getRecipesForYou = () => {
        return ['Cheese Quesidilla', 'Sweet Mango Rice', "CheeseSteak"];
    }

    const recipesForYou = recipes;

    const clickedSearchButton = () => {
        setSearchButtonStatus(!searchButtonStatus);
        console.log("Searching for ", searchedText);
        searchItem(searchedText);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable onPress={() => {navigation.navigate('profile')}} style={styles.profileCircle}/>
            <Text style={styles.profileNameText}>Hello {name || '...'}</Text>
            <Text style={{color: 'rgba(88, 137, 129, 0.57)', fontSize: 20, fontFamily: "Inter_600SemiBold"}}>Let's start cooking</Text>
            <SearchBar searchText={searchedText} setSearchText={setSearchText} onSubmit={()=>clickedSearchButton()}/>

            {/* categories */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                {categories.map((category, index) => (
                    <Pressable key={index} style={[styles.categoryButton, {paddingHorizontal: 20,
                        paddingVertical: 10,}]}>
                        <Text style={styles.categoryText}>{category}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            { !searchButtonStatus && (
                <>

            <Text style={styles.recipesText}>Recipes for you</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {recipesForYou.map((recipe, index) => (
            <Pressable key={index} style={[styles.categoryButton, { width: 225, height: 134, overflow: 'hidden' }]}>
                {recipe.image && (
                    <ImageBackground source={{ uri: recipe.image }} style={styles.recipeImageBackground}>
                        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.38)', width: '100%', alignItems: 'center', height: 40, justifyContent: 'center', flexDirection: 'row' }}>
                            <Text style={styles.recipeText}>{recipe.title}</Text>
                        </View>
                    </ImageBackground>
                )}
            </Pressable>
            ))}

            </ScrollView>

            <Text style={styles.recipesText}>Breakfast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                {breakfast.map((recipe, index) => (
                <Pressable key={index} style={[styles.categoryButton, { width: 225, height: 134, overflow: 'hidden' }]}>
                    {recipe.image && (
                        <ImageBackground source={{ uri: recipe.image }} style={styles.recipeImageBackground}>
                            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.38)', width: '100%', alignItems: 'center', height: 40, justifyContent: 'center', flexDirection: 'row' }}>
                                <Text style={styles.recipeText}>{recipe.title}</Text>
                            </View>
                        </ImageBackground>
                    )}
                </Pressable>
                ))}
            </ScrollView>

            <Text style={styles.recipesText}>Main Course</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                {mainCourse.map((recipe, index) => (
                <Pressable key={index} style={[styles.categoryButton, { width: 225, height: 134, overflow: 'hidden' }]}>
                    {recipe.image && (
                        <ImageBackground source={{ uri: recipe.image }} style={styles.recipeImageBackground}>
                            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.38)', width: '100%', alignItems: 'center', height: 40, justifyContent: 'center', flexDirection: 'row' }}>
                                <Text style={styles.recipeText}>{recipe.title}</Text>
                            </View>
                        </ImageBackground>
                    )}
                </Pressable>
                ))}
            </ScrollView>
            </>
            )}

            {searchButtonStatus && (
                <>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                        {searchedRecipes.map((recipe, index) => (
                            <Pressable key={index} style={[styles.categoryButton, { width: 225, height: 134, overflow: 'hidden' }]}>
                                {recipe.image && (
                                    <ImageBackground source={{ uri: recipe.image }} style={styles.recipeImageBackground}>
                                        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.38)', width: '100%', alignItems: 'center', height: 40, justifyContent: 'center', flexDirection: 'row' }}>
                                            <Text style={styles.recipeText}>{recipe.title}</Text>
                                        </View>
                                    </ImageBackground>
                                )}
                            </Pressable>
                        ))}
                    </ScrollView>
                </>
            )}

            </ScrollView>
            <Popup style={{ position: "absolute", bottom: 60, alignSelf: 'flex-end', right: 20}}  onSave={() => setRefreshKey(prev => prev + 1)}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 30,
        marginTop: 10,
        marginBottom: -40,
    },
    profileCircle: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        alignSelf: 'flex-end',
        marginRight: 20,
    },
    profileNameText: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 30,
        color: Colors.light.sagegreen,
    },
    categoriesContainer: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    categoryButton: {
        backgroundColor: Colors.light.orangeyellow,
        borderRadius: 20,
        marginRight: 10,
    },
    categoryText: {
        fontFamily: "Inter_600SemiBold",
        color: 'white',
        fontSize: 16,
    },
    recipesText: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 24,
        marginBottom: 0,
    },
    recipeImageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        
    },
    recipeText: {
        color: 'white', // Set the text color
        fontFamily: "Inter_600SemiBold", // Choose font style
        fontSize: 18, // Text size
        textShadowColor: 'rgba(0, 0, 0, 0.5)', // Shadow effect for better visibility on images
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
});