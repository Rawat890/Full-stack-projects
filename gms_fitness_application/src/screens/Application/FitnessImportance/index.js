// FitnessWebViewScreen.js

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const FitnessImportance = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Fitness Importance</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            line-height: 1.6;
            background-color: #fefefe;
            color: #333;
          }
          h1 {
            color: #2E86AB;
          }
          ul {
            padding-left: 20px;
          }
          blockquote {
            font-style: italic;
            color: #666;
            border-left: 4px solid #ccc;
            padding-left: 10px;
            margin-left: 0;
          }
        </style>
      </head>
      <body>
        <h1>The Importance of Fitness</h1>
        <p>
          Fitness is essential for a healthy and balanced life. Regular physical activity improves your health, boosts energy, and enhances mental well-being.
        </p>
        <h2>Top Benefits of Fitness:</h2>
        <ul>
          <li>Improves heart health</li>
          <li>Builds strength and endurance</li>
          <li>Helps manage weight</li>
          <li>Boosts mood and mental clarity</li>
          <li>Reduces risk of chronic illness</li>
        </ul>
        <blockquote>
          "Take care of your body. It's the only place you have to live." – Jim Rohn
        </blockquote>
        <p><strong>Keep moving, stay healthy, and be fit!</strong></p>
      </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default FitnessImportance;
