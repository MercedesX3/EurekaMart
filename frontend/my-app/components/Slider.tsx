import {StyleSheet, FlatList, Text, View} from 'react-native';
import React from 'react';
import { ImageSlider } from '../../../backend/SliderData';

const Slider = () => {
    return (
        <View>
            <FlatList data={ImageSlider} renderItem={({item, index}) => <Slider item={item} index={index}/>}>

            </FlatList>
        </View>
    )
}