# api/serverless.py

import json
from .recommender_system import get_results 

def handler(request):
    # Get the search query from the request (query parameter)
    query = request.args.get('query', '')  # 'request' contains the query parameters
    
    if not query:
        return {
            'statusCode': 400,  # Bad request if there's no query parameter
            'headers': {
                'Access-Control-Allow-Origin': '*',  # Allow all origins
                'Access-Control-Allow-Methods': 'GET',  # Allow specific methods
                'Access-Control-Allow-Headers': 'Content-Type'  # Allow specific headers
            },
            'body': json.dumps({'error': 'Missing search query'})
        }

    # Now, use your recommender system to get the matching lyrics
    result = get_results(query)  # Assuming this is the function that performs the search

    # Return the result as a JSON response
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',  # Allow all origins
            'Access-Control-Allow-Methods': 'GET',  # Allow specific methods
            'Access-Control-Allow-Headers': 'Content-Type'  # Allow specific headers
        },
        'body': json.dumps(result)
    }