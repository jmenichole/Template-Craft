# Template-Craft

A comprehensive web application for content creators to generate custom templates, social media images, banners, logos, and marketing materials tailored to their brand.

## 🚀 Quick Start

Template-Craft offers two modes depending on your technical expertise:

### 🎨 **For Non-Developers**
If you're looking for a simple, no-code solution:
1. Visit the [landing page](index.html)
2. Click **"I'm Not a Developer"**
3. Fill out the template form
4. Generate AI-powered design concepts instantly

### 💻 **For Developers**
If you want to integrate with Canva API:
1. Visit the [landing page](index.html)
2. Click **"I'm a Developer"**
3. Follow the setup instructions to use the Canva Connect API
4. See [CANVA_INTEGRATION.md](CANVA_INTEGRATION.md) for detailed documentation

## Features

### Template Types
- **Social Media**: Posts and stories for Instagram, Facebook, Twitter/X, etc.
- **Marketing Materials**: Banners, flyers, business cards
- **Branding**: Logo designs and brand assets
- **Digital Content**: Infographics, presentations, email signatures
- **Web Assets**: Website templates and headers

### Brand Customization
- **Brand Identity**: Specify brand name and colors
- **Style Preferences**: Choose from 8 different design styles (Modern, Professional, Creative, Minimalist, etc.)
- **Target Platform**: Optimize for specific social media platforms or use cases
- **Custom Dimensions**: Flexible sizing options with preset dimensions or custom measurements

### Design Specifications
- **Target Audience**: Define your audience for tailored design choices
- **Mood & Feeling**: Select from 8 different moods (Professional, Friendly, Energetic, etc.)
- **Content Integration**: Include your text content directly in the template request
- **Additional Requirements**: Detailed notes and specific requirements

## How to Use

### Non-Developer Mode (Simple Form)
1. **Select Template Type**: Choose from 11+ template categories
2. **Enter Brand Information**: Provide your brand name, colors, and style preferences
3. **Specify Content Details**: Select target platform and dimensions
4. **Define Design Preferences**: Set target audience, mood, and include any text content
5. **Generate AI Template Ideas**: Click the AI-powered button to generate 3 unique, detailed template design concepts

### Developer Mode (Canva API Integration)
1. **Set Up Canva Developer Account**: Create an app at [Canva Developers Portal](https://www.canva.com/developers)
2. **Install Dependencies**: `npm install node-fetch` (for Node.js < 18)
3. **Configure API Token**: Set your token with required `design:content:write` scope
4. **Run Integration Script**: `CANVA_API_TOKEN=your_token node canvaIntegration.js`
5. **Create Designs Programmatically**: Use the script to automate design creation

See [CANVA_INTEGRATION.md](CANVA_INTEGRATION.md) for complete developer documentation.

## Technical Features

- **AI-Powered Template Generation**: Generates 3 unique, detailed template design concepts using OpenAI's GPT-3.5
- **Responsive Design**: Works on desktop and mobile devices
- **Dynamic Form Fields**: Custom dimensions field appears when needed
- **Form Validation**: User-friendly error messages and required field validation
- **Professional Styling**: Clean, modern interface with organized sections
- **Comprehensive AI Analysis**: Detailed recommendations for layout, color, typography, and visual elements
- **Secure API Integration**: Uses user-provided OpenAI API keys stored locally in the browser

## Getting Started

### Prerequisites
To use the AI-powered template generation feature, you'll need an OpenAI API key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys).

### Running the Application
Simply open `index.html` in your web browser or serve it via a local web server:

```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Using AI Template Generation
1. Fill out the template requirements form
2. Click "🤖 Generate AI Template Ideas"
3. Enter your OpenAI API key when prompted (stored locally in your browser)
4. Receive 3 detailed, unique template design concepts tailored to your specifications

## 📋 Navigation Guide

- **[index.html](index.html)** - Landing page with developer/non-developer selection
- **[non-dev.html](non-dev.html)** - Template generation form (no coding required)
- **[dev.html](dev.html)** - Developer documentation and Canva API integration guide
- **[canvaIntegration.js](canvaIntegration.js)** - Node.js script for Canva API integration
- **[CANVA_INTEGRATION.md](CANVA_INTEGRATION.md)** - Complete Canva integration documentation

## ⚠️ Important Notes

### GitHub Pages Limitations
- GitHub Pages is a **static hosting service** and can only serve HTML, CSS, and client-side JavaScript
- The Canva integration script (`canvaIntegration.js`) **cannot run on GitHub Pages**
- To use the Canva API integration, you must:
  - Run the script locally on your machine, OR
  - Deploy it to a backend server that supports Node.js (e.g., Heroku, AWS, Google Cloud)

### Two Modes of Operation
1. **Non-Developer Mode**: Works entirely in the browser using OpenAI API for design suggestions
2. **Developer Mode**: Requires local/server execution to create actual designs in Canva via API

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📄 License

See [LICENSE](LICENSE) file for details.

---

Perfect for content creators, marketers, small businesses, and anyone needing custom visual assets for their brand!