# backend/app.py

from flask import Flask, request, jsonify
from recommender_system import get_results
from flask_cors import CORS

app = Flask(__name__)

# enables CORS for all domains
CORS(app)

@app.route('/recommend', methods=['GET'])
def recommend_songs():
    # Get the user input from query parameter
    user_input = request.args.get('query')

    # Get recommendations based on the user input
    recommendations = get_results(user_input)

    # Return recommendations as JSON
    return jsonify({'recommendations': recommendations})

if __name__ == '__main__':
    app.run(debug=True)
