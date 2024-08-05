# GoOffline App
GoOffline is a user-friendly mobile application designed to keep you connected and productive, even when you're offline. Whether you need to convert units, track your internet connection status, or manage your tasks, GoOffline has got you covered. With its intuitive design, ensuring you have the tools you need at your fingertips.

## Screenshots
- ### [Home Screen](screenshots/HomeScreen.png)
- ### [Tools Screen](screenshots/ToolsScreen.png)
- ### [Guides Screen](screenshots/GuidesScreen.png)
- ### [Settings Screen](screenshots/SettingsScreen.png)
- ### [Music Player](screenshots/Music.png)
- ### [Currency Converter](screenshots/CurrencyConverter.png)
- ### [Tic Tac Toe](screenshots/TicTacToe.png)
- ### [Translation](screenshots/Translation.png)
- ### [Guide: How To Build A Shelter](screenshots/HowToBuildAShelter.png)

## Tools and Libraries Used
- **React Native**: The core framework used to build the app.
- **react-native-vector-icons/Ionicons**: For using Ionicons as icons in the app.
- **@react-native-community/netinfo**: To detect and handle internet connectivity status.
- **react-native-modal-selector**: For implementing the modal selectors used in unit conversion.
- **Animated API**: For adding smooth animations to the connectivity status indicator.
- **react-native-document-picker**: For selecting and importing audio files from the device.
- **react-native-sound**: For playing and controlling audio files.
- **react-native-fs**: For handling file system operations, such as copying audio files to a specific directory.
- **@react-native-async-storage/async-storage**: For remembering all imported songs.
- **fast-mlkit-translate-text**: For downloading translation models and translating offline.
- **react-native-sensors**: For the compass.

## Installation
### Option 1: Download from Latest Release
1. **Download the Latest Release**: Go to the Releases page and download the latest version of the app.
2. **Install the App**: Follow the instructions provided in the release notes to install the downloaded app on your device.

### Option 2: Run from Source
### Prerequisites
- **Node.js**: Ensure you have Node.js installed on your machine.
- **React Native CLI**: Install the React Native CLI if you haven't already.
- **Android Studio/Xcode**: For running the app on an Android or iOS emulator.

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/PrintN/GoOffline.git
   cd GoOffline
2. **Install Dependencies**:
   ```bash
   npm install
3. **Start the Metro Bundler**:
   ```bash
   npx react-native start
4. **Run the App**:
   ```bash
   npx react-native run-android
   Or
   npx react-native run-ios
## Contributing
We welcome contributions to enhance the GoOffline app. If you have suggestions or want to report an issue, please create a pull request or open an issue on our GitHub repository.

## License
This project is licensed under the GPL-3.0 license. See the [LICENSE](LICENSE) file for details.
