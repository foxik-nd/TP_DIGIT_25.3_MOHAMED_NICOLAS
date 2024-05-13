import React, { useState } from 'react';
import axios from 'axios';

const AI = ({ model }) => {
  const [prediction, setPrediction] = useState(null);
  const [imageData, setImageData] = useState(null);

  const predictDigit = async () => {
    try {
      // Envoyer les données d'image à l'API Flask
      const response = await axios.post('http://localhost:5000/predict', {
        image: imageData
      });

      // Mettre à jour l'état avec la prédiction reçue de l'API
      setPrediction(response.data.predicted_class);
    } catch (error) {
      console.error('Erreur lors de la prédiction :', error);
    }
  };

  return (
    <div>
      <button className="btn" onClick={predictDigit}>Cliquez pour la prediction</button>
      {prediction !== null && <div>Résultat de la prédiction : {prediction}</div>}
    </div>
  );
};

export default AI;
