import React, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity, Alert, AppState } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../ThemeContext';

const STORAGE_KEY = 'songsList';

const HomeScreen = () => {
  const [songs, setSongs] = useState([]);
  const [sound, setSound] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const savedSongs = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedSongs) {
          setSongs(JSON.parse(savedSongs));
        }
      } catch (error) {
        console.error('Failed to load songs from storage:', error);
      }
    };

    loadSongs();

    const appStateListener = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      appStateListener.remove();
      if (sound) {
        sound.release();
      }
    };
  }, [sound]);

  useEffect(() => {
    if (sound) {
      const interval = setInterval(() => {
        sound.getCurrentTime((seconds) => {
          setPlaybackPosition(seconds * 1000);
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sound]);

  useEffect(() => {
    const saveSongs = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
      } catch (error) {
        console.error('Failed to save songs to storage:', error);
      }
    };

    saveSongs();
  }, [songs]);

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      if (sound && isPlaying) {
        sound.play();
      }
    } else if (nextAppState === 'active') {
      if (sound && !isPlaying) {
        sound.play();
      }
    }
  };

  const generateUniqueId = () => {
    return `id-${Math.random().toString(36).substr(2, 9)}`;
  };

  const importSong = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
        allowMultiSelection: true,
      });
  
      if (results && results.length > 0) {
        const newSongs = await Promise.all(
          results.map(async (result) => {
            const { uri, name } = result;
            const destPath = `${RNFS.DocumentDirectoryPath}/${name}`;
            await RNFS.copyFile(uri, destPath);
  
            return { id: generateUniqueId(), title: name, uri: destPath };
          })
        );
  
        setSongs((prevSongs) => [...prevSongs, ...newSongs]);
      } else {
        Alert.alert('Cancelled', 'No files selected');
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        Alert.alert('Cancelled', 'No files selected');
      } else {
        console.error('Error importing files:', error);
        Alert.alert('Error', 'An error occurred while importing the files.');
      }
    }
  };  

  const playSong = (index) => {
    const song = songs[index];
    if (!song) return;
  
    if (sound) {
      sound.release();
    }
  
    const newSound = new Sound(song.uri, '', (error) => {
      if (error) {
        console.error('Error playing sound:', error);
        Alert.alert('Error', 'An error occurred while playing the sound.');
        return;
      }
  
      setSound(newSound);
      setPlayingIndex(index);
      setPlaybackPosition(0);
      setPlaybackDuration(newSound.getDuration() * 1000);
      setIsPlaying(true);
  
      newSound.play((success) => {
        if (success) {
          const nextIndex = (index + 1) % songs.length; 
          playSong(nextIndex);
        } else {
          console.error('Playback failed due to audio decoding errors');
          Alert.alert('Error', 'An error occurred during playback.');
        }
      });
  
      newSound.getCurrentTime((seconds) => {
        setPlaybackPosition(seconds * 1000); 
      });
    });
  };
  

  const pauseSong = () => {
    if (sound) {
      sound.pause();
      setIsPlaying(false);
    }
  };

  const resumeSong = () => {
    if (sound) {
      sound.play();
      setIsPlaying(true);
    }
  };

  const skipForward = () => {
    if (sound) {
      const newPosition = Math.min(
        playbackPosition / 1000 + 15,
        playbackDuration / 1000
      );
      sound.setCurrentTime(newPosition);
      setPlaybackPosition(newPosition * 1000);
    }
  };

  const skipBack = () => {
    if (sound) {
      const newPosition = Math.max(playbackPosition / 1000 - 15, 0); 
      sound.setCurrentTime(newPosition);
      setPlaybackPosition(newPosition * 1000); 
    }
  };

  const skipToNextSong = () => {
    if (playingIndex !== null && songs.length > 0) {
      const nextIndex = (playingIndex + 1) % songs.length;
      playSong(nextIndex);
    }
  };

  const skipToPreviousSong = () => {
    if (playingIndex !== null && songs.length > 0) {
      const prevIndex = (playingIndex - 1 + songs.length) % songs.length;
      playSong(prevIndex);
    }
  };

  const removeSong = (index) => {
    Alert.alert(
      'Remove Song',
      'Are you sure you want to remove this song from the queue?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const updatedSongs = songs.filter((_, i) => i !== index);
            setSongs(updatedSongs);
            if (playingIndex === index) {
              setPlayingIndex(null);
              setIsPlaying(false);
              if (sound) {
                sound.release();
              }
            }
          },
        },
      ]
    );
  };

  const moveSong = (index, direction) => {
    const updatedSongs = [...songs];
    const [movedSong] = updatedSongs.splice(index, 1);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < updatedSongs.length) {
      updatedSongs.splice(newIndex, 0, movedSong);
      setSongs(updatedSongs);
    }
  };

  const renderSong = ({ item, index }) => (
    <View style={theme.songContainer}>
      <TouchableOpacity
        style={theme.moveButton}
        onPress={() => moveSong(index, 'up')}
        disabled={index === 0}
      >
        <Ionicons name="arrow-up" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={theme.moveButton}
        onPress={() => moveSong(index, 'down')}
        disabled={index === songs.length - 1}
      >
        <Ionicons name="arrow-down" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={theme.songContent}
        onPress={() => playSong(index)}
        onLongPress={() => removeSong(index)} 
      >
        <Image
          style={theme.albumArt}
          source={{ uri: 'https://via.placeholder.com/60' }} 
        />
        <View style={theme.songDetails}>
          <Text
            style={[
              theme.songTitle,
              playingIndex === index && theme.currentSong,
            ]}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={theme.container}>
      <TouchableOpacity style={theme.button} onPress={importSong}>
        <Text style={theme.buttonText}>Import Songs</Text>
      </TouchableOpacity>
      <FlatList
        data={songs}
        renderItem={renderSong}
        keyExtractor={(item) => item.id}
        style={theme.songList}
      />
      <View style={theme.playerBar}>
        <TouchableOpacity onPress={skipBack}>
          <Ionicons name="play-back" size={24} style={theme.playerBarButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToPreviousSong}>
          <Ionicons name="play-skip-back" size={24} style={theme.playerBarButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={isPlaying ? pauseSong : resumeSong}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={24}
            style={theme.playerBarButton}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNextSong}>
          <Ionicons name="play-skip-forward" size={24} style={theme.playerBarButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward}>
          <Ionicons name="play-forward" size={24} style={theme.playerBarButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;