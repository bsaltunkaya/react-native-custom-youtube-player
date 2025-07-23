import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import CustomYouTubePlayer from '../components/CustomYouTubePlayer';

const PlayerUsage = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>YouTube Player Kullanım Örnekleri</Text>
      
      {/* Temel Kullanım */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Temel Kullanım</Text>
        <CustomYouTubePlayer
          videoId="dQw4w9WgXcQ"
          height={200}
        />
      </View>

      {/* Otomatik Oynatma */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Otomatik Oynatma</Text>
        <CustomYouTubePlayer
          videoId="kJQP7kiw5Fk"
          height={200}
          autoplay={true}
          muted={true} // Çoğu tarayıcı otomatik oynatma için sessiz gerektirir
        />
      </View>

      {/* Özelleştirilmiş Yükseklik */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Büyük Oynatıcı</Text>
        <CustomYouTubePlayer
          videoId="9bZkp7q19f0"
          height={300}
          title="PSY - GANGNAM STYLE"
          showTitle={true}
        />
      </View>

      {/* Kontrolleri Gizle */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Kontrolleri Gizli</Text>
        <CustomYouTubePlayer
          videoId="L_jWHffIx5E"
          height={200}
          showControls={false}
          title="The Smashing Pumpkins - Tonight, Tonight"
        />
      </View>

      {/* Minimal Tasarım */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Minimal Tasarım</Text>
        <CustomYouTubePlayer
          videoId="rTHlyTphWP0"
          height={180}
          showTitle={false}
          title="İsrael Kamakawiwoʻole - Somewhere Over The Rainbow"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    color: '#333',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginHorizontal: 20,
    color: '#666',
  },
});

export default PlayerUsage; 