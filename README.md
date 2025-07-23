# Özelleştirilmiş YouTube Oynatıcısı

React Native ve Expo Bare Workflow kullanarak geliştirilmiş özelleştirilmiş YouTube oynatıcısı.

## Özellikler

- 🎥 **Özelleştirilmiş Kontroller**: Play/pause, ses kontrolü, tam ekran
- 📱 **Responsive Tasarım**: Tüm ekran boyutlarına uyumlu
- ⏭️ **İleri/Geri Sarma**: +10s/-10s hızlı navigasyon
- 🔄 **Başa Dönme**: Tek tıkla video başına dönme
- 🔊 **Ses Kontrolü**: Sessiz/sesli mod değiştirme
- 📺 **Tam Ekran**: Landscape ve portrait mod desteği
- 📋 **Dinamik Liste**: Video ekleme/çıkarma

## Kurulum

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. iOS için Ek Adımlar

```bash
cd ios && pod install && cd ..
```

### 3. Android için Ek Adımlar

`android/app/src/main/AndroidManifest.xml` dosyasında internet izni olduğundan emin olun:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### 4. YouTube API Key (Opsiyonel)

`.env` dosyasında YouTube API anahtarınızı güncelleyin:

```
YOUTUBE_API_KEY=your_actual_api_key_here
```

## Kullanım

### Temel Kullanım

```javascript
import CustomYouTubePlayer from './components/CustomYouTubePlayer';

<CustomYouTubePlayer
  videoId="dQw4w9WgXcQ"
  height={220}
  autoplay={false}
  muted={false}
  showControls={true}
  title="Video Başlığı"
/>
```

### Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `videoId` | string | - | YouTube video ID'si (zorunlu) |
| `height` | number | 200 | Oynatıcı yüksekliği |
| `autoplay` | boolean | false | Otomatik oynatma |
| `muted` | boolean | false | Başlangıçta sessiz |
| `loop` | boolean | false | Video döngüsü |
| `showControls` | boolean | true | Kontrolleri göster |
| `showTitle` | boolean | true | Başlığı göster |
| `title` | string | "YouTube Video" | Video başlığı |

## Çalıştırma

### Development

```bash
npm start
```

### iOS

```bash
npm run ios
```

### Android

```bash
npm run android
```

## Proje Yapısı

```
├── components/
│   └── CustomYouTubePlayer.js  # Ana oynatıcı komponenti
├── App.js                      # Ana uygulama
├── package.json               # Bağımlılıklar
├── babel.config.js            # Babel konfigürasyonu
├── app.json                   # Expo konfigürasyonu
└── .env                       # Çevre değişkenleri
```

## Teknolojiler

- **React Native**: 0.72.6
- **Expo**: ~49.0.15
- **react-native-youtube-iframe**: ^2.3.0
- **react-native-webview**: 13.2.2
- **@expo/vector-icons**: ^13.0.0

## Özelleştirme

### Kontrolleri Özelleştirme

`CustomYouTubePlayer.js` dosyasındaki `styles` objesini düzenleyerek görünümü özelleştirebilirsiniz.

### Yeni Kontroller Ekleme

`controlsOverlay` bölümüne yeni kontroller ekleyebilirsiniz:

```javascript
<TouchableOpacity
  style={styles.controlButton}
  onPress={yourCustomFunction}
>
  <Ionicons name="your-icon" size={24} color="white" />
</TouchableOpacity>
```

## Sorun Giderme

### iOS Simulator'da Video Açılmıyor

iOS simülatörde bazı videolar açılmayabilir. Gerçek cihazda test edin.

### Android'de WebView Hatası

`react-native-webview` paketinin doğru yüklendiğinden emin olun:

```bash
npm uninstall react-native-webview
npm install react-native-webview
```

### Metro Bundler Hatası

Cache'i temizleyip yeniden başlatın:

```bash
npx expo start --clear
```

## Lisans

MIT License

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Destek

Herhangi bir sorun yaşarsanız, lütfen issue oluşturun. 