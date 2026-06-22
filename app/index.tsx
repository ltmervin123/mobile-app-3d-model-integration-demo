import ButterflyViewer from '@/components/ButterflyViewer';
import SpeciesInfo from '@/components/SpeciesInfo';
import { butterflyData } from '@/data/species';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Top Half: 3D Viewer Section */}
        <View style={styles.viewerContainer}>
          <ButterflyViewer />
        </View>

        {/* Bottom Half: Metadata Section */}
        <View style={styles.metadataContainer}>
          <SpeciesInfo species={butterflyData} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  viewerContainer: {
    flex: 1,           // Takes up roughly 50vh
    backgroundColor: '#f3f4f6',
  },
  metadataContainer: {
    flex: 1,           // Takes up the remaining 50vh and handles its own scrolling
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
});
