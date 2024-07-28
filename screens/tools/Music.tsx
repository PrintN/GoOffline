import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Button, Alert, AppState } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';

const HomeScreen = () => {
  const [songs, setSongs] = useState([]);
  const [sound, setSound] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

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
          setPlaybackPosition(seconds * 1000); // Convert to milliseconds
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sound]);

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      if (sound && isPlaying) {
        sound.pause();
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
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });

      if (result && result.length > 0) {
        const { uri, name } = result[0];
        const destPath = `${RNFS.DocumentDirectoryPath}/${name}`;
        await RNFS.copyFile(uri, destPath);

        setSongs([...songs, { id: generateUniqueId(), title: name, uri: destPath }]);
      } else {
        Alert.alert('Cancelled', 'No file selected');
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        Alert.alert('Cancelled', 'No file selected');
      } else {
        console.error('Error importing file:', error);
        Alert.alert('Error', 'An error occurred while importing the file.');
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
      setPlaybackDuration(newSound.getDuration() * 1000); // Convert to milliseconds
      setIsPlaying(true);

      newSound.play((success) => {
        if (success) {
          setPlayingIndex(null);
          setIsPlaying(false);
        } else {
          console.error('Playback failed due to audio decoding errors');
          Alert.alert('Error', 'An error occurred during playback.');
        }
      });

      newSound.getCurrentTime((seconds) => {
        setPlaybackPosition(seconds * 1000); // Convert to milliseconds
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
      const newPosition = Math.min((playbackPosition / 1000) + 15, playbackDuration / 1000); // Convert to seconds
      sound.setCurrentTime(newPosition);
      setPlaybackPosition(newPosition * 1000); // Convert back to milliseconds
    }
  };

  const skipBack = () => {
    if (sound) {
      const newPosition = Math.max((playbackPosition / 1000) - 15, 0); // Convert to seconds
      sound.setCurrentTime(newPosition);
      setPlaybackPosition(newPosition * 1000); // Convert back to milliseconds
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
    <View style={styles.songContainer}>
      <TouchableOpacity
        style={styles.moveButton}
        onPress={() => moveSong(index, 'up')}
        disabled={index === 0}
      >
        <Ionicons name="arrow-up" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.moveButton}
        onPress={() => moveSong(index, 'down')}
        disabled={index === songs.length - 1}
      >
        <Ionicons name="arrow-down" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.songContent}
        onPress={() => playSong(index)}
        onLongPress={() => removeSong(index)} // Long press to remove song
      >
        <Image
          style={styles.albumArt}
          source={{ uri: 'https://via.placeholder.com/60' }} // Placeholder image URL
        />
        <View style={styles.songDetails}>
          <Text style={[styles.songTitle, playingIndex === index && styles.currentSong]}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Import Song" onPress={importSong} />
      <FlatList
        data={songs}
        renderItem={renderSong}
        keyExtractor={(item) => item.id}
        style={styles.songList}
      />
      <View style={styles.playerBar}>
        <TouchableOpacity onPress={skipBack}>
          <Ionicons name="play-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToPreviousSong}>
          <Ionicons name="play-skip-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={isPlaying ? pauseSong : resumeSong}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={24}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipToNextSong}>
          <Ionicons name="play-skip-forward" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward}>
          <Ionicons name="play-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  songList: {
    flex: 1,
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  moveButton: {
    marginHorizontal: 5,
  },
  songContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  songDetails: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  songTitle: {
    color: 'white',
    fontSize: 16,
  },
  currentSong: {
    color: '#3EE723', // Color for the currently playing song
  },
  playerBar: {
    height: 70,
    backgroundColor: '#1DB954',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
});

export default HomeScreen;