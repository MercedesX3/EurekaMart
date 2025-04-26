import React, { useState, useRef } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TextInput,
  Pressable,
  Image
} from 'react-native';
import Colors from '@/constants/Colors';
import { Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SearchIcon from '@/assets/images/Group 7.png';

import {
    Inter_600SemiBold,
  } from '@expo-google-fonts/inter';

type PopupProps = {
  style?: ViewStyle | ViewStyle[];
  searchText: string;
  setSearchText: (text: string) => void;
  onSubmit: () => void;
};

const SearchBar: React.FC<PopupProps> = ({ searchText, setSearchText, onSubmit, style }) => {
    return (
      <View style={[styles.container, style]}>
        <Image source={SearchIcon} style={styles.image} />
        <TextInput
          style={{marginLeft: 10}}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
          keyboardType="default"
          autoCapitalize="none"
        />
      </View>
    );
  };

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        width: 323,
        height: 43,
        borderRadius: 20,
        backgroundColor: 'white',
        borderColor: Colors.light.gray,
        borderWidth: 2,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
    },
    image: {
        height: 13,
        width: 13,
    }

});