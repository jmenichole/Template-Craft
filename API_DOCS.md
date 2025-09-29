# PDF Builder API Documentation for Bubble Developers

## Overview

The PDF Builder plugin provides dynamic PDF generation capabilities that seamlessly integrate with your Bubble application. Unlike Bubble's native PDF generation, our plugin offers advanced templating, styling, and data binding features.

## Getting Started

### 1. Installation
1. Add the PDF Builder plugin to your Bubble app
2. Configure your API key in the plugin settings
3. Add the PDF Builder element to your page

### 2. Basic Setup
```javascript
// Initialize PDF Builder in your workflow
PDF_Builder.initialize({
  api_key: "your-api-key",
  template_type: "invoice"
});
```

## API Endpoints

### Generate PDF
**Endpoint:** `POST /api/generate-pdf`

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_API_KEY"
}
```

**Request Body:**
```json
{
  "template_id": "pdf-template-123456789",
  "data": {
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "invoice_number": "INV-001",
    "invoice_date": "2025-01-15",
    "due_date": "2025-02-15",
    "total_amount": "1,250.00",
    "items_list": [
      {
        "description": "Web Development",
        "quantity": "1",
        "price": "1000.00"
      },
      {
        "description": "Domain Setup",
        "quantity": "1", 
        "price": "250.00"
      }
    ],
    "company_name": "My Business Inc.",
    "company_address": "123 Business St, City, State 12345"
  }
}
```

**Response:**
```json
{
  "success": true,
  "pdf_url": "https://your-domain.com/pdfs/invoice-123456.pdf",
  "pdf_base64": "JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZw...",
  "template_id": "pdf-template-123456789",
  "generated_at": "2025-01-15T10:30:00Z"
}
```

## Bubble Integration

### Using in Workflows

#### 1. Generate PDF Action
Add this action to your workflow:

```
When: Button "Generate Invoice" is clicked
Action: Plugins > PDF Builder > Generate PDF
Template ID: [Your template ID]
Data Source: Current User's Invoice
```

#### 2. Display PDF
```
Element: HTML Element
HTML Code: <iframe src="[PDF Builder's PDF URL]" width="100%" height="600px"></iframe>
```

#### 3. Download PDF
```
Action: Plugins > PDF Builder > Download PDF
PDF URL: [PDF Builder's PDF URL]
Filename: Invoice-[Current User's Invoice's Number].pdf
```

### Data Binding Examples

#### Simple Text Fields
```json
{
  "customer_name": "{{Current Page Invoice's Customer's Name}}",
  "invoice_date": "{{Current Page Invoice's Created Date}}",
  "total_amount": "{{Current Page Invoice's Total formatted as currency}}"
}
```

#### Repeating Groups (Items List)
```json
{
  "items_list": "{{Current Page Invoice's Line Items:formatted as text}}"
}
```

#### Conditional Fields
```json
{
  "tax_amount": "{{Current Page Invoice's Tax Amount:formatted as currency if Current Page Invoice's Include Tax is 'yes' else '0.00'}}"
}
```

## Template Types & Data Fields

### Invoice Template
**Required Fields:**
- `customer_name` (text)
- `invoice_number` (text)
- `invoice_date` (date)
- `total_amount` (number/currency)

**Optional Fields:**
- `customer_email`, `customer_address`, `due_date`
- `items_list` (array of objects)
- `tax_amount`, `discount_amount`
- `notes`, `terms_conditions`

### Receipt Template
**Required Fields:**
- `customer_name` (text)
- `receipt_number` (text)
- `date` (date)
- `amount_paid` (number/currency)

### Business Report Template
**Required Fields:**
- `report_title` (text)
- `report_date` (date)
- `data_summary` (text/object)

**Optional Fields:**
- `charts_data` (array)
- `recommendations` (text)
- `executive_summary` (text)

### Certificate Template
**Required Fields:**
- `recipient_name` (text)
- `certificate_title` (text)
- `issue_date` (date)

**Optional Fields:**
- `course_name`, `completion_date`
- `instructor_name`, `certificate_id`

## Styling Options

### Color Schemes
- `professional`: Blue and gray tones
- `modern`: Black and white with accent colors
- `corporate`: Navy and gold
- `creative`: Multi-color palette
- `minimal`: Light grays and whites

### Font Styles
- `sans-serif`: Modern, clean fonts (Helvetica, Arial)
- `serif`: Traditional fonts (Times, Georgia)
- `monospace`: Technical fonts (Courier, Monaco)

### Layout Styles
- `standard`: Traditional business layout
- `compact`: Dense information layout
- `spacious`: Generous whitespace
- `creative`: Unique, artistic layouts

## Error Handling

### Common Errors
```json
{
  "success": false,
  "error": "INVALID_TEMPLATE_ID",
  "message": "The specified template ID does not exist"
}
```

```json
{
  "success": false,
  "error": "MISSING_REQUIRED_FIELD",
  "message": "Required field 'customer_name' is missing",
  "field": "customer_name"
}
```

```json
{
  "success": false,
  "error": "API_LIMIT_EXCEEDED",
  "message": "Monthly PDF generation limit exceeded",
  "limit": 1000,
  "usage": 1001
}
```

### Error Codes
- `INVALID_API_KEY`: API key is missing or invalid
- `INVALID_TEMPLATE_ID`: Template ID doesn't exist
- `MISSING_REQUIRED_FIELD`: Required data field is missing
- `INVALID_DATA_FORMAT`: Data format is incorrect
- `API_LIMIT_EXCEEDED`: Usage limit reached
- `SERVER_ERROR`: Internal server error

## Advanced Features

### Dynamic Tables
For templates with repeating data (like invoice line items):

```json
{
  "items_list": [
    {
      "description": "Product 1",
      "quantity": "2",
      "unit_price": "50.00",
      "total": "100.00"
    },
    {
      "description": "Product 2", 
      "quantity": "1",
      "unit_price": "25.00",
      "total": "25.00"
    }
  ]
}
```

### Conditional Content
Use conditional logic in your templates:

```json
{
  "show_tax": true,
  "tax_rate": "8.5%",
  "tax_amount": "{{if show_tax}}$85.00{{else}}$0.00{{endif}}"
}
```

### Custom Headers/Footers
```json
{
  "header_content": "{{company_name}} - Invoice #{{invoice_number}}",
  "footer_content": "Page {{page_number}} of {{total_pages}} | Thank you for your business!"
}
```

## Best Practices

### 1. Template Design
- Use consistent styling across templates
- Include all necessary business information
- Test with various data scenarios
- Optimize for both print and digital viewing

### 2. Data Management
- Validate data before sending to API
- Use proper date formatting (ISO 8601)
- Handle missing optional fields gracefully
- Implement error handling in workflows

### 3. Performance
- Cache frequently used templates
- Batch generate multiple PDFs when possible
- Use webhooks for large PDF generation jobs
- Monitor API usage to avoid limits

### 4. Security
- Never expose API keys in client-side code
- Use server-side actions for sensitive data
- Implement proper user permissions
- Regularly rotate API keys

## Support & Resources

### Documentation
- [Complete API Reference](https://docs.pdfbuilder.com)
- [Bubble Integration Guide](https://docs.pdfbuilder.com/bubble)
- [Template Gallery](https://templates.pdfbuilder.com)

### Support Channels
- Email: support@pdfbuilder.com
- Live Chat: Available in plugin dashboard
- Community Forum: [community.pdfbuilder.com](https://community.pdfbuilder.com)

### Sample Apps
- [Invoice Generator Demo](https://bubble.io/page?name=invoice-demo&id=pdfbuilder)
- [Certificate Creator](https://bubble.io/page?name=certificate-demo&id=pdfbuilder)
- [Report Builder](https://bubble.io/page?name=report-demo&id=pdfbuilder)

---

**Need help?** Contact our support team or check out our extensive documentation and video tutorials.