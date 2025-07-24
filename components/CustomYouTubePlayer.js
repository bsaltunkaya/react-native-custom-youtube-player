import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CustomYouTubePlayer = ({ 
  videoId, 
  height = 200,
  autoplay = false,
  muted = false,
  loop = false,
  showControls = true,
  showTitle = true,
  title = "YouTube Video"
}) => {
  const [playing, setPlaying] = useState(autoplay);
  const [mute, setMute] = useState(muted);
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(null);

  const onStateChange = useCallback((state) => {
    console.log('YouTube Player State:', state);
    if (state === 'ended') {
      setPlaying(false);
      setCurrentTime(0);
    } else if (state === 'playing') {
      setPlaying(true);
    } else if (state === 'paused') {
      setPlaying(false);
    }
  }, []);

  const onReady = useCallback(() => {
    console.log('YouTube Player Ready');
    setLoading(false);
  }, []);

  const onError = useCallback((error) => {
    console.log('YouTube Player Error:', error);
    Alert.alert('Hata', 'Video yüklenirken bir hata oluştu.');
    setLoading(false);
  }, []);

  const togglePlayPause = () => {
    setPlaying(!playing);
  };

  const toggleMute = () => {
    setMute(!mute);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  const seekTo = (seconds) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const playerHeight = fullscreen ? screenHeight : height;
  const playerWidth = fullscreen ? screenWidth : screenWidth - 40;

  return (
    <View style={[
      styles.container,
      fullscreen && styles.fullscreenContainer
    ]}>
      {showTitle && !fullscreen && (
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      
      <View style={[
        styles.playerContainer,
        { height: playerHeight, width: playerWidth }
      ]}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF0000" />
            <Text style={styles.loadingText}>Video yükleniyor...</Text>
          </View>
        )}
        
        <YoutubePlayer
          ref={playerRef}
          height={playerHeight}
          width={playerWidth}
          play={playing}
          mute={mute}
          videoId={videoId}
          onChangeState={onStateChange}
          onReady={onReady}
          onError={onError}
          onPlaybackQualityChange={(quality) => console.log('Quality:', quality)}
          onPlaybackRateChange={(rate) => console.log('Rate:', rate)}
          webViewStyle={{
            borderRadius: 8,
          }}
          webViewProps={{
            allowsFullscreenVideo: true,
            mediaPlaybackRequiresUserAction: false,
            domStorageEnabled: true,
            allowsInlineMediaPlayback: true,
            javaScriptEnabled: true,
            scrollEnabled: false,
            bounces: false,
            scalesPageToFit: true,
          }}
        />
      </View>
      
      {!fullscreen && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            YouTube Oynatıcısı - Videoyu oynatmak için tıklayın
          </Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={togglePlayPause}
            >
              <Ionicons name={playing ? "pause" : "play"} size={20} color="#FF0000" />
              <Text style={styles.actionText}>{playing ? 'Duraklat' : 'Oynat'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={toggleMute}
            >
              <Ionicons name={mute ? "volume-mute" : "volume-high"} size={20} color="#FF0000" />
              <Text style={styles.actionText}>{mute ? 'Sesi Aç' : 'Sessiz'}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => seekTo(0)}
            >
              <Ionicons name="refresh" size={20} color="#FF0000" />
              <Text style={styles.actionText}>Başa Dön</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    margin: 0,
    borderRadius: 0,
    zIndex: 1000,
  },
  titleContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  playerContainer: {
    position: 'relative',
    backgroundColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    zIndex: 10,
    borderRadius: 8,
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  infoContainer: {
    padding: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    minWidth: 80,
    justifyContent: 'center',
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#FF0000',
    fontWeight: '500',
  },
});

export default CustomYouTubePlayer; 