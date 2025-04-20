import { Animated, StyleSheet, Pressable, ScrollView, ImageBackground } from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '@/constants/Colors';
import {useRef} from 'react';

import { Text, View } from '@/components/Themed';
import RecipeData from '@/assets/data/recipe.json';
import Popup from '@/components/popup';

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

    useEffect(() => {
        fetchName();
    }, []);

    const getCategories = () => {
        return ['Chinese', 'Vegetarian', 'American', 'Italian', 'Mexican'];
    };

    const categories = getCategories();

    const getRecipesForYou = () => {
        return ['Cheese Quesidilla', 'Sweet Mango Rice', "CheeseSteak"];
    }

    const recipesForYou = getRecipesForYou();

    const getRecipeData = (input: any) => {
        const recipe = RecipeData.find((recipe: { id: any; }) => recipe.id === input);
        return recipe ? recipe.photoURL : null;
    };

    const getRecipeTime = (input: any) => {
        const recipe = RecipeData.find((recipe: { id: any; }) => recipe.id === input);
        return recipe ? recipe.time : null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.profileCircle}/>
            <Text style={styles.profileNameText}>Hello {name || '...'}</Text>
            <Text style={{color: 'rgba(88, 137, 129, 0.57)', fontSize: 20, fontFamily: "Inter_600SemiBold"}}>Let's start cooking</Text>

            {/* categories */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                {categories.map((category, index) => (
                    <Pressable key={index} style={[styles.categoryButton, {paddingHorizontal: 20,
                        paddingVertical: 10,}]}>
                        <Text style={styles.categoryText}>{category}</Text>
                    </Pressable>
                ))}
            </ScrollView>

            <Text style={styles.recipesText}>Recipes for you</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                {recipesForYou.map((recipeName, index) => {
                    const recipeImage = getRecipeData(recipeName);
                    const recipeTime = getRecipeTime(recipeName);
                    return (
                        <Pressable key={index} style={[styles.categoryButton, {width: 225,
                            height: 134, overflow: 'hidden',}]}>
                            {/* Add ImageBackground and Text inside it */}
                            {recipeImage && (
                                <ImageBackground source={{ uri: recipeImage }} style={styles.recipeImageBackground}>
                                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.38)', width: '100%', alignItems: 'center', height: 40, justifyContent: 'center', flexDirection: 'row'}}>
                                        <Text style={styles.recipeText}>{recipeName}</Text>
                                        <Text style={styles.recipeText}>{recipeTime}</Text>
                                    </View>
                                </ImageBackground>
                            )}
                        </Pressable>
                    );
                })}
            </ScrollView>

            <Text>Popular recipes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                {recipesForYou.map((recipeName, index) => {
                    const recipeImage = getRecipeData(recipeName);
                    const recipeTime = getRecipeTime(recipeName);
                    return (
                        <Pressable key={index} style={[styles.categoryButton, {width: 225,
                            height: 134, overflow: 'hidden',}]}>
                            {/* Add ImageBackground and Text inside it */}
                            {recipeImage && (
                                <ImageBackground source={{ uri: recipeImage }} style={styles.recipeImageBackground}>
                                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.38)', width: '100%', alignItems: 'center', height: 40, justifyContent: 'center', flexDirection: 'row'}}>
                                        <Text style={styles.recipeText}>{recipeName}</Text>
                                        <Text style={styles.recipeText}>{recipeTime}</Text>
                                    </View>
                                </ImageBackground>
                            )}
                        </Pressable>
                    );
                })}
            </ScrollView>

            <Text>Breakfast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                {recipesForYou.map((recipeName, index) => {
                    const recipeImage = getRecipeData(recipeName);
                    const recipeTime = getRecipeTime(recipeName);
                    return (
                        <Pressable key={index} style={[styles.categoryButton, {width: 225,
                            height: 134, overflow: 'hidden',}]}>
                            {/* Add ImageBackground and Text inside it */}
                            {recipeImage && (
                                <ImageBackground source={{ uri: recipeImage }} style={styles.recipeImageBackground}>
                                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.38)', width: '100%', alignItems: 'center', height: 40, justifyContent: 'center', flexDirection: 'row'}}>
                                        <Text style={styles.recipeText}>{recipeName}</Text>
                                        <Text style={styles.recipeText}>{recipeTime}</Text>
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
});
