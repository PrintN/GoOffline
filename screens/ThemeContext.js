import React, { createContext, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Retrieve device width
const { width } = Dimensions.get('window');

// Define the available themes
export const standardTheme = {
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  // Navbar
  iconSize: 24,
  iconColor: 'gray',
  iconActiveColor: '#1DB954',
  activeTintColor: '#1DB954',
  inactiveTintColor: 'gray',
  tabBarStyle: {
    backgroundColor: '#121212',
    borderTopColor: '#121212',
  },
  // Home Screen
  containerHomeScreen: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainerHomeScreen: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHomeScreen: {
    color: 'white',
    fontSize: 24,
    marginRight: 10,
  },
  circleHomeScreen: {
    width: 24,
    height: 24,
    borderRadius: 15,
  },
  // Tool Screen
  containerTranslationScreen: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleTranslationScreen: {
    color: 'white',
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  gridTranslationScreen: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: width * 0.9,
  },
  toolBoxTranslationScreen: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    width: width * 0.4,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  toolTextTranslationScreen: {
    color: 'white',
    fontSize: 18,
  },
  backButtonTranslationScreen: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  // Guides Screen
  containerGuidesScreen: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleGuidesScreen: {
    color: 'white',
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  gridGuidesScreen: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: width * 0.9,
  },
  guideBoxGuidesScreen: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    width: width * 0.4,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  guideTextGuidesScreen: {
    color: 'white',
    fontSize: 18,
  },
  backButtonGuidesScreen: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  // Settings Screen
  containerSettingsScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  titleSettingsScreen: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitleSettingsScreen: {
    fontSize: 18,
    color: '#ffff',
    marginBottom: 30,
  },
  buttonSettingsScreen: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    width: 250,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonTextSettingsScreen: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  // Music
  songList: {
    flex: 1,
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  moveButton: {
    marginHorizontal: 3,
    color: 'white'
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
    color: '#fff',
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
  playerBarButton: {
    color: 'white'
  },
  button: {
    backgroundColor: '#1DB954'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: '600'
  },
  // Converter
  containerConverter: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  titleConverter: {
    color: '#1DB954',
    fontSize: 34,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textConverter: {
    marginBottom: 15,
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  inputConverter: {
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: 'black'
  },
  resultConverter: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  buttonConverter: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 5,
  },
  buttonTextConverter: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerConverter: {
    width: '100%',
    marginBottom: 20,
  },
  pickerTextConverter: {
    color: 'white',
    fontSize: 16,
  },
  pickerSelectConverter: {
    borderWidth: 1,
    borderColor: '#1DB954',
    borderRadius: 5,
    padding: 10,
  },
  pickerOptionTextConverter: {
    color: 'black',
    fontSize: 16,
  },
  pickerCancelTextConverter: {
    color: '#1DB954',
    fontSize: 16,
  },
  pickerOverlayConverter: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  // Compass
  containerCompass: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCompass: {
    color: '#1DB954',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  compassContainer: {
    position: 'relative',
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointerCompass: {
    position: 'absolute',
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  angleTextCompass: {
    color: 'white',
    fontSize: 36,
    marginTop: 20,
  },
  // Guess The Number
  containerGuessTheNumber: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  titleGuessTheNumber: { fontSize: 34, color: '#1DB954', marginBottom: 20, fontWeight: 'bold' },
  inputGuessTheNumber: { backgroundColor: 'white', padding: 10, marginBottom: 20, width: '80%', borderRadius: 5, color: 'black' },
  messageGuessTheNumber: { color: 'white', fontSize: 20 },
  buttonGuessTheNumber: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 5,
  },
  buttonTextGuessTheNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Tic Tac Toe
  containerTicTacToe: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  boardTicTacToe: { flexDirection: 'column' },
  rowTicTacToe: { flexDirection: 'row' },
  squareTicTacToe: {
    width: 100, height: 100, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#1DB954', backgroundColor: '#1F1B24'
  },
  textTicTacToe: { fontSize: 24, fontWeight: 'bold', color: '#1DB954' },
  statusTicTacToe: { fontSize: 20, marginBottom: 20, color: '#1DB954' },
  titleTicTacToe: { fontSize: 34, marginBottom: 20, color: '#1DB954', fontWeight: 'bold', },
  buttonTextTicTacToe: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#1DB954',
    padding: 10,
    margin: 10,
    borderRadius: 5
  },
  // Translation
  containerTranslation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  selectorTranslation: {
    marginBottom: 20,
    backgroundColor: '#444',
    borderRadius: 5,
    width: '80%',
  },
  selectTextTranslation: {
    color: 'white',
    padding: 10,
  },
  inputTranslation: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'white',
    width: '80%',
  },
  translatedTextTranslation: {
    marginTop: 20,
    color: 'white',
    textAlign: 'center',
  },
  textTranslation: {
    marginBottom: 15,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonTranslation: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 5,
  },
  buttonTextTranslation: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Maps
  textMaps: {
    color: 'white',
    fontSize: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Guides
  scrollContainerGuides: {
    padding: 20,
  },
  body: {
    color: 'white',
    marginTop: 80
  },
  heading1: {
    color: 'white',
  },
  heading2: {
    color: 'white',
  },
  heading3: {
    color: 'white',
  },
  strong: {
    color: 'white',
  },
  bullet_list: {
    color: 'white',
  },
  ordered_list: {
    color: 'white',
  },
  list_item: {
    color: 'white',
  },
  blockquote: {
    color: 'white',
  },
  code_block: {
    color: 'white',
  },
};

export const darkTheme = {
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  // Navbar
  iconSize: 24,
  iconColor: 'gray',
  iconActiveColor: '#fff',
  activeTintColor: '#fff',
  inactiveTintColor: 'gray',
  tabBarStyle: {
    backgroundColor: '#000',
    borderTopColor: '#000',
  },
  // Home Screen
  containerHomeScreen: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainerHomeScreen: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHomeScreen: {
    color: 'white',
    fontSize: 24,
    marginRight: 10,
  },
  circleHomeScreen: {
    width: 24,
    height: 24,
    borderRadius: 15,
  },
  // Tool Screen
  containerTranslationScreen: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleTranslationScreen: {
    color: 'white',
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  gridTranslationScreen: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: width * 0.9,
  },
  toolBoxTranslationScreen: {
    backgroundColor: '#000',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 20,
    width: width * 0.4,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  toolTextTranslationScreen: {
    color: 'white',
    fontSize: 18,
  },
  backButtonTranslationScreen: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  // Guides Screen
  containerGuidesScreen: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleGuidesScreen: {
    color: 'white',
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  gridGuidesScreen: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: width * 0.9,
  },
  guideBoxGuidesScreen: {
    backgroundColor: '#000',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 20,
    width: width * 0.4,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  guideTextGuidesScreen: {
    color: 'white',
    fontSize: 18,
  },
  backButtonGuidesScreen: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  // Settings Screen
  containerSettingsScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  titleSettingsScreen: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitleSettingsScreen: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 30,
  },
  buttonSettingsScreen: {
    backgroundColor: '#000',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 20,
    width: 250,
    margin: 9,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonTextSettingsScreen: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  // Music
  songList: {
    flex: 1,
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  moveButton: {
    marginHorizontal: 3,
    color: 'white'
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
    color: '#333',
    fontSize: 16,
  },
  currentSong: {
    color: '#3EE723', // Color for the currently playing song
  },
  playerBar: {
    height: 70,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  playerBarButton: {
    color: 'white'
  },
  button: {
    backgroundColor: '#000'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: '600'
  },
  // Converter
  containerConverter: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  titleConverter: {
    color: '#fff',
    fontSize: 34,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textConverter: {
    marginBottom: 15,
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  inputConverter: {
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: 'black'
  },
  resultConverter: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  buttonConverter: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  buttonTextConverter: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerConverter: {
    width: '100%',
    marginBottom: 20,
  },
  pickerTextConverter: {
    color: 'white',
    fontSize: 16,
  },
  pickerSelectConverter: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  pickerOptionTextConverter: {
    color: 'black',
    fontSize: 16,
  },
  pickerCancelTextConverter: {
    color: '#1DB954',
    fontSize: 16,
  },
  pickerOverlayConverter: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  // Compass
  containerCompass: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCompass: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  compassContainer: {
    position: 'relative',
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointerCompass: {
    position: 'absolute',
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  angleTextCompass: {
    color: 'white',
    fontSize: 36,
    marginTop: 20,
  },
  // Guess The Number
  containerGuessTheNumber: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  titleGuessTheNumber: { fontSize: 34, color: '#fff', marginBottom: 20, fontWeight: 'bold' },
  inputGuessTheNumber: { backgroundColor: 'white', padding: 10, marginBottom: 20, width: '80%', borderRadius: 5, color: 'black' },
  messageGuessTheNumber: { color: 'white', fontSize: 20 },
  buttonGuessTheNumber: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  buttonTextGuessTheNumber: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Tic Tac Toe
  containerTicTacToe: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  boardTicTacToe: { flexDirection: 'column' },
  rowTicTacToe: { flexDirection: 'row' },
  squareTicTacToe: {
    width: 100, height: 100, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#fff', backgroundColor: '#000'
  },
  textTicTacToe: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  statusTicTacToe: { fontSize: 20, marginBottom: 20, color: '#fff' },
  titleTicTacToe: { fontSize: 34, marginBottom: 20, color: '#fff', fontWeight: 'bold', },
  buttonTextTicTacToe: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 5
  },
  // Translation
  containerTranslation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  selectorTranslation: {
    marginBottom: 20,
    backgroundColor: '#000',
    borderRadius: 5,
    width: '80%',
  },
  selectTextTranslation: {
    color: 'white',
    padding: 10,
  },
  inputTranslation: {
    height: 40,
    borderColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'white',
    width: '80%',
  },
  translatedTextTranslation: {
    marginTop: 20,
    color: 'white',
    textAlign: 'center',
  },
  textTranslation: {
    marginBottom: 15,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonTranslation: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  buttonTextTranslation: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Maps
  textMaps: {
    color: 'white',
    fontSize: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Guides
  scrollContainerGuides: {
    padding: 20,
  },
  body: {
    color: 'white',
    marginTop: 80
  },
  heading1: {
    color: 'white',
  },
  heading2: {
    color: 'white',
  },
  heading3: {
    color: 'white',
  },
  strong: {
    color: 'white',
  },
  bullet_list: {
    color: 'white',
  },
  ordered_list: {
    color: 'white',
  },
  list_item: {
    color: 'white',
  },
  blockquote: {
    color: 'white',
  },
  code_block: {
    color: 'white',
  },
};

export const lightTheme = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Navbar
  iconSize: 24,
  iconColor: 'gray',
  iconActiveColor: '#000',
  activeTintColor: '#000',
  inactiveTintColor: 'gray',
  tabBarStyle: {
    backgroundColor: '#fff',
    borderTopColor: '#fff',
  },
  // Home Screen
  containerHomeScreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainerHomeScreen: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHomeScreen: {
    color: 'black',
    fontSize: 24,
    marginRight: 10,
  },
  circleHomeScreen: {
    width: 24,
    height: 24,
    borderRadius: 15,
  },
  // Tool Screen
  containerTranslationScreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleTranslationScreen: {
    color: 'black',
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gridTranslationScreen: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: width * 0.9,
  },
  toolBoxTranslationScreen: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    padding: 15,
    width: width * 0.4,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  toolTextTranslationScreen: {
    color: 'black',
    fontSize: 16,
  },
  backButtonTranslationScreen: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  // Guides Screen
  containerGuidesScreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleGuidesScreen: {
    color: 'black',
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  gridGuidesScreen: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: width * 0.9,
  },
  guideBoxGuidesScreen: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    padding: 20,
    width: width * 0.4,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  guideTextGuidesScreen: {
    color: 'black',
    fontSize: 18,
  },
  backButtonGuidesScreen: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  // Settings Screen
  containerSettingsScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  titleSettingsScreen: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitleSettingsScreen: {
    fontSize: 18,
    color: '#000',
    marginBottom: 30,
  },
  buttonSettingsScreen: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    padding: 20,
    width: 250,
    margin: 9,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonTextSettingsScreen: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  // Music
  songList: {
    flex: 1,
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  moveButton: {
    marginHorizontal: 3,
    color: 'black'
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
    color: '#333',
    fontSize: 16,
  },
  currentSong: {
    color: '#3EE723', // Color for the currently playing song
  },
  playerBar: {
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  playerBarButton: {
    color: 'black'
  },
  button: {
    backgroundColor: '#fff'
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: '600'
  },
  // Converter
  containerConverter: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  titleConverter: {
    color: '#000',
    fontSize: 34,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textConverter: {
    marginBottom: 15,
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
  inputConverter: {
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    color: 'black',
    borderColor: 'black',
    borderWidth: 1
  },
  resultConverter: {
    color: 'black',
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  buttonConverter: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  buttonTextConverter: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerConverter: {
    width: '100%',
    marginBottom: 20,
  },
  pickerTextConverter: {
    color: 'black',
    fontSize: 16,
  },
  pickerSelectConverter: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
  },
  pickerOptionTextConverter: {
    color: 'black',
    fontSize: 16,
  },
  pickerCancelTextConverter: {
    color: '#000',
    fontSize: 16,
  },
  pickerOverlayConverter: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  // Compass
  containerCompass: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCompass: {
    color: '#000',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  compassContainer: {
    position: 'relative',
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointerCompass: {
    position: 'absolute',
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  angleTextCompass: {
    color: 'black',
    fontSize: 36,
    marginTop: 20,
  },
  // Guess The Number
  containerGuessTheNumber: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  titleGuessTheNumber: { fontSize: 34, color: '#000', marginBottom: 20, fontWeight: 'bold' },
  inputGuessTheNumber: { backgroundColor: 'white', padding: 10, marginBottom: 20, width: '80%', borderRadius: 5, color: 'black', borderColor: 'black', borderWidth: 1 },
  messageGuessTheNumber: { color: 'black', fontSize: 20 },
  buttonGuessTheNumber: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  buttonTextGuessTheNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Tic Tac Toe
  containerTicTacToe: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  boardTicTacToe: { flexDirection: 'column' },
  rowTicTacToe: { flexDirection: 'row' },
  squareTicTacToe: {
    width: 100, height: 100, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#000', backgroundColor: '#fff'
  },
  textTicTacToe: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  statusTicTacToe: { fontSize: 20, marginBottom: 20, color: '#000' },
  titleTicTacToe: { fontSize: 34, marginBottom: 20, color: '#000', fontWeight: 'bold', },
  buttonTextTicTacToe: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000',
    padding: 10,
    margin: 10,
    borderRadius: 5
  },
  // Translation
  containerTranslation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  selectorTranslation: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: 'black',
    width: '80%',
  },
  selectTextTranslation: {
    color: 'black',
    padding: 10,
  },
  inputTranslation: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'black',
    width: '80%',
    borderRadius: 5
  },
  translatedTextTranslation: {
    marginTop: 20,
    color: 'black',
    textAlign: 'center',
  },
  textTranslation: {
    marginBottom: 15,
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonTranslation: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
  },
  buttonTextTranslation: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Maps
  textMaps: {
    color: 'black',
    fontSize: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Guides
  scrollContainerGuides: {
    padding: 20,
  },
  body: {
    color: 'black',
    marginTop: 80
  },
  heading1: {
    color: 'black',
  },
  heading2: {
    color: 'black',
  },
  heading3: {
    color: 'black',
  },
  strong: {
    color: 'black',
  },
  bullet_list: {
    color: 'black',
  },
  ordered_list: {
    color: 'black',
  },
  list_item: {
    color: 'black',
  },
  blockquote: {
    color: 'black',
  },
  code_block: {
    color: 'black',
  },
};

export const ThemeContext = createContext({
  theme: standardTheme,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(standardTheme);

  // Function to load theme from AsyncStorage
  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('selectedTheme');
      if (savedTheme) {
        setCurrentTheme(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.error('Failed to load theme from storage', error);
    }
  };

  // Function to save theme to AsyncStorage
  const saveTheme = async (theme) => {
    try {
      await AsyncStorage.setItem('selectedTheme', JSON.stringify(theme));
      setCurrentTheme(theme);
    } catch (error) {
      console.error('Failed to save theme to storage', error);
    }
  };

  // Load the theme when the component mounts
  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTheme: saveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};