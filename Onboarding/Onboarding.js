import { View, Text, StyleSheet, FlatList, Animated} from 'react-native';
import React, {useState, useRef} from 'react';
import slides from '../slides';
import OnboardingItem from './OnboardingItem';

export default function Onboarding() {
    const  [currentIndex, setCurrentIndex] = useState(0);
    const ScrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
          setCurrentIndex(viewableItems[0].index);
        }
      });
      

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  
    return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
      <FlatList 
        data={slides} 
        renderItem={({item}) => <OnboardingItem item={item} /> }
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: ScrollX } }}], {
            useNativeDriver: false,
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged.current}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
    />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})