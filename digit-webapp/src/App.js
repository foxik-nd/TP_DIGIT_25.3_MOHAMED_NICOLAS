import React, { useState } from 'react';
import './App.css';
import Canva from './components/Canva';
import AI from './components/AI';
import axios from 'axios';

function App() {
  const [prediction, setPrediction] = useState(null);

  const handlePrediction = async (imageData) => {
    try {
      // Envoyer les données d'image à l'API Flask pour la prédiction
      const response = await axios.post('http://localhost:5000/predict', {
        image: imageData,
      });

      // Mettre à jour l'état de la prédiction avec la valeur reçue de l'API Flask
      setPrediction(response.data.predicted_class);
    } catch (error) {
      console.error('Erreur lors de la prédiction :', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PROJET IPSSI DIGIT</h1>
        <Canva onPrediction={handlePrediction} />
        <AI prediction={prediction} />
      </header>
    </div>
  );
}

export default App;
