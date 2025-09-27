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
        
        if (templateData['mood']) {
            summary += `Mood: ${getDisplayName('mood', templateData['mood'])}\n`;
        }
        
        if (templateData['text-content']) {
            summary += `Text Content: ${templateData['text-content']}\n`;
        }
        
        if (templateData['description']) {
            summary += `Additional Notes: ${templateData['description']}\n`;
        }
        
        // Show success message with summary
        alert('Thank you for your template request! We will create your custom template based on the following specifications:\n\n' + summary + '\nWe will review your request and get back to you soon with your custom template.');
        
        // Clear the form
        form.reset();
        customDimensionsDiv.style.display = 'none';
    });
    
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
