// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const form = document.getElementById('template-request');
    const dimensionsSelect = document.getElementById('dimensions');
    const customDimensionsDiv = document.getElementById('custom-dimensions');
    
    // Show/hide custom dimensions field based on selection
    dimensionsSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customDimensionsDiv.style.display = 'block';
        } else {
            customDimensionsDiv.style.display = 'none';
        }
    });
    
    // Listen for form submission
    form.addEventListener('submit', function(event) {
        // Prevent the form from actually submitting
        event.preventDefault();

        // Get all form values
        const formData = new FormData(form);
        const templateData = {};
        
        // Convert form data to object
        for (let [key, value] of formData.entries()) {
            templateData[key] = value;
        }
        
        // Basic validation
        if (!templateData['template-type']) {
            alert('Please select a template type.');
            return;
        }
        
        if (!templateData['brand-name']) {
            alert('Please enter your brand name.');
            return;
        }
        
        // Create summary message
        let summary = `Template Request Summary:\n\n`;
        summary += `Template Type: ${getDisplayName('template-type', templateData['template-type'])}\n`;
        summary += `Brand Name: ${templateData['brand-name']}\n`;
        
        if (templateData['brand-colors']) {
            summary += `Brand Colors: ${templateData['brand-colors']}\n`;
        }
        
        if (templateData['brand-style']) {
            summary += `Brand Style: ${getDisplayName('brand-style', templateData['brand-style'])}\n`;
        }
        
        if (templateData['platform']) {
            summary += `Platform: ${getDisplayName('platform', templateData['platform'])}\n`;
        }
        
        if (templateData['dimensions']) {
            if (templateData['dimensions'] === 'custom' && templateData['custom-size']) {
                summary += `Dimensions: ${templateData['custom-size']}\n`;
            } else {
                summary += `Dimensions: ${getDisplayName('dimensions', templateData['dimensions'])}\n`;
            }
        }
        
        if (templateData['target-audience']) {
            summary += `Target Audience: ${templateData['target-audience']}\n`;
        }
        
        if (templateData['topic-focus']) {
            summary += `Main Topic/Focus: ${templateData['topic-focus']}\n`;
        }
        
        if (templateData['cta-text']) {
            summary += `Call to Action: ${templateData['cta-text']}\n`;
        }
        
        if (templateData['cta-type']) {
            summary += `CTA Type: ${getDisplayName('cta-type', templateData['cta-type'])}\n`;
        }
        
        if (templateData['urgency']) {
            summary += `Urgency/Timing: ${getDisplayName('urgency', templateData['urgency'])}\n`;
        }
        
        if (templateData['mood']) {
            summary += `Mood: ${getDisplayName('mood', templateData['mood'])}\n`;
        }
        
        if (templateData['text-content']) {
            summary += `Text Content: ${templateData['text-content']}\n`;
        }
        
        if (templateData['description']) {
            summary += `Additional Notes: ${templateData['description']}\n`;
        }
        
        // Store data for potential regeneration
        sessionStorage.setItem('lastTemplateData', JSON.stringify(templateData));
        sessionStorage.setItem('lastSummary', summary);
        
        // Generate AI template suggestions
        generateAITemplate(templateData, summary);
        
        // Clear the form
        form.reset();
        customDimensionsDiv.style.display = 'none';
    });
    
    // Generate AI-powered template suggestions
    async function generateAITemplate(templateData, summary) {
        // Check if user has provided an API key
        let apiKey = localStorage.getItem('openai_api_key');
        
        if (!apiKey) {
            apiKey = prompt('To generate AI-powered template suggestions, please enter your OpenAI API key:\n\nThis key will be stored locally in your browser and used to call OpenAI\'s API to generate custom template ideas based on your requirements.\n\nYou can get an API key from: https://platform.openai.com/api-keys\n\nFor demo purposes, you can enter "demo" to see sample AI-generated results.\n\nAPI Key:');
            
            if (!apiKey) {
                alert('API key is required to generate AI template suggestions. Your request summary:\n\n' + summary);
                return;
            }
            
            // Store the API key locally for future use
            localStorage.setItem('openai_api_key', apiKey);
        }
        
        // Check for demo mode
        if (apiKey.toLowerCase() === 'demo' || apiKey.toLowerCase() === 'test') {
            // Demo mode with mock AI response
            const mockResponse = `1. **Modern Tech Minimalist**

**Layout Description**: Clean, centered composition with the brand name prominently displayed in a sans-serif font. The logo uses negative space cleverly with geometric shapes forming a subtle tech icon (circuit pattern or abstract network nodes) integrated into or beside the text.

**Color Scheme**: Primary: #007bff (vibrant blue), Secondary: #28a745 (success green), Accent: white backgrounds with subtle gray (#f8f9fa) for depth. Use the blue as the dominant color with green accents.

**Typography**: Modern sans-serif like "Montserrat" or "Inter" for the main brand name in bold (700 weight), with a clean, readable sub-text in regular weight if needed.

**Visual Elements**: Minimalist geometric shapes, thin lines connecting dots to suggest connectivity/networking, subtle gradients, and plenty of white space.

**Unique Features**: The logo incorporates a subtle animation-ready design where elements could pulse or connect, perfect for digital applications.

2. **Professional Corporate Identity**

**Layout Description**: Structured, balanced design with the brand name in a strong, authoritative typeface. Incorporates a symbol or icon that suggests reliability and innovation - perhaps interlocking shapes or a stylized initial letter.

**Color Scheme**: Deep blue (#007bff) as primary with green (#28a745) used sparingly as accent points. White space used effectively with light gray (#e9ecef) backgrounds where needed.

**Typography**: Professional fonts like "Source Sans Pro" or "Open Sans" in medium to bold weights, ensuring excellent readability across all sizes and applications.

**Visual Elements**: Clean lines, professional iconography, subtle shadows for depth, structured grid-based layout, corporate-appropriate styling.

**Unique Features**: Highly versatile design that works equally well in corporate presentations, business cards, and digital applications. Emphasizes trust and professionalism.

3. **Dynamic Innovation Focus**

**Layout Description**: Forward-leaning, dynamic composition suggesting movement and progress. The brand name may be slightly angled or incorporate ascending elements that suggest growth and innovation.

**Color Scheme**: Gradient approach using #007bff to #28a745 transition, creating a sense of progress and innovation. White text on darker gradient backgrounds for contrast.

**Typography**: Modern, slightly futuristic fonts like "Roboto" or "Poppins" with varying weights to create hierarchy and visual interest.

**Visual Elements**: Arrow-like shapes, upward trending lines, tech-inspired geometric patterns, subtle particle effects or dot patterns suggesting digital innovation.

**Unique Features**: This concept emphasizes forward momentum and innovation, perfect for a tech startup. The design suggests growth, progress, and cutting-edge technology while maintaining professional appeal.`;

            // Display demo results
            displayAIResults(summary, mockResponse);
            return;
        }
        
        // Show loading message
        const loadingDiv = createLoadingMessage();
        document.body.appendChild(loadingDiv);
        
        try {
            // Prepare the AI prompt
            const prompt = createAIPrompt(templateData);
            
            // Call OpenAI API
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{
                        role: 'user',
                        content: prompt
                    }],
                    max_tokens: 1000,
                    temperature: 0.7
                })
            });
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            const aiSuggestions = data.choices[0].message.content;
            
            // Remove loading message
            document.body.removeChild(loadingDiv);
            
            // Display AI-generated template suggestions
            displayAIResults(summary, aiSuggestions);
            
        } catch (error) {
            // Remove loading message
            if (document.body.contains(loadingDiv)) {
                document.body.removeChild(loadingDiv);
            }
            
            console.error('AI generation error:', error);
            
            if (error.message.includes('401')) {
                localStorage.removeItem('openai_api_key');
                alert('Invalid API key. Please check your OpenAI API key and try again.');
            } else {
                alert('Error generating AI suggestions: ' + error.message + '\n\nYour request summary:\n\n' + summary);
            }
        }
    }
    
    // Create AI prompt based on template data
    function createAIPrompt(templateData) {
        let prompt = `You are an expert graphic designer and template creator. Based on the following template requirements, provide 3 specific, creative template design suggestions with detailed descriptions.

Template Requirements:
- Type: ${getDisplayName('template-type', templateData['template-type'])}
- Brand: ${templateData['brand-name']}`;

        if (templateData['brand-colors']) {
            prompt += `\n- Brand Colors: ${templateData['brand-colors']}`;
        }
        
        if (templateData['brand-style']) {
            prompt += `\n- Style: ${getDisplayName('brand-style', templateData['brand-style'])}`;
        }
        
        if (templateData['platform']) {
            prompt += `\n- Platform: ${getDisplayName('platform', templateData['platform'])}`;
        }
        
        if (templateData['dimensions']) {
            if (templateData['dimensions'] === 'custom' && templateData['custom-size']) {
                prompt += `\n- Dimensions: ${templateData['custom-size']}`;
            } else {
                prompt += `\n- Dimensions: ${getDisplayName('dimensions', templateData['dimensions'])}`;
            }
        }
        
        if (templateData['target-audience']) {
            prompt += `\n- Target Audience: ${templateData['target-audience']}`;
        }
        
        if (templateData['mood']) {
            prompt += `\n- Mood: ${getDisplayName('mood', templateData['mood'])}`;
        }
        
        if (templateData['topic-focus']) {
            prompt += `\n- Main Focus: ${templateData['topic-focus']}`;
        }
        
        if (templateData['cta-text']) {
            prompt += `\n- Call to Action: ${templateData['cta-text']}`;
        }
        
        if (templateData['text-content']) {
            prompt += `\n- Text Content: ${templateData['text-content']}`;
        }
        
        if (templateData['description']) {
            prompt += `\n- Additional Notes: ${templateData['description']}`;
        }
        
        prompt += `

Please provide 3 unique template design concepts. For each concept, include:

1. **Concept Name**: A catchy name for the design concept
2. **Layout Description**: Detailed description of the visual layout and composition
3. **Color Scheme**: Specific color recommendations (including hex codes when possible)
4. **Typography**: Font style suggestions and text hierarchy
5. **Visual Elements**: Icons, graphics, or design elements to include
6. **Unique Features**: What makes this concept stand out

Format your response clearly with numbered concepts (1, 2, 3) and use the structure above for each concept.`;

        return prompt;
    }
    
    // Create loading message element
    function createLoadingMessage() {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'ai-loading';
        loadingDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            color: white;
            font-family: inherit;
        `;
        
        loadingDiv.innerHTML = `
            <div style="text-align: center; background: white; color: #333; padding: 2rem; border-radius: 12px; max-width: 400px;">
                <div style="margin-bottom: 1rem;">
                    <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #ff6b35; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
                    <style>
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    </style>
                </div>
                <h3 style="margin: 0 0 0.5rem 0; color: #333;">Generating AI Template Suggestions</h3>
                <p style="margin: 0; color: #666;">Please wait while we create custom design concepts for your template...</p>
            </div>
        `;
        
        return loadingDiv;
    }
    
    // Display AI-generated results
    function displayAIResults(summary, aiSuggestions) {
        // Create results modal
        const modal = document.createElement('div');
        modal.id = 'ai-results-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            padding: 2rem;
            box-sizing: border-box;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 16px;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        `;
        
        // Format AI suggestions for better display
        const formattedSuggestions = aiSuggestions
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
        
        modalContent.innerHTML = `
            <div style="padding: 2rem;">
                <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 1.5rem;">
                    <h2 style="margin: 0; color: #333; flex-grow: 1;">🎨 AI-Generated Template Concepts</h2>
                    <button id="close-modal" style="background: #ff6b35; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center;">×</button>
                </div>
                
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0 0 0.5rem 0; color: #666; font-size: 0.9rem;">Based on your requirements:</h3>
                    <div style="font-size: 0.85rem; color: #777; white-space: pre-line;">${summary.replace('Template Request Summary:\n\n', '')}</div>
                </div>
                
                <div style="line-height: 1.6; color: #333;">
                    <p>${formattedSuggestions}</p>
                </div>
                
                <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; text-align: center;">
                    <button id="generate-again" style="background: #28a745; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; margin-right: 1rem;">Generate More Ideas</button>
                    <button id="start-over" style="background: #6c757d; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Start New Request</button>
                </div>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add event listeners
        document.getElementById('close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        document.getElementById('generate-again').addEventListener('click', () => {
            document.body.removeChild(modal);
            // Re-trigger AI generation with same data
            const lastFormData = JSON.parse(sessionStorage.getItem('lastTemplateData') || '{}');
            const lastSummary = sessionStorage.getItem('lastSummary') || '';
            if (lastFormData && lastSummary) {
                generateAITemplate(lastFormData, lastSummary);
            }
        });
        
        document.getElementById('start-over').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Helper function to get display names for select options
    function getDisplayName(fieldName, value) {
        const field = document.getElementById(fieldName);
        if (field && field.tagName === 'SELECT') {
            const option = field.querySelector(`option[value="${value}"]`);
            return option ? option.textContent : value;
        }
        return value;
    }
});
