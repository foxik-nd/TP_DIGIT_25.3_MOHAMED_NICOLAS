import tensorflow as tf
import numpy as np

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Chargement du modèle
new_model = tf.keras.models.load_model('tensorflow_model.h5')

new_model.summary()


# Route
@app.route('/')
def index():
    return 'Serveur Flask en cours d\'exécution'

@app.route('/predict', methods=['POST'])
def predict():
    image_data = request.json['image']

    # Prédiction
    prediction = new_model.predict(image_data)

    # Convertion en JSON
    predicted_class = np.argmax(prediction, axis=1)[0]
    result = {'predicted_class': int(predicted_class)}

    # Renvoyer
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)