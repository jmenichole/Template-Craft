/**
 * Canva Integration Script for Template-Craft
 * 
 * This script creates a new design in Canva using the Canva Connect API.
 * It demonstrates how to programmatically create designs with the API.
 * 
 * Requirements:
 * - Node.js 18+ (with built-in fetch) OR Node.js < 18 with node-fetch installed
 * - Canva API token with design:content:write scope
 * 
 * Usage:
 *   CANVA_API_TOKEN=your_token node canvaIntegration.js
 * 
 * Note: This script must be run locally or on a backend server.
 *       It cannot execute on GitHub Pages (static hosting).
 */

// Import fetch for Node.js < 18 (optional for Node 18+)
let fetch;
if (globalThis.fetch) {
    // Use built-in fetch (Node 18+)
    fetch = globalThis.fetch;
} else {
    // Fall back to node-fetch for older Node versions
    try {
        fetch = require('node-fetch');
    } catch (e) {
        console.error('Error: fetch is not available. Please upgrade to Node.js 18+ or install node-fetch.');
        process.exit(1);
    }
}

// Configuration
const CANVA_API_BASE_URL = 'https://api.canva.com/rest/v1';
const API_TOKEN = process.env.CANVA_API_TOKEN || process.argv[2];

/**
 * Creates a new design in Canva
 * @param {string} designType - The type of design (e.g., 'doc', 'presentation', 'social')
 * @param {string} title - The title of the design
 * @returns {Promise<object>} The created design object
 */
async function createDesign(designType = 'doc', title = 'Template-Craft Design') {
    if (!API_TOKEN) {
        throw new Error(
            'Canva API token is required. Set CANVA_API_TOKEN environment variable or pass as argument.\n' +
            'Example: CANVA_API_TOKEN=your_token node canvaIntegration.js'
        );
    }

    console.log('🎨 Creating new Canva design...');
    console.log(`   Type: ${designType}`);
    console.log(`   Title: ${title}`);

    try {
        const response = await fetch(`${CANVA_API_BASE_URL}/designs`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                design_type: designType,
                title: title
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `Canva API request failed: ${response.status} ${response.statusText}\n` +
                `Response: ${errorText}`
            );
        }

        const data = await response.json();
        
        console.log('\n✅ Design created successfully!');
        console.log(`   Design ID: ${data.design.id}`);
        
        if (data.design.urls && data.design.urls.edit_url) {
            console.log(`   Edit URL: ${data.design.urls.edit_url}`);
            console.log('\n💡 Open the edit URL in your browser to view and edit the design in Canva.');
        }

        return data;
    } catch (error) {
        console.error('\n❌ Error creating design:', error.message);
        
        if (error.message.includes('401')) {
            console.error('\n🔑 Authentication failed. Please check your API token.');
            console.error('   Make sure your token has the "design:content:write" scope.');
        } else if (error.message.includes('403')) {
            console.error('\n🚫 Permission denied. Please check your API scopes.');
            console.error('   Required scope: design:content:write');
        } else if (error.message.includes('ENOTFOUND') || error.message.includes('network')) {
            console.error('\n🌐 Network error. Please check your internet connection.');
        }
        
        throw error;
    }
}

/**
 * Main execution
 */
async function main() {
    console.log('╔════════════════════════════════════════════╗');
    console.log('║   Template-Craft Canva Integration        ║');
    console.log('╚════════════════════════════════════════════╝\n');

    try {
        // Create a sample design
        // You can modify these parameters to create different types of designs
        const result = await createDesign('doc', 'Template-Craft Generated Design');
        
        console.log('\n📋 Full Response:');
        console.log(JSON.stringify(result, null, 2));
        
    } catch (error) {
        console.error('\n💥 Script failed:', error.message);
        process.exit(1);
    }
}

// Run the script
if (require.main === module) {
    main();
}

// Export for use as a module
module.exports = { createDesign };
