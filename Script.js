// PDF Builder for Bubble - Dynamic PDF Templates
document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const form = document.getElementById('pdf-template-builder');
    const colorSchemeSelect = document.getElementById('color-scheme');
    const customColorsDiv = document.getElementById('custom-colors');
    
    // Show/hide custom colors field based on selection
    colorSchemeSelect.addEventListener('change', function() {
        if (this.value === 'custom') {
            customColorsDiv.style.display = 'block';
        } else {
            customColorsDiv.style.display = 'none';
        }
    });
    
    // Listen for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        handleTemplateCreation();
    });
    
    // Listen for preview button
    document.getElementById('preview-template').addEventListener('click', function() {
        previewTemplate();
    });
    
    // Listen for test PDF button
    document.getElementById('test-pdf').addEventListener('click', function() {
        generateTestPDF();
    });
    
    function handleTemplateCreation() {
        // Get all form values
        const formData = new FormData(form);
        const templateData = {};
        
        // Convert form data to object
        for (let [key, value] of formData.entries()) {
            if (templateData[key]) {
                // Handle multiple values (like checkboxes)
                if (Array.isArray(templateData[key])) {
                    templateData[key].push(value);
                } else {
                    templateData[key] = [templateData[key], value];
                }
            } else {
                templateData[key] = value;
            }
        }
        
        // Basic validation
        if (!templateData['pdf-template-type']) {
            alert('Please select a PDF template type.');
            return;
        }
        
        if (!templateData['template-name']) {
            alert('Please enter a template name.');
            return;
        }
        
        // Create template configuration
        const templateConfig = createTemplateConfig(templateData);
        
        // Display template configuration and save it
        displayTemplateResult(templateConfig);
        
        // Store template configuration for later use
        localStorage.setItem('pdf-template-config', JSON.stringify(templateConfig));
    }
    
    function createTemplateConfig(templateData) {
        const config = {
            id: 'pdf-template-' + Date.now(),
            name: templateData['template-name'],
            type: templateData['pdf-template-type'],
            pageFormat: templateData['page-format'] || 'a4',
            orientation: templateData['orientation'] || 'portrait',
            colorScheme: templateData['color-scheme'] || 'professional',
            fontStyle: templateData['font-style'] || 'sans-serif',
            layoutStyle: templateData['layout-style'] || 'standard',
            includeHeader: templateData['include-header'] === 'true',
            includeFooter: templateData['include-footer'] === 'true',
            headerContent: templateData['header-content'] || '',
            footerContent: templateData['footer-content'] || '',
            dataFields: templateData['data-fields'] ? templateData['data-fields'].split(',').map(f => f.trim()) : [],
            companyFields: Array.isArray(templateData['company-fields']) ? templateData['company-fields'] : (templateData['company-fields'] ? [templateData['company-fields']] : []),
            dynamicTables: templateData['dynamic-tables'] || 'none',
            bubbleIntegration: templateData['bubble-integration'] || '',
            created: new Date().toISOString()
        };
        
        // Add custom colors if selected
        if (templateData['color-scheme'] === 'custom') {
            config.customColors = {
                primary: templateData['primary-color'] || '#007bff',
                secondary: templateData['secondary-color'] || '#6c757d'
            };
        }
        
        return config;
    }
    
    function displayTemplateResult(config) {
        // Create results modal
        const modal = document.createElement('div');
        modal.id = 'template-results-modal';
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
        
        const templateSummary = formatTemplateConfig(config);
        const bubbleIntegrationCode = generateBubbleIntegrationCode(config);
        
        modalContent.innerHTML = `
            <div style="padding: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h2 style="margin: 0; color: #333; flex-grow: 1;">📄 PDF Template Created</h2>
                    <button id="close-modal" style="background: #ff6b35; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center;">×</button>
                </div>
                
                <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0 0 0.5rem 0; color: #666; font-size: 0.9rem;">Template Configuration:</h3>
                    <div style="font-size: 0.85rem; color: #777; white-space: pre-line;">${templateSummary}</div>
                </div>
                
                <div style="background: #e8f4fd; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <h3 style="margin: 0 0 0.5rem 0; color: #055160; font-size: 0.9rem;">🔧 Bubble Integration Code:</h3>
                    <pre style="font-size: 0.8rem; color: #333; white-space: pre-wrap; margin: 0; background: white; padding: 1rem; border-radius: 4px; overflow-x: auto;">${bubbleIntegrationCode}</pre>
                </div>
                
                <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; text-align: center;">
                    <button id="download-config" style="background: #007bff; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; margin-right: 1rem;">📥 Download Config</button>
                    <button id="test-template" style="background: #28a745; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600; margin-right: 1rem;">🧪 Test PDF</button>
                    <button id="create-another" style="background: #6c757d; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Create Another</button>
                </div>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add event listeners
        document.getElementById('close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        document.getElementById('download-config').addEventListener('click', () => {
            downloadTemplateConfig(config);
        });
        
        document.getElementById('test-template').addEventListener('click', () => {
            document.body.removeChild(modal);
            generateTestPDF(config);
        });
        
        document.getElementById('create-another').addEventListener('click', () => {
            document.body.removeChild(modal);
            form.reset();
            customColorsDiv.style.display = 'none';
        });
    }
    
    function formatTemplateConfig(config) {
        return `Template Name: ${config.name}
Type: ${config.type}
Page Format: ${config.pageFormat.toUpperCase()}
Orientation: ${config.orientation}
Color Scheme: ${config.colorScheme}
Font Style: ${config.fontStyle}
Layout Style: ${config.layoutStyle}

Dynamic Fields: ${config.dataFields.length > 0 ? config.dataFields.join(', ') : 'None'}
Company Fields: ${config.companyFields.length > 0 ? config.companyFields.join(', ') : 'None'}
Dynamic Tables: ${config.dynamicTables}

Header: ${config.includeHeader ? 'Yes' : 'No'}${config.headerContent ? ' - ' + config.headerContent : ''}
Footer: ${config.includeFooter ? 'Yes' : 'No'}${config.footerContent ? ' - ' + config.footerContent : ''}

Created: ${new Date(config.created).toLocaleString()}`;
    }
    
    function generateBubbleIntegrationCode(config) {
        return `// Bubble API Call to Generate PDF
// Use this in your Bubble app's workflow

API Endpoint: POST /api/generate-pdf
Headers: {
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_API_KEY"
}

Body: {
  "template_id": "${config.id}",
  "data": {
    ${config.dataFields.map(field => `"${field}": "{{Current User's ${field}}}"`).join(',\n    ')}${config.dataFields.length > 0 ? ',' : ''}
    ${config.companyFields.map(field => `"company_${field}": "{{Company's ${field}}}"`).join(',\n    ')}
  }
}

// Response will contain:
// {
//   "success": true,
//   "pdf_url": "https://your-domain.com/pdfs/generated-file.pdf",
//   "pdf_base64": "base64-encoded-pdf-data"
// }

// In Bubble, you can:
// 1. Save the PDF URL to a database field
// 2. Display the PDF in an HTML element
// 3. Download the PDF directly
// 4. Send via email using the URL`;
    }
    
    function downloadTemplateConfig(config) {
        const dataStr = JSON.stringify(config, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `${config.name.replace(/\s+/g, '-').toLowerCase()}-config.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
    
    function previewTemplate() {
        const formData = new FormData(form);
        const templateData = {};
        
        for (let [key, value] of formData.entries()) {
            templateData[key] = value;
        }
        
        if (!templateData['pdf-template-type']) {
            alert('Please select a PDF template type to preview.');
            return;
        }
        
        const previewArea = document.getElementById('template-preview');
        const previewContent = document.getElementById('preview-content');
        
        previewContent.innerHTML = generatePreviewHTML(templateData);
        previewArea.style.display = 'block';
        previewArea.scrollIntoView({ behavior: 'smooth' });
    }
    
    function generatePreviewHTML(templateData) {
        const templateType = templateData['pdf-template-type'];
        const templateName = templateData['template-name'] || 'Untitled Template';
        
        return `
            <div style="border: 1px solid #ddd; padding: 20px; background: white; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
                <div style="text-align: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #007bff;">
                    <h2 style="margin: 0; color: #333;">${templateName}</h2>
                    <p style="margin: 5px 0; color: #666; text-transform: capitalize;">${templateType.replace('-', ' ')} Template</p>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <strong>Dynamic Fields:</strong>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; margin-top: 5px;">
                        ${templateData['data-fields'] ? 
                            templateData['data-fields'].split(',').map(field => 
                                `<span style="background: #e9ecef; padding: 2px 6px; border-radius: 3px; margin-right: 5px; font-size: 0.9em;">{{${field.trim()}}}</span>`
                            ).join('') 
                            : '<em>No dynamic fields defined</em>'
                        }
                    </div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <strong>Page Setup:</strong>
                    <ul style="margin: 5px 0;">
                        <li>Format: ${(templateData['page-format'] || 'a4').toUpperCase()}</li>
                        <li>Orientation: ${templateData['orientation'] || 'portrait'}</li>
                        <li>Style: ${templateData['layout-style'] || 'standard'}</li>
                    </ul>
                </div>
                
                <div style="margin-top: 20px; text-align: center; color: #666; font-size: 0.9em;">
                    <em>This is a preview. Actual PDF will be generated with live data from Bubble.</em>
                </div>
            </div>
        `;
    }
    
    function generateTestPDF(config = null) {
        if (!config) {
            // Get current form data for test
            const formData = new FormData(form);
            const templateData = {};
            
            for (let [key, value] of formData.entries()) {
                templateData[key] = value;
            }
            
            if (!templateData['pdf-template-type']) {
                alert('Please complete the form to generate a test PDF.');
                return;
            }
            
            config = createTemplateConfig(templateData);
        }
        
        // Generate test PDF using jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: config.orientation,
            unit: 'mm',
            format: config.pageFormat
        });
        
        // Add content to PDF
        generatePDFContent(doc, config);
        
        // Save the PDF
        const fileName = `${config.name.replace(/\s+/g, '-').toLowerCase()}-test.pdf`;
        doc.save(fileName);
    }
    
    function generatePDFContent(doc, config) {
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        let yPosition = 20;
        
        // Header
        if (config.includeHeader && config.headerContent) {
            doc.setFontSize(12);
            doc.setTextColor(100);
            doc.text(config.headerContent.replace('{{company_name}}', 'Sample Company').replace('{{document_type}}', config.type), 20, yPosition);
            yPosition += 15;
        }
        
        // Title
        doc.setFontSize(20);
        doc.setTextColor(0);
        doc.text(config.name, 20, yPosition);
        yPosition += 15;
        
        // Template type
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(`Template Type: ${config.type.replace('-', ' ').toUpperCase()}`, 20, yPosition);
        yPosition += 20;
        
        // Dynamic fields section
        if (config.dataFields.length > 0) {
            doc.setFontSize(14);
            doc.setTextColor(0);
            doc.text('Dynamic Fields:', 20, yPosition);
            yPosition += 10;
            
            doc.setFontSize(10);
            config.dataFields.forEach(field => {
                doc.text(`• ${field}: {{${field}}}`, 25, yPosition);
                yPosition += 7;
            });
            yPosition += 10;
        }
        
        // Company fields section
        if (config.companyFields.length > 0) {
            doc.setFontSize(14);
            doc.setTextColor(0);
            doc.text('Company Information:', 20, yPosition);
            yPosition += 10;
            
            doc.setFontSize(10);
            config.companyFields.forEach(field => {
                doc.text(`• ${field}: {{company_${field}}}`, 25, yPosition);
                yPosition += 7;
            });
            yPosition += 10;
        }
        
        // Configuration details
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text('Configuration:', 20, yPosition);
        yPosition += 8;
        
        doc.setFontSize(9);
        const configText = [
            `Page Format: ${config.pageFormat.toUpperCase()}`,
            `Orientation: ${config.orientation}`,
            `Color Scheme: ${config.colorScheme}`,
            `Font Style: ${config.fontStyle}`,
            `Layout Style: ${config.layoutStyle}`
        ];
        
        configText.forEach(text => {
            doc.text(text, 25, yPosition);
            yPosition += 6;
        });
        
        // Footer
        if (config.includeFooter && config.footerContent) {
            doc.setFontSize(10);
            doc.setTextColor(150);
            doc.text(
                config.footerContent.replace('{{page_number}}', '1').replace('{{total_pages}}', '1'),
                20,
                pageHeight - 10
            );
        }
        
        // Add timestamp
        doc.setFontSize(8);
        doc.setTextColor(200);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 20, pageHeight - 20);
    }
});