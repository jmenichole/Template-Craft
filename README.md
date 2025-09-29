# PDF Builder - Dynamic PDF Templates for Bubble

A powerful PDF generation plugin for Bubble developers that creates dynamic, professional PDF templates with seamless database integration.

## 🚀 Why PDF Builder is Better Than Bubble's Native PDF Generation

- **Dynamic Data Binding**: Seamlessly integrate with your Bubble database
- **Professional Templates**: Pre-built templates for invoices, reports, certificates, and more
- **Custom Styling**: Full control over colors, fonts, and layouts
- **Header/Footer Support**: Dynamic headers and footers with page numbering
- **API Integration**: Simple REST API for generating PDFs from your Bubble app
- **No Design Skills Required**: Professional layouts built-in
- **Unlimited Customization**: Create custom templates for any use case

## 📋 Template Types

### Business Documents
- **Invoices**: Professional invoicing with line items and calculations
- **Receipts**: Clean receipt layouts with company branding
- **Contracts**: Legal document templates with signature areas
- **Proposals**: Business proposal templates with cover pages

### Reports & Analytics
- **Business Reports**: Data-driven reports with charts and tables
- **Statements**: Financial statements and account summaries
- **Certificates**: Awards, completion certificates, and credentials

### Marketing Materials
- **Brochures**: Product catalogs and marketing brochures
- **Product Catalogs**: Multi-page product listings

## 🔧 Bubble Integration

### Simple API Call
```javascript
// Call from your Bubble workflow
POST /api/generate-pdf
{
  "template_id": "your-template-id",
  "data": {
    "customer_name": "{{Current User's Name}}",
    "amount": "{{Invoice's Total}}",
    "items": "{{Invoice's Line Items}}"
  }
}
```

### Features for Bubble Developers
- **Merge Fields**: Use `{{field_name}}` syntax for dynamic content
- **Database Integration**: Pull data directly from your Bubble database
- **File Management**: Generated PDFs stored and accessible via URL
- **Workflow Actions**: Trigger PDF generation from any Bubble workflow
- **Custom Fields**: Map any database field to PDF template

## 🎨 Customization Options

### Page Configuration
- Multiple page formats (A4, Letter, Legal, A3, Custom)
- Portrait or landscape orientation
- Custom margins and spacing

### Styling Options
- Professional color schemes
- Custom brand colors
- Font selection (Sans-serif, Serif, Monospace)
- Layout styles (Standard, Compact, Spacious, Creative)

### Dynamic Content
- **Company Information**: Logo, name, address, contact details
- **Customer Data**: Names, addresses, custom fields
- **Line Items**: Dynamic tables for products, services, transactions
- **Calculations**: Automatic totals, taxes, discounts

### Headers & Footers
- Dynamic headers with company info and document type
- Page numbering and total pages
- Custom footer text and branding
- Date/time stamps

## 🛠️ How to Use

1. **Create Template**: Use the builder to design your PDF template
2. **Configure Data Fields**: Define which Bubble database fields to include
3. **Set Styling**: Choose colors, fonts, and layout options
4. **Test & Preview**: Generate test PDFs to verify layout
5. **Integrate**: Use the provided API code in your Bubble workflows
6. **Generate**: PDFs are created automatically with live data

## 📁 Technical Features

- **Fast Generation**: Optimized PDF creation engine
- **Cloud Storage**: Generated PDFs stored securely
- **Base64 Support**: Embed PDFs directly in your app
- **URL Access**: Direct links for downloading or viewing
- **Batch Processing**: Generate multiple PDFs efficiently
- **Version Control**: Template versioning and backup

## 🎯 Perfect For

- **SaaS Applications**: Automated invoice and report generation
- **E-commerce**: Receipts, shipping labels, product catalogs
- **Educational Platforms**: Certificates, transcripts, course materials
- **Professional Services**: Contracts, proposals, client reports
- **Healthcare**: Patient reports, prescriptions, forms
- **Real Estate**: Property reports, contracts, disclosures

## 🚀 Getting Started

1. Open the PDF Builder interface
2. Select your template type (Invoice, Report, Certificate, etc.)
3. Configure page settings and styling
4. Define your dynamic data fields
5. Set up headers and footers
6. Preview and test your template
7. Download the configuration file
8. Integrate with your Bubble app using the provided API code

## 💡 Advanced Features

- **Conditional Content**: Show/hide sections based on data
- **Dynamic Tables**: Automatically resize tables based on data
- **Image Support**: Include logos, signatures, and photos
- **Multi-page Documents**: Automatic page breaks and numbering
- **Custom Fonts**: Upload and use custom brand fonts
- **Watermarks**: Add security watermarks or draft stamps

---

**Transform your Bubble app with professional PDF generation. No more struggling with Bubble's limited PDF options - create beautiful, dynamic documents that represent your brand professionally.**