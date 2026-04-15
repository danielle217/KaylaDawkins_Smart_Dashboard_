# Smart Productivity Hub

A personalized, real-time executive dashboard built with React that centralizes everyday utilities into a single, responsive interface. This project was developed for **CSI 3150: Web and Mobile Systems**.

[**Live Demo**](https://kayla-dawkins-smart-dashboard.vercel.app/) | [**Video Walkthrough**](https://drive.google.com/file/d/1xOPLrfMpDScvAsSldMi7TQKonXzthCqy/view?usp=sharing)

---

## Project Overview
The Smart Productivity Hub solves the muliple tab and apps problem by combining data streams into one dashboard. It integrates real-time weather, global news, a live clock, and a task manager to help users manage their day efficiently without switching between multiple applications.

## Key Features

### Technical Requirements (Functional)
* **Dual-API Integration**: 
    * **Weather**: Fetches real-time data from OpenWeatherMap (temperature, humidity, wind speed) based on city input or geolocation.
    * **News**: Retrieves top US headlines via NewsAPI with real-time filtering capabilities.
* **State Persistence**: Uses `localStorage` to ensure your **To-Do List**, **Dark Mode** preference, and **Background URL** survive page refreshes.
* **Active Clock**: A live-updating clock component that includes a cleanup function (`clearInterval`) to prevent memory leaks.
* **Global Search**: A real-time search bar that filters news articles instantly as you type.

### Advanced Features
* **Background Customization**: Allows users to set a custom dashboard background via image URL with built-in validation.
* **Geolocation Support**: Automatically detects the user's current coordinates to fetch local weather data when permission is given.

## Component Architecture
The application follows a modular React architecture where data flows from the root down to specialized children:
* `App.js`: Root component managing global state for theme, search terms, and background.
* `Clock.js`: Manages time state and lifecycle intervals.
* `Weather.js`: Handles external data fetching for meteorological data.
* `News.js`: Processes headline fetching and array filtering logic.
* `ToDoList.js`: Manages local task state and persistent storage.

## Getting Started

### Prerequisites
* Node.js (v14 or higher)
* npm

### Installation
1.  **Clone the repository**
    ```bash
    git clone https://github.com/danielle217/KaylaDawkins-Smart-Dashboard.git
    ```
2.  **Install dependencies**
    ```bash
    npm install
    ```
3.  **Environment Variables**
    Create a `.env` file in the root directory and add your API keys:
    ```env
    REACT_APP_WEATHER_API_KEY=your_openweathermap_key
    REACT_APP_NEWS_API_KEY=your_newsapi_key
    ```
4.  **Run the App**
    ```bash
    npm start
    ```

## Technical Challenges & Solutions
* **State Synchronization**: Encountered issues where the To-Do toggle would nest objects incorrectly. Resolved by implementing the **Spread Operator** to properly update state without mutating previous data.
* **API Error Handling**: Fixed a bug where failed network requests would crash the UI by implementing **try-catch blocks** and user-friendly error messages.

## License
This project was created for educational purposes as part of the CSI 3150 course.