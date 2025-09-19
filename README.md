# SpeechFlow 🎤✨
**Beautiful Speech-to-Text Application with Multi-Language Support**

A modern, responsive web application that converts speech to text in real-time with stunning visual design, multi-language support, and professional-grade features. Built with React and powered by the Web Speech API.

## Table of Contents 📚
1. [About](#about)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Features](#features)
5. [Demo](#demo)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)
9. [Acknowledgments](#acknowledgments)

## About ℹ️

### Overview
**SpeechFlow** is a modern speech-to-text web application designed to provide a beautiful, professional transcription experience. Using advanced browser-based speech recognition, this app converts spoken words into text in real-time with stunning visual design and multi-language support. It features a responsive interface with glassmorphism effects, animated gradients, and intuitive controls for recording, copying, and managing transcripts.

### Built With 🔧
- [React 18.3.1](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Vite 5.4.10](https://vitejs.dev/) - Lightning-fast build tool and development server
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) - API for speech recognition
- [Tailwind CSS 3.4.15](https://tailwindcss.com/) - Utility-first CSS framework for styling
- [DaisyUI 4.12.14](https://daisyui.com/) - Beautiful component library for Tailwind
- [React Context API](https://reactjs.org/docs/context.html) - For managing global application state
- [React Icons 5.3.0](https://react-icons.github.io/react-icons/) - Comprehensive icon library
- [React Toastify 10.0.6](https://fkhadra.github.io/react-toastify/) - Elegant notification system

## Getting Started 🚀

### Prerequisites
Before setting up this project locally, make sure you have the following installed:
- **Node.js** (v16.x or above) - [Install Node.js](https://nodejs.org/)
- **Git** - [Install Git](https://git-scm.com/)
- **Modern Browser** - Chrome, Edge, or Safari (required for Web Speech API)
- **Microphone Access** - Ensure your browser has microphone permissions

### Installation ⚙️
Follow these steps to set up the project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/Brielle28/Speech-to-text.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Speech-to-text
    ```

3. Install the necessary dependencies:
    ```bash
    npm install
    ```

### Usage 🖥️
After installing the project, follow these steps to run it locally:

1. Start the development server:
    ```bash
    npm run dev
    ```

2. Open your browser and navigate to `http://localhost:5173` to use the application.

3. To use the speech-to-text functionality:
   - **Select Language** 🌍: Choose your preferred language from the navbar dropdown (English, Spanish, French, German, Chinese, Hindi)
   - Click the **microphone icon** 🎤 to start recording your speech
   - The speech will be transcribed into text in real-time with beautiful animations
   - Click **stop** 🛑 to end the recording
   - You can **copy** 📋, **export** 💾, or **clear** 🗑️ the transcribed text using the footer controls
   - View your **transcript history** 📚 by clicking the History button in the navbar

## Features ✨

### Core Functionality
- **Real-Time Transcription** 🗣️➡️📝: Converts speech to text as you speak with live updates
- **Multi-Language Support** 🌍: 6 languages supported (English, Spanish, French, German, Chinese, Hindi)
- **Live Audio Visualization** 🎵: Beautiful animated lines that respond to your voice
- **Recording Duration Tracking** ⏱️: Real-time timer showing recording length
- **Smart Error Handling** ⚠️: Comprehensive error messages and browser compatibility checks

### Design & User Experience
- **Stunning Visual Design** 🎨: Animated gradient backgrounds with glassmorphism effects
- **Responsive Layout** 📱💻: Optimized for mobile, tablet, and desktop devices
- **Fixed Navigation** 🧭: Always-accessible navbar with hamburger menu for mobile
- **Minimalist Interface** ✨: Clean, modern design with smooth animations
- **Custom Animations** 🎭: Bounce-in effects, floating elements, and pulse animations

### Data Management
- **Local Storage Integration** 💾: Automatic saving of transcripts and history
- **Export Functionality** 📤: Download transcripts as text files with timestamps
- **Copy to Clipboard** 📋: One-click copying of transcribed text
- **Transcript History** 📚: View, search, and manage all previous recordings
- **Metadata Tracking** 📊: Each transcript includes language, duration, and timestamp

### Interface Components
- **Fixed Footer Controls** 🎛️: Always-visible control panel with recording, copy, export, and clear functions
- **Language Selector** 🌐: Easy dropdown with flag icons and language names
- **Speech History Modal** 📖: Centered, responsive modal for viewing past transcripts
- **Settings Panel** ⚙️: Customizable options for auto-save, timestamps, and notifications
- **Browser Warning System** 🚨: Intelligent detection and guidance for unsupported browsers

### Technical Features
- **React Context API** 🔄: Global state management for seamless data flow
- **Toast Notifications** 🔔: User feedback for all actions and errors
- **Keyboard Shortcuts** ⌨️: Escape key to close modals, click-outside functionality
- **Error Recovery** 🔧: Graceful handling of microphone permissions and network issues

## Demo 🎥
Check out a live demo of the **SpeechFlow Web Application**:

- [Speech-to-text](https://voice-to-speech-three.vercel.app/?vercelToolbarCode=a7-GSVrcHVvQU76) 

https://github.com/user-attachments/assets/67c88b09-1e31-41ef-a6a0-e35f1d7af598

## Contributing 🤝
Contributions are welcome! If you want to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push your branch (`git push origin feature/YourFeature`).
5. Open a pull request with a detailed description of your changes.

### Code Style
- Use **camelCase** for variable and function names.
- Write clear, concise commit messages.
- Follow the existing ESLint configuration.
- Use Tailwind CSS utility classes for styling.

## License 📜
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact 📧
If you have any questions or suggestions, feel free to reach out!

- **Email:** chukwuemerieclara@gmail.com
- **GitHub:** [Brielle28](https://github.com/Brielle28)

## Acknowledgments 🙏
- **Web Speech API**: For providing the core speech-to-text functionality.
- **React**: For building the user interface efficiently.
- **Tailwind CSS**: For quickly styling the application with a utility-first approach.
- **React Context API**: For managing the state across the application.
- **Vite**: For the lightning-fast development experience.
- **DaisyUI**: For the beautiful component library.
- **React Icons**: For the comprehensive icon set.
- **React Toastify**: For elegant notification system.
