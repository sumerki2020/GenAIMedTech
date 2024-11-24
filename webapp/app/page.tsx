'use client'
import { useState, useEffect } from 'react'
import { Article } from '@/types/article'
import { languages, type LanguageCode, type SkillLevel } from '@/constants/languages'
import ArticleViewer from '@/components/ArticleViewer'

export default function Home() {
  const [formData, setFormData] = useState({
    query: '',
    language: 'en' as LanguageCode,
    skillLevel: 'beginner' as SkillLevel
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [article, setArticle] = useState<Article | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.query.trim()) return

    setIsLoading(true)
    setError(null)
    

    
    try {
      const response = await fetch('https://us-central1-genaimedtech.cloudfunctions.net/MedAnswer-2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: formData.query,
          language: formData.language,
          skillLevel: formData.skillLevel
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      const myArticle: Article = {
        id: 'placeholder-id',
        query: formData.query,
        language: formData.language,
        title: `Search Results for: ${formData.query}`,
        skillLevel: formData.skillLevel,
        content: data.response,
        createdAt: new Date().toISOString(),
      }
      setArticle(myArticle)
      console.log('Response:', data) // You might want to handle the response data
      setFormData(prev => ({ ...prev, query: '' }))
    } catch (err) {
      setError('Failed to generate article. Please try again.')
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
    }

    /*// PLACEHOLDER:
    const examples = [{"response":"## Systemic Lupus Erythematosus (SLE) \u2013 A Quick Reference for Healthcare Professionals\n\n**Overview:**\n\nSystemic Lupus Erythematosus (SLE), commonly referred to as lupus, is a chronic, autoimmune, multisystem inflammatory disease characterized by the production of autoantibodies against nuclear antigens.  It exhibits a highly variable clinical presentation, ranging from mild to life-threatening, and frequently necessitates multidisciplinary management. Its prevalence is estimated at 20-150 per 100,000, with a female predominance (9:1 female-to-male ratio). Early diagnosis and aggressive management are crucial to minimize organ damage and improve long-term outcomes.![Systemic Lupus Erythematosus >](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Symptoms_of_SLE.png/440px-Symptoms_of_SLE.png)\n\n**Symptoms:**\n\nSLE manifests with a wide array of symptoms, making diagnosis challenging. Common presentations include:\n\n* **Constitutional:** Fatigue, fever, weight loss\n* **Musculoskeletal:** Arthralgia, arthritis (typically non-erosive), myalgia\n* **Cutaneous:** Malar rash (butterfly rash), discoid rash, photosensitivity, oral ulcers\n* **Renal:** Nephritis (varying severity), proteinuria, hematuria\n* **Hematologic:** Anemia, leukopenia, thrombocytopenia\n* **Neuropsychiatric:** Seizures, cognitive dysfunction, psychosis, peripheral neuropathy\n* **Cardiopulmonary:** Pleuritis, pericarditis, myocarditis, pulmonary hypertension\n\n**Causes:**\n\nThe precise etiology of SLE remains unclear, but it involves a complex interplay of genetic predisposition, environmental triggers (e.g., UV exposure, infections), and hormonal influences (estrogen). The hallmark of SLE is the loss of immune tolerance, leading to B-cell hyperactivity and autoantibody production, resulting in immune complex deposition and inflammation in various organs.\n\n**Risk Factors:**\n\n* **Genetics:** Family history of SLE or other autoimmune diseases\n* **Sex:** Female sex, particularly during childbearing years\n* **Ethnicity:** Higher prevalence in African American, Hispanic, and Asian populations\n* **Environmental factors:** UV radiation, certain medications (e.g., hydralazine, procainamide), infections (e.g., Epstein-Barr virus)\n\n**Complications:**\n\nUntreated or poorly controlled SLE can lead to significant organ damage and complications, including:\n\n* **Lupus nephritis:** End-stage renal disease\n* **Cardiovascular disease:** Myocardial infarction, stroke\n* **Neuropsychiatric complications:** Cognitive impairment, seizures, psychosis\n* **Pulmonary hypertension:** Respiratory failure\n* **Infections:** Increased susceptibility due to immunosuppression\n\n**Treatment:**\n\nTreatment is individualized based on disease severity and organ involvement. Common therapies include:\n\n* **First-line:** Hydroxychloroquine (HCQ), NSAIDs for mild disease\n* **Moderate-severe disease:** Corticosteroids (prednisone), immunosuppressants (azathioprine, mycophenolate mofetil, cyclophosphamide), belimumab (biologic agent)\n* **Specific organ involvement:** Targeted therapies (e.g., ACE inhibitors/ARBs for renal involvement)\n\n**Prevention:**\n\nWhile SLE cannot be entirely prevented, certain measures can help reduce flares and minimize disease activity:\n\n* **Sun protection:**  Strict adherence to sun avoidance and use of broad-spectrum sunscreen.\n* **Infection control:**  Appropriate vaccinations and prompt treatment of infections.\n* **Lifestyle modifications:**  Stress management, regular exercise, balanced diet, smoking cessation.\n* **Medication adherence:**  Strict compliance with prescribed medications and regular monitoring.\n\n\nThis information is for educational purposes only and should not be considered medical advice. Consult with a rheumatologist or other qualified healthcare professional for diagnosis and treatment of SLE.\n"},
{"response":"## African Swine Fever (ASF) \u2013 A Quick Reference for Healthcare Professionals\n\n**Overview:**  African swine fever (ASF) is a highly contagious and often fatal viral hemorrhagic fever affecting domestic and wild pigs. ![Pigs >](https://vetvaccnet.ac.uk/sites/default/files/styles/max_325x325/public/quick_media/African%20Swine%20Fever%20coloured.jpg?itok=w7Xl2UDv) While not a direct threat to human health, ASF poses a significant economic and food security risk due to its devastating impact on pig populations.  Healthcare professionals, particularly those in rural communities or involved in public health, should be aware of ASF for its potential socioeconomic ramifications and role in differential diagnosis of other swine diseases.\n\n**Symptoms:**  ASF presents with a wide range of clinical signs, varying in severity depending on the viral strain and host.\n\n* **Acute Form:**  High fever (40-42\u00b0C), anorexia, lethargy, weakness, cyanosis of the skin (ears, snout, limbs), hemorrhages (petechiae, ecchymoses), respiratory distress, vomiting, diarrhea (often bloody), abortions, and high mortality (approaching 100%).\n* **Subacute Form:** Similar but less severe symptoms, prolonged course of illness, moderate mortality.\n* **Chronic Form:**  Intermittent fever, weight loss, skin lesions, joint swelling, respiratory difficulties, low mortality.\n\n**Critical for Diagnosis:**  Hemorrhages, high fever, and sudden death, particularly in a group of pigs.\n\n**Causes:** ASF is caused by the African swine fever virus (ASFV), a large, double-stranded DNA virus belonging to the *Asfarviridae* family.  The virus is highly resistant in the environment and can persist for extended periods in various matrices (e.g., feed, feces, tissues).\n\n**Risk Factors:**\n\n* **Direct contact:** Contact with infected pigs, bodily fluids, or contaminated carcasses.\n* **Indirect contact:**  Exposure to contaminated feed, fomites (e.g., vehicles, equipment), or vectors (e.g., soft ticks of the *Ornithodoros* genus).\n* **Consumption of contaminated pork products:** Although not a risk to human health, feeding pigs uncooked or improperly processed pig meat can transmit the virus.\n* **Swill feeding:** Feeding pigs food waste containing contaminated pork products.\n\n**Complications:**  The high mortality rate associated with acute ASF leads to significant economic losses for pig farmers.  Outbreaks can also disrupt trade and food supply chains, potentially impacting food security.\n\n**Treatment:**  There is no effective treatment or vaccine available for ASF.  Control efforts focus on preventing the spread of the virus.\n\n**Prevention:**\n\n* **Strict biosecurity measures:** Implement robust biosecurity protocols on pig farms, including quarantine of new animals, disinfection of equipment and premises, and control of vectors.\n* **Early detection and reporting:** Rapid and accurate diagnosis is crucial. Suspected cases should be immediately reported to veterinary authorities.\n* **Culling and carcass disposal:**  Stamping out infected and potentially exposed pigs is often necessary to control outbreaks. Proper disposal of carcasses is critical to prevent further spread.\n* **Movement restrictions:**  Restricting the movement of pigs and pork products from affected areas helps contain the virus.\n* **Public awareness and education:**  Educating farmers, veterinarians, and the public about ASF symptoms, transmission routes, and prevention measures is essential.\n\n**Note:** This information is for educational purposes only and should not be considered medical advice. Consult with veterinary authorities for the latest information and guidelines regarding ASF management.\n"},
{"response":"## VEXAS Syndrome: A Guide for Healthcare Professionals\n\n**Overview:** VEXAS (Vacuoles, E1 enzyme, X-linked, Autoinflammatory, Somatic) syndrome is a rare, acquired inflammatory disorder predominantly affecting males. Characterized by somatic mutations in *UBA1*, it presents with a range of hematological and rheumatological manifestations.  Early diagnosis is crucial for appropriate management and preventing severe complications.\n\n**Symptoms:**  Clinical presentation is variable and can mimic other inflammatory conditions. Key symptoms include:\n\n* **Hematological:** Macrocytic anemia (often refractory to treatment), neutropenia, thrombocytopenia, myelodysplastic syndrome (MDS).\n* **Rheumatological:** Fever, skin rashes (e.g., livedo reticularis, urticaria), polychondritis (particularly auricular), arthralgias/arthritis, pulmonary infiltrates.\n* **Constitutional:** Fatigue, weight loss, malaise.\n\n\n**Causes:** VEXAS is caused by somatic mutations in *UBA1*, a gene encoding ubiquitin-activating enzyme 1, specifically in hematopoietic progenitor cells. This mutation disrupts ubiquitination processes, leading to inflammatory dysregulation.  The condition is almost exclusively observed in males due to its association with the X chromosome and the skewed X-inactivation pattern observed in hematopoiesis.\n\n**Risk Factors:**  VEXAS typically manifests in middle-aged to older men (median age of onset: 64 years).  No other definitive risk factors have been identified yet.\n\n\n**Complications:** Untreated or delayed diagnosis can lead to significant morbidity and mortality.  Complications include:\n\n* Progressive cytopenias requiring transfusions.\n* Transformation to acute myeloid leukemia (AML).\n* Severe inflammatory complications affecting cartilage, lungs, and other organs.\n* Increased susceptibility to infections.\n\n\n**Treatment:**  Management is largely focused on controlling inflammation and hematological manifestations. \n\n* **First-line:** High-dose glucocorticoids (e.g., prednisone) are often the initial treatment.\n* **Second-line:**  Disease-modifying antirheumatic drugs (DMARDs) like methotrexate, azathioprine, or tocilizumab may be used for steroid-refractory or steroid-sparing approaches.  Janus kinase (JAK) inhibitors, such as ruxolitinib, show promising results.\n* **Hematopoietic stem cell transplantation (HSCT):**  Considered in younger patients with severe disease and available donors, HSCT offers the potential for a cure by replacing the mutated hematopoietic cells.\n* **Supportive care:**  Management of cytopenias (transfusions), infection prophylaxis, and addressing specific organ involvement are essential.\n\n\n**Prevention:**  As VEXAS is caused by spontaneous somatic mutations, primary prevention is not currently possible.  Early diagnosis and prompt initiation of treatment are crucial to mitigate disease progression and prevent serious complications. Genetic testing for *UBA1* mutations should be considered in men presenting with the characteristic clinical features, especially refractory macrocytic anemia and inflammatory manifestations.\n\n\n\n\nThis information is for educational purposes only and should not be construed as medical advice.  Consult with a hematologist or rheumatologist for diagnosis and treatment of VEXAS syndrome.\n"}];

    // Temporary placeholder response
    const placeholderArticle: Article = {
      id: 'placeholder-id',
      query: formData.query,
      language: formData.language,
      title: `Search Results for: ${formData.query}`,
      skillLevel: formData.skillLevel,
      content: examples[1].response,
      createdAt: new Date().toISOString(),
    }

    try {
      // Comment out or remove the actual API call temporarily
      
      // Instead, use the placeholder
      setArticle(placeholderArticle)
      setFormData(prev => ({ ...prev, query: '' }))
    } catch (err) {
      setError('Failed to generate article. Please try again.')
      console.error('Error:', err)
    } finally {
      setIsLoading(false)
    }*/
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Search Form */}
        <div className="bg-white p-6 shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Query Input and Generate Button */}
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  id="query"
                  type="text"
                  value={formData.query}
                  onChange={(e) => setFormData(prev => ({ ...prev, query: e.target.value }))}
                  placeholder="Enter your search query..."
                  className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  minLength={3}
                />
                <label className="text-sm text-gray-500 italic">Example: Systemic Lupus Erythematosus</label>
              </div>
              <button
                type="submit"
                disabled={isLoading || formData.query.trim().length < 3}
                className="bg-blue-500 text-white px-6 h-[50px] hover:bg-blue-600 disabled:bg-blue-300 transition rounded-lg whitespace-nowrap"
              >
                {isLoading ? 'Processing...' : 'Generate article'}
              </button>
            </div>

            {/* Language and Skill Level Row */}
            <div className="flex gap-8">
              {/* Language Selection */}
              <div className="flex-1">
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  id="language"
                  value={formData.language}
                  onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value as LanguageCode }))}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white rounded-lg"
                >
                  {languages.map(({ code, name, flag }) => (
                    <option key={code} value={code}>
                      {flag} {name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Skill Level Selection */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skill Level
                </label>
                <div className="flex gap-6 p-3 border border-gray-300 rounded-lg">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="skillLevel"
                      value="beginner"
                      checked={formData.skillLevel === 'beginner'}
                      onChange={(e) => setFormData(prev => ({ ...prev, skillLevel: e.target.value as SkillLevel }))}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2">Beginner</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="skillLevel"
                      value="professional"
                      checked={formData.skillLevel === 'professional'}
                      onChange={(e) => setFormData(prev => ({ ...prev, skillLevel: e.target.value as SkillLevel }))}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2">Professional</span>
                  </label>
                </div>
              </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>

        {/* Search History */}
        {/* Update ArticleViewer to use the article state */}
        {article && <ArticleViewer article={article} />}
        <SearchHistory />
      </div>
    </main>
  )
}

function SearchHistory() {
  const [searches, setSearches] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchSearches()
  }, [])

  const fetchSearches = async () => {
    try {
      const response = await fetch('https://us-central1-pelagic-fin-419215.cloudfunctions.net/function-1')
      if (!response.ok) throw new Error('Failed to fetch searches')
      const data = await response.json()
      setSearches(data)
    } catch (error) {
      console.error('Error fetching searches:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white p-6 shadow">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 w-1/4"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2 py-4">
              <div className="h-4 bg-gray-200 w-3/4"></div>
              <div className="h-3 bg-gray-200 w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 shadow">
      <h2 className="text-xl font-bold mb-4">Recent Searches</h2>
      {searches.length === 0 ? (
        <p className="text-gray-500">No searches yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {searches.map((search) => (
            <li key={search.id} className="py-4 hover:bg-gray-50">
              <div className="block">
                <h3 className="font-semibold text-lg text-gray-900">
                  {search.query}
                </h3>
                <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                  <span>
                    {languages.find(l => l.code === search.language)?.flag} 
                    {languages.find(l => l.code === search.language)?.name}
                  </span>
                  <span>•</span>
                  <span className="capitalize">{search.skillLevel}</span>
                  <span>•</span>
                  <span>
                    {new Date(search.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {search.results && (
                    <>
                      <span>•</span>
                      <span>{search.results} results</span>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
} 