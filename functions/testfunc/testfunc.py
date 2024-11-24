import functions_framework
import google.cloud.logging
import logging

# Instantiate a client
client = google.cloud.logging.Client()
client.setup_logging()

# Create a custom logger
logger = logging.getLogger('medanswer_logger')
logger.setLevel(logging.INFO)

@functions_framework.http
def hello_http(request):
    """HTTP Cloud Function."""
    # Log the incoming request
    logger.info(f"Received request from: {request.headers.get('Origin', 'Unknown Origin')}")
    
    request_json = request.get_json(silent=True)
    request_args = request.args
    
    # Log the request payload
    if request_json:
        logger.info(f"Request JSON payload: {request_json}")
    if request_args:
        logger.info(f"Request query parameters: {request_args}")
     
    allowed_origins = ['http://localhost:3000','http://127.0.0.1:3000', 'https://*','https://genaimedtech.storage.googleapis.com']
    origin = request.headers.get('Origin')
    
    # Log CORS details
    logger.info(f"Request origin: {origin}")
    
    if origin in allowed_origins:
        headers = {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Vary': 'Origin'
        }
        logger.info("CORS headers applied for allowed origin")
    else:
        headers = {}
        logger.warning(f"Request from unauthorized origin: {origin}")

    # Handle OPTIONS request (preflight)
    if request.method == 'OPTIONS':
        logger.info("Handling OPTIONS preflight request")
        return ('', 204, headers)

    try:
        # Your mock response
        mock_response = [
            {"id":"1","query":"machine learning tutorials","title":"Search Results for: machine learning tutorials","createdAt":"2024-03-15T10:30:00Z","results":156,"language":"en","skillLevel":"beginner"},
            # ... rest of your mock data ...
        ]
        logger.info("Successfully generated response")
        return (mock_response, 200, headers)
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}", exc_info=True)
        return ('Internal Server Error', 500, headers)

