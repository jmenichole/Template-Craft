# Canva Integration Guide

This guide explains how to integrate Template-Craft with the Canva Connect API to programmatically create and manage designs.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running the Integration Script](#running-the-integration-script)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)
- [Advanced Usage](#advanced-usage)

## Overview

The Canva integration allows developers to:
- Programmatically create new designs in Canva
- Specify design types (documents, presentations, social media posts, etc.)
- Get edit URLs to continue working on designs in Canva's editor
- Integrate design creation into automated workflows

**Important:** This integration requires running Node.js code locally or on a backend server. It cannot run on GitHub Pages (static hosting).

## Prerequisites

Before you begin, ensure you have:

1. **Node.js** installed (version 18+ recommended for built-in fetch support)
   - Check your version: `node --version`
   - Download from: https://nodejs.org/

2. **A Canva Developer Account**
   - Sign up at: https://www.canva.com/developers

3. **npm** (comes with Node.js) or **yarn** for package management

## Setup Instructions

### Step 1: Create a Canva Developer App

1. Visit the [Canva Developers Portal](https://www.canva.com/developers)
2. Sign in with your Canva account (or create one)
3. Navigate to **"Your Apps"** or **"Create an App"**
4. Click **"Create an App"** and fill in the required details:
   - **App Name:** Template-Craft Integration (or your preferred name)
   - **Description:** Programmatic design creation for Template-Craft
   - **App Type:** Select the appropriate type for your use case

### Step 2: Configure API Scopes

Your app needs specific permissions to create designs:

1. In your app settings, find the **"Scopes"** or **"Permissions"** section
2. Enable the following scope:
   - ✅ `design:content:write` - Required to create and modify designs

3. Save your changes

### Step 3: Generate an API Token

1. In your app's settings, find the **"API Keys"** or **"Tokens"** section
2. Click **"Generate API Token"** or **"Create Token"**
3. Copy the token immediately and store it securely
   - ⚠️ **Important:** You won't be able to see this token again
   - Store it in a password manager or secure location
   - Never commit tokens to version control

### Step 4: Install Dependencies (Optional)

If you're using Node.js version < 18, install node-fetch:

```bash
npm install node-fetch
```

For Node.js 18+, fetch is built-in, so this step is optional.

### Step 5: Set Up Your API Token

Set your API token as an environment variable:

**On Linux/macOS:**
```bash
export CANVA_API_TOKEN="your_api_token_here"
```

**On Windows (Command Prompt):**
```cmd
set CANVA_API_TOKEN=your_api_token_here
```

**On Windows (PowerShell):**
```powershell
$env:CANVA_API_TOKEN="your_api_token_here"
```

Alternatively, you can pass it directly when running the script (see below).

## Running the Integration Script

### Basic Usage

Run the script with your API token:

```bash
CANVA_API_TOKEN=your_token node canvaIntegration.js
```

Or pass the token as a command-line argument:

```bash
node canvaIntegration.js your_token
```

### Expected Output

When successful, you'll see:

```
╔════════════════════════════════════════════╗
║   Template-Craft Canva Integration        ║
╚════════════════════════════════════════════╝

🎨 Creating new Canva design...
   Type: doc
   Title: Template-Craft Generated Design

✅ Design created successfully!
   Design ID: DAF1234567890
   Edit URL: https://www.canva.com/design/DAF1234567890/edit

💡 Open the edit URL in your browser to view and edit the design in Canva.

📋 Full Response:
{
  "design": {
    "id": "DAF1234567890",
    "title": "Template-Craft Generated Design",
    ...
  }
}
```

### Customizing the Design

You can modify the `canvaIntegration.js` script to create different types of designs:

```javascript
// In the main() function, change the parameters:
const result = await createDesign('presentation', 'My Presentation');
// or
const result = await createDesign('social', 'Social Media Post');
```

Available design types include:
- `doc` - Document
- `presentation` - Presentation
- `social` - Social media post
- `video` - Video design
- `whiteboard` - Whiteboard

## API Reference

### Canva Connect API Endpoint

```
POST https://api.canva.com/rest/v1/designs
```

### Request Headers

```
Authorization: Bearer YOUR_API_TOKEN
Content-Type: application/json
```

### Request Body

```json
{
  "design_type": "doc",
  "title": "My Design Title"
}
```

### Response

```json
{
  "design": {
    "id": "DAF1234567890",
    "title": "My Design Title",
    "urls": {
      "edit_url": "https://www.canva.com/design/DAF1234567890/edit",
      "view_url": "https://www.canva.com/design/DAF1234567890/view"
    },
    "created_at": 1234567890,
    "updated_at": 1234567890
  }
}
```

### Function Reference

#### `createDesign(designType, title)`

Creates a new design in Canva.

**Parameters:**
- `designType` (string): The type of design to create (default: 'doc')
- `title` (string): The title of the design (default: 'Template-Craft Design')

**Returns:**
- Promise<object>: The created design object from Canva API

**Example:**
```javascript
const { createDesign } = require('./canvaIntegration.js');

async function myCustomFunction() {
  const design = await createDesign('presentation', 'Q4 Sales Report');
  console.log('Created design:', design.design.id);
}
```

## Troubleshooting

### Error: "Canva API token is required"

**Solution:** Make sure you've set the `CANVA_API_TOKEN` environment variable or passed it as an argument.

### Error: 401 Unauthorized

**Possible causes:**
- Invalid API token
- Token has expired
- Token was revoked

**Solution:** Generate a new API token from your Canva app settings.

### Error: 403 Forbidden

**Possible causes:**
- Missing required scope (`design:content:write`)
- Account permissions issue

**Solution:** 
1. Check your app's scope settings
2. Regenerate your API token after adding the required scope

### Error: Network/Connection Issues

**Solution:**
- Check your internet connection
- Verify you can access https://api.canva.com
- Check if you're behind a corporate firewall or proxy

### Error: "Cannot find module 'node-fetch'"

**Solution:**
- If using Node.js < 18: `npm install node-fetch`
- If using Node.js 18+: This shouldn't occur (fetch is built-in)

## Advanced Usage

### Using as a Module

You can import and use the integration in your own Node.js applications:

```javascript
const { createDesign } = require('./canvaIntegration.js');

async function batchCreateDesigns() {
  const titles = ['Design 1', 'Design 2', 'Design 3'];
  
  for (const title of titles) {
    try {
      const design = await createDesign('social', title);
      console.log(`Created: ${title} - ${design.design.id}`);
    } catch (error) {
      console.error(`Failed to create ${title}:`, error.message);
    }
  }
}

batchCreateDesigns();
```

### Integrating with Express.js

Create a simple API endpoint to trigger design creation:

```javascript
const express = require('express');
const { createDesign } = require('./canvaIntegration.js');

const app = express();
app.use(express.json());

app.post('/api/create-design', async (req, res) => {
  try {
    const { designType, title } = req.body;
    const result = await createDesign(designType, title);
    res.json({ success: true, design: result.design });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log('API running on port 3000'));
```

### Environment-Specific Configuration

Create a `.env` file for different environments:

```bash
# .env.development
CANVA_API_TOKEN=your_dev_token

# .env.production
CANVA_API_TOKEN=your_prod_token
```

Use with dotenv:

```bash
npm install dotenv
```

```javascript
require('dotenv').config();
const { createDesign } = require('./canvaIntegration.js');
// API_TOKEN will be read from .env file
```

## Additional Resources

- [Canva Developers Documentation](https://www.canva.com/developers/docs)
- [Canva Connect API Reference](https://www.canva.com/developers/docs/connect/api-reference/)
- [Canva API Authentication](https://www.canva.com/developers/docs/connect/authentication/)
- [Template-Craft README](./README.md)

## Support

If you encounter issues:

1. Check this troubleshooting guide
2. Review the [Canva API documentation](https://www.canva.com/developers/docs)
3. Ensure your API token and scopes are correctly configured
4. Open an issue on the Template-Craft repository with details about your problem

---

**Note:** Remember that the Canva integration requires a backend environment to run. It cannot execute in a browser or on GitHub Pages due to security restrictions and the need for server-side execution.
