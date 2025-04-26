import { StyleSheet, Pressable, ScrollView, ImageBackground, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '@/constants/Colors';
import { Text, View } from '@/components/Themed';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Popup from '@/components/popup';
import { useNavigation } from '@react-navigation/native'; // to access profile page when in items section

import SearchBar from '@/components/searchbar';
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
import RecipeData from '@/assets/data/recipe.json';

const UNSPLASH_API_KEY = "-iFsG8Woa6NJCA3P4XiZh-y26dNs2Wg4Czh0cELoAKk";

export default function ItemsScreen() {
    const [items, setItems] = useState([]);
    const navigation = useNavigation();
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [searchButtonStatus, setSearchButtonStatus] = useState(false);
    const [searchedText, setSearchText] = useState("");

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

    const fetchUnsplashImage = async (query) => {
        try {
          const res = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
              query: query,
              per_page: 1, // Just get one image per item
            },
            headers: {
              Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
            },
          });
      
          const imageUrl = res.data.results[0]?.urls?.regular;
          console.log(imageUrl);
          return imageUrl;
        } catch (error) {
          console.error("Error fetching Unsplash image:", error);
          return null;
        }
    };

    const fetchItems = async () => { 
        const token = await AsyncStorage.getItem('token');
        try {
          const response = await axios.post("http://127.0.0.1:5001/get-item", {}, {
            headers: {
              Authorization: token,
            },
          });
          setItems(response.data.name);
          attachImagesToItems(response.data.name);
        } catch (error) {
          console.error("Error fetching name:", error.response?.data || error.message);
        }
    }

    const attachImagesToItems = async (items) => {
        const updatedItems = await Promise.all(
          items.map(async (item) => {
            console.log("BOBBY: ", item.itemName);
            const imageUrl = await fetchUnsplashImage(item.itemName);
            return {
              ...item,
              imageUrl,
            };
          })
        );
        setItems(updatedItems); // update your state
    };


    const getCategories = () => {
        return ['Chinese', 'Vegetarian', 'American', 'Italian', 'Mexican'];
    };
    
    const categories = getCategories();

    const searchItem = async (itemName) => {
      try {
          const response = await axios.post("", {itemName}, {
              headers: {"Content-Type": "application/json"},
          });
          setSearchedRecipes(response.data.results);
      } catch (error) {
          console.log(error, "There was an error with search Item");
      }
    }

    useEffect(() => {
      fetchItems();
    }, []);

    const clickedSearchButton = () => {
      setSearchButtonStatus(!searchButtonStatus);
      console.log("Searching for ", searchedText);
      searchItem(searchedText);
  }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
              
            <Pressable onPress={() => {navigation.navigate('profile')}} style={styles.profileCircle}/>
            <Text style={styles.profileNameText}>Your refrigerator</Text>
            <Text style={{color: 'rgba(88, 137, 129, 0.57)', fontSize: 20, fontFamily: "Inter_600SemiBold"}}>Let's see what you have!</Text>
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

            <ScrollView contentContainerStyle={styles.gridContainer}>
            {items.map((item, index) => {
                //const recipeImage = item.itemName;

                return (
                <Pressable key={index} style={styles.recipeCard}>
                    {item.imageUrl && (
                    <ImageBackground source={{ uri: item.imageUrl }} style={styles.recipeImageBackground}>
                        <View style={styles.recipeOverlay}>
                        <Text style={styles.recipeText}>{item.itemName}</Text>
                        <Text style={styles.recipeText}>{item.quantity}</Text>
                        </View>
                    </ImageBackground>
                    )}
                </Pressable>
                );
            })}
            </ScrollView>
          </ScrollView>
          <Popup style={{ position: "absolute", bottom: 60, alignSelf: 'flex-end', right: 20}} />
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
        marginTop: 10,
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
        marginTop: 20,
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
        marginBottom: 10,
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
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 20,
        marginRight: 30,
      },
      
      recipeCard: {
        width: '48%',
        height: 154,
        backgroundColor: Colors.light.orangeyellow,
        borderRadius: 20,
        marginBottom: 15,
        marginTop: 20,
        overflow: 'hidden',
      },
      
      recipeOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.38)',
        width: '100%',
        alignItems: 'center',
        height: 40,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        
      },
      
});