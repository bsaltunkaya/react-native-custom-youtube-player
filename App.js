import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import CustomYouTubePlayer from './components/CustomYouTubePlayer';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [customVideoId, setCustomVideoId] = useState('');
  const [videoList, setVideoList] = useState([
    {
      id: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up',
    },
    {
      id: 'kJQP7kiw5Fk',
      title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
    },
  ]);

  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : url;
  };

  const addCustomVideo = () => {
    if (!customVideoId.trim()) {
      Alert.alert('Hata', 'Lütfen bir YouTube video ID\'si veya URL\'si girin.');
      return;
    }

    const videoId = extractVideoId(customVideoId.trim());
    const newVideo = {
      id: videoId,
      title: `Custom Video - ${videoId}`,
    };

    setVideoList([...videoList, newVideo]);
    setCustomVideoId('');
    Alert.alert('Başarılı', 'Video listeye eklendi!');
  };

  const removeVideo = (index) => {
    Alert.alert(
      'Video Sil',
      'Bu videoyu listeden kaldırmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            const newList = videoList.filter((_, i) => i !== index);
            setVideoList(newList);
          },
        },
      ]
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Özelleştirilmiş YouTube Oynatıcısı</Text>
          <Text style={styles.headerSubtitle}>React Native • Expo Bare Workflow • SDK 53</Text>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.addVideoSection}>
            <Text style={styles.sectionTitle}>Yeni Video Ekle</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="YouTube video ID veya URL girin..."
                value={customVideoId}
                onChangeText={setCustomVideoId}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity style={styles.addButton} onPress={addCustomVideo}>
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.helpText}>
              Örnek: dQw4w9WgXcQ veya https://www.youtube.com/watch?v=dQw4w9WgXcQ
            </Text>
          </View>

          <View style={styles.videoSection}>
            <Text style={styles.sectionTitle}>Video Listesi</Text>
            {videoList.map((video, index) => (
              <View key={index} style={styles.videoItem}>
                <View style={styles.videoHeader}>
                  <Text style={styles.videoTitle}>{video.title}</Text>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => removeVideo(index)}
                  >
                    <Ionicons name="trash" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
                
                <CustomYouTubePlayer
                  videoId={video.id}
                  height={220}
                  autoplay={false}
                  muted={false}
                  loop={false}
                  showControls={true}
                  showTitle={false}
                  title={video.title}
                />
              </View>
            ))}
          </View>

          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Özellikler</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Ionicons name="play-circle" size={24} color="#FF0000" />
                <Text style={styles.featureText}>Özelleştirilmiş oynatma kontrolleri</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="expand" size={24} color="#FF0000" />
                <Text style={styles.featureText}>Tam ekran desteği</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="volume-high" size={24} color="#FF0000" />
                <Text style={styles.featureText}>Ses kontrolü</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="time" size={24} color="#FF0000" />
                <Text style={styles.featureText}>İleri/geri sarma (+10s/-10s)</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="refresh" size={24} color="#FF0000" />
                <Text style={styles.featureText}>Başa dönme özelliği</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="phone-portrait" size={24} color="#FF0000" />
                <Text style={styles.featureText}>Responsive tasarım</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="finger-print" size={24} color="#FF0000" />
                <Text style={styles.featureText}>React Native Gesture Handler desteği</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="speedometer" size={24} color="#FF0000" />
                <Text style={styles.featureText}>React Native Reanimated animasyonları</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="layers" size={24} color="#FF0000" />
                <Text style={styles.featureText}>React Native Screens optimizasyonu</Text>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              React Native YouTube iframe ile geliştirilmiştir
            </Text>
            <Text style={styles.footerText}>
              Expo SDK 53 • Bare Workflow desteği
            </Text>
            <Text style={styles.footerText}>
              RN Screens • RN Reanimated • RN Gesture Handler
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
  },
  addVideoSection: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  helpText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  videoSection: {
    marginHorizontal: 20,
  },
  videoItem: {
    marginBottom: 20,
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  videoTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  deleteButton: {
    padding: 5,
  },
  featuresSection: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuresList: {
    gap: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 2,
  },
}); 