// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const form = document.getElementById('template-request');
    
    // Listen for form submission
    form.addEventListener('submit', function(event) {
        // Prevent the form from actually submitting
        event.preventDefault();

        
        // Get the form values
        const templateType = form.querySelector('[name="template-type"]').value;
        const description = form.querySelector('[name="description"]').value;
        
        // Show a success message
        alert('Thank you for your request! We will review it and get back to you soon.');
        
        // Clear the form
        form.reset();
    });
});
