import { StyleSheet, Pressable} from 'react-native';
import Reshot from "../../assets/images/reshot-illustration-chef-cooking-P6SCDTHJX7 1.svg";
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
import { useNavigation } from 'expo-router';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabOneScreen() {
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

  return (
    <View style={styles.container}>
      <Reshot width={289} height={184} style={{top: 20}}/>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}>Eureka Mart</Text>
      </View>
      <Pressable style={styles.getStartedButton} onPress={()=> {navigation.navigate('two')}}>
        <Text style={styles.getStartedText}>
          Get Started
        </Text>
      </Pressable>
      <View style={styles.accountExistContainer}>
        <Text style={{fontSize: 15, fontFamily: "Inter_600SemiBold"}}>Already have an account? </Text>
        <Pressable><Text style={{color: '#F9C784', fontSize: 15, fontFamily: "Inter_600SemiBold"}}>Login</Text></Pressable>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    top: 80,
    alignSelf: "center", // Allows the text to align left
    width: "80%", // Ensures the text has space to align within
  },
  title: {
    fontSize: 40,
    fontFamily: "Inter_600SemiBold",
    textAlign: "left"
  },
  getStartedButton: {
    top: 130,
    backgroundColor: '#588981',
    height: 49,
    width: 220,
    borderRadius: 50,
    alignSelf: 'flex-start',
    marginLeft: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedText: {
    color: 'white',
    fontSize: 25,
    fontFamily: "Inter_600SemiBold",
  },
  accountExistContainer: {
    flexDirection: 'row',
    top: 160,
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
