import functions_framework

@functions_framework.http
def hello_http(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """
    request_json = request.get_json(silent=True)
    request_args = request.args
     
    allowed_origins = ['http://localhost:3000', 'https://*']
    origin = request.headers.get('Origin')
    
    if origin in allowed_origins:
        headers = {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Vary': 'Origin'
        }
    else:
        headers = {}

    # Handle OPTIONS request (preflight)
    if request.method == 'OPTIONS':
        return ('', 204, headers)

    return [{"id":"1","query":"machine learning tutorials","title":"Search Results for: machine learning tutorials","createdAt":"2024-03-15T10:30:00Z","results":156,"language":"en","skillLevel":"beginner"},{"id":"2","query":"javascript best practices","title":"Search Results for: javascript best practices","createdAt":"2024-03-14T15:45:00Z","results":89,"language":"en","skillLevel":"beginner"},{"id":"3","query":"react hooks examples","title":"Search Results for: react hooks examples","createdAt":"2024-03-13T09:20:00Z","results":234,"language":"en","skillLevel":"beginner"},{"id":"4","query":"nextjs deployment","title":"Search Results for: nextjs deployment","createdAt":"2024-03-12T14:15:00Z","results":67,"language":"en","skillLevel":"beginner"},{"id":"5","query":"typescript tips","title":"Search Results for: typescript tips","createdAt":"2024-03-11T11:00:00Z","results":123,"language":"en","skillLevel":"beginner"}]
    
    if request_json and 'name' in request_json:
        name = request_json['name']
    elif request_args and 'name' in request_args:
        name = request_args['name']
    else:
        name = 'World'
    return 'Hello {}!'.format(name)

