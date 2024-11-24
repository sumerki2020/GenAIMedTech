import functions_framework
from flask import jsonify, request
import vertexai
from vertexai.generative_models import GenerativeModel, SafetySetting
from google.cloud import bigquery
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

import google.cloud.logging
import logging

# Instantiate a client
client = google.cloud.logging.Client()
client.setup_logging()

# Create a custom logger
logger = logging.getLogger('medanswer_logger')
logger.setLevel(logging.INFO)

# Initialize Vertex AI API
vertexai.init(project="genaimedtech", location="us-central1")

# Function to query BigQuery for relevant documents
def fetch_relevant_context(user_query, project_id="genaimedtech"):
    # Initialize BigQuery client
    client = bigquery.Client(project=project_id)

    # Query to fetch article texts
    query = """
        SELECT document_text
        FROM `genaimedtech.summary_dataset.summaries`
    """
    results = client.query(query).result()
    documents = [row["document_text"] for row in results]

    # Calculate similarity between query and documents using TF-IDF
    vectorizer = TfidfVectorizer()
    doc_vectors = vectorizer.fit_transform(documents)
    query_vector = vectorizer.transform([user_query])

    # Find the most relevant document based on cosine similarity
    similarities = cosine_similarity(query_vector, doc_vectors).flatten()
    most_relevant_idx = similarities.argmax()

    # Return the most relevant document as context
    return documents[most_relevant_idx] if documents else ""

# LLM Generation function
def generate_llm_response(user_prompt, context):
    model = GenerativeModel("gemini-1.5-pro-002")

    generation_config = {
        "max_output_tokens": 8192,
        "temperature": 1,
        "top_p": 0.95,
    }

    safety_settings = [
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
        SafetySetting(
            category=SafetySetting.HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold=SafetySetting.HarmBlockThreshold.OFF
        ),
    ]

    # Combine system, context, and user prompts
    system_prompt = """You are an AI assistant specializing in healthcare education. Your task is to create a one-page educational material tailored for healthcare professionals.

The material should be structured into the following sections:

Overview: Provide a concise summary of the condition, including key facts and relevance to clinical practice.
Symptoms: List the common symptoms, emphasizing those critical for diagnosis.
Causes: Describe the primary causes or underlying mechanisms of the condition.
Risk Factors: Highlight factors that increase the likelihood of developing the condition.
Complications: Outline potential complications or severe outcomes if the condition is untreated.
Treatment: Summarize current evidence-based treatment options, including first-line therapies and alternatives.
Prevention: Include strategies to prevent the condition or reduce its impact.
Requirements:

Use clinical terminology appropriate for healthcare professionals.
Ensure the information is evidence-based, concise, and easy to reference.
Focus on the most relevant details for quick understanding and practical application.
Context: {context}

User Query:"""
    full_prompt = f"{system_prompt}\n\n{user_prompt}"

    # Generate content using the model
    response = model.generate_content(
        [full_prompt],
        generation_config=generation_config,
        safety_settings=safety_settings,
        stream=False,
    )

    # Access the text property of the response directly
    return response.text if hasattr(response, 'text') else "No response generated"

# Cloud Function to handle HTTP requests
@functions_framework.http
def generate(request):
    """HTTP Cloud Function to interact with LLM."""
    
    allowed_origins = ['http://localhost:3000','http://127.0.0.1:3000','https://genaimedtech.storage.googleapis.com']
    origin = request.headers.get('Origin')
    
    # Log CORS details
    logger.info(f"Request origin: {origin}")
    
    #if origin in allowed_origins:
    headers = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Vary': 'Origin'
    }
    logger.info("CORS headers applied for allowed origin")
    #else:
    #    headers = {}
    #    logger.warning(f"Request from unauthorized origin: {origin}")

    # Handle OPTIONS request (preflight)
    if request.method == 'OPTIONS':
        logger.info("Handling OPTIONS preflight request")
        return ('', 204, headers)
        
    # Get user input from request body
    request_json = request.get_json(silent=True)
    if not request_json or 'prompt' not in request_json:
        return jsonify({"error": "No prompt provided"}), 400

    user_prompt = request_json['prompt']

    # Fetch relevant context from BigQuery
    context = fetch_relevant_context(user_prompt)

    # Generate LLM response using context and user input
    response_text = generate_llm_response(user_prompt, context)
    
    # Return the generated response
    return (jsonify({"response": response_text}), 200, headers)
