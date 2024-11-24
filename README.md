# MedGen - AI-Driven Healthcare Education Platform

MedGen is a web application designed to generate educational content on healthcare topics for healthcare professionals and patients. Powered by Large Language Models (LLMs), the platform extracts and processes scientific articles to provide evidence-based, up-to-date, and user-tailored educational materials. 

The goal of MedGen is to bridge the knowledge gap in healthcare by providing fast, accurate, and accessible information, ensuring that medical professionals and the general public are equipped with the latest scientific insights, especially in times of emerging health threats.

## Key Features

- **Data Extraction**: Extracts data from trusted scientific sources like PubMed, WHO, CDC, and more.
- **Vector Database for RAG**: Stores scientific data in a vector database for Retrieval-Augmented Generation (RAG) based on user queries.
- **LLM Integration**: Generates accurate medical content on-demand using advanced LLMs like GPT.
- **Tailored Content**: System prompts to generate content tailored to different user levels (scientists, doctors, nurses, students, and patients).
- **Multilingual Support**: Translates content into 50+ languages to ensure global accessibility.
- **Quizzes and Tests**: Offers optional tests to assess user comprehension and understanding of the material.
- **Visual Content Generation**: Provides AI-generated visual aids to enhance the educational process.

## Use Case

- **Healthcare Professionals**: Doctors, nurses, and medical researchers can access the latest evidence-based content for fast decision-making and continuous learning.
- **Medical Students**: Tailored educational materials based on the latest scientific literature to support medical training.
- **Patients**: Provides easy-to-understand, accurate information on medical conditions and treatments, helping patients make informed decisions about their health.

## How It Works

1. **Extract Data**: MedGen extracts data from trusted scientific sources like PubMed, WHO, CDC, and more.
2. **Store in Database**: The data is stored in a vector database, facilitating efficient retrieval using RAG.
3. **Generate Content**: Upon request, the LLM generates medical text relevant to the user’s query (e.g., symptoms, causes, treatment options, etc.).
4. **User-Tailored Prompts**: The system uses custom prompts to generate content for different levels of expertise (e.g., healthcare professionals, patients).
5. **Multilingual Support**: The platform translates the content into multiple languages to ensure global accessibility.
6. **Interactive Tests**: Optionally, users can take tests to assess their understanding of the content.
7. **Visual Content**: The platform generates AI-powered visuals (e.g., diagrams, infographics) to support the educational material.

## Installation

To run MedGen locally or contribute to its development, follow the steps below:

### Prerequisites

- Python 3.8+
- Node.js
- Any other dependencies (e.g., AI models, vector databases) will be specified later.

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/MedGen.git
   cd MedGen
