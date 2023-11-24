from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

def text_process(text):
    return text.lower()

app = Flask(__name__)
CORS(app)

loaded_model = None 

@app.before_first_request
def load_model():
    global loaded_model
    loaded_model = joblib.load('./pipeline.pkl')

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        'success': True,
        'message': "We With Reviews",
    })

@app.route('/predict', methods=['GET', 'POST'])
def predict():
    try:
        if request.method == 'POST':
            input_text = request.json['input_data']
            # processed_text = text_process(input_text)
            print(input_text)
            predictions = loaded_model.predict([input_text])

            print(predictions)

            generated_text = predictions[0]

            return jsonify({
                'success': True,
                'message': generated_text
            })
        else:
            return jsonify({'success': False, 'error': 'Method Not Allowed'}), 405

    except Exception as e:
        print('Error:', str(e))
        return jsonify({'success': False, 'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(port=3000)
