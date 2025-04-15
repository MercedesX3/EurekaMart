import { StyleSheet, Pressable, ScrollView, ImageBackground} from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import { Text, View } from '@/components/Themed';

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

export default function ItemsScreen() {
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

      const getRecipesForYou = () => {
        return ['Cheese Quesidilla', 'Sweet Mango Rice', "CheeseSteak", "Pizza", "Soda"];
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
        <View style={styles.container}>
            <Text style={{marginVertical: 50}}>Item Screen</Text>
            <ScrollView contentContainerStyle={styles.gridContainer}>
            {recipesForYou.map((recipeName, index) => {
                const recipeImage = getRecipeData(recipeName);
                const recipeTime = getRecipeTime(recipeName);

                return (
                <Pressable key={index} style={styles.recipeCard}>
                    {recipeImage && (
                    <ImageBackground source={{ uri: recipeImage }} style={styles.recipeImageBackground}>
                        <View style={styles.recipeOverlay}>
                        <Text style={styles.recipeText}>{recipeName}</Text>
                        <Text style={styles.recipeText}>{recipeTime}</Text>
                        </View>
                    </ImageBackground>
                    )}
                </Pressable>
                );
            })}
            </ScrollView>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 30,
        marginVertical: 10,
        backgroundColor: 'white',
    },
    profileCircle: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        alignSelf: 'flex-end',
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
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingBottom: 20,
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
        justifyContent: 'center',
        flexDirection: 'row',
      },
      
});