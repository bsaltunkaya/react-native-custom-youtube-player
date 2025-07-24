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
            opacity: 0.99, // Fix for touch issues on Android
            borderRadius: 8,
          }}
          webViewProps={{
            renderToHardwareTextureAndroid: true, // Fix for touch issues
            androidLayerType: Platform.OS === 'android' && Platform.Version <= 22 ? 'hardware' : 'none', // Fix for older Android versions
            allowsFullscreenVideo: true,
            mediaPlaybackRequiresUserAction: false,
            domStorageEnabled: true,
            allowsInlineMediaPlayback: true,
            injectedJavaScript: `
              // Improve touch handling
              document.addEventListener('touchstart', function(e) {
                e.stopPropagation();
              }, { passive: true });
              
              document.addEventListener('touchend', function(e) {
                e.stopPropagation();
              }, { passive: true });
              
              true;
            `,
          }}
        />
        
        {showControls && !loading && (
          <View style={styles.controlsOverlay}>
            <View style={styles.topControls}>
              {fullscreen && (
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={toggleFullscreen}
                >
                  <Ionicons name="contract" size={24} color="white" />
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.centerControls}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={togglePlayPause}
              >
                <Ionicons 
                  name={playing ? "pause" : "play"} 
                  size={48} 
                  color="white" 
                />
              </TouchableOpacity>
            </View>
            
            <View style={styles.bottomControls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={toggleMute}
              >
                <Ionicons 
                  name={mute ? "volume-mute" : "volume-high"} 
                  size={24} 
                  color="white" 
                />
              </TouchableOpacity>
              
              <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </Text>
              </View>
              
              {!fullscreen && (
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={toggleFullscreen}
                >
                  <Ionicons name="expand" size={24} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
      
      {!fullscreen && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Özelleştirilmiş YouTube Oynatıcısı (SDK 53 uyumlu)
          </Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => seekTo(0)}
            >
              <Ionicons name="refresh" size={20} color="#FF0000" />
              <Text style={styles.actionText}>Başa Dön</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => seekTo(currentTime + 10)}
            >
              <Ionicons name="play-forward" size={20} color="#FF0000" />
              <Text style={styles.actionText}>+10s</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => seekTo(Math.max(0, currentTime - 10))}
            >
              <Ionicons name="play-back" size={20} color="#FF0000" />
              <Text style={styles.actionText}>-10s</Text>
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
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  webView: {
    borderRadius: 8,
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  topControls: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
  },
  centerControls: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
  },
  bottomControls: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  playButton: {
    padding: 12,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  timeContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  timeText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
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
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#FF0000',
    fontWeight: '500',
  },
});

export default CustomYouTubePlayer; 