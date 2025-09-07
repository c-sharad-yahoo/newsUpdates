const https = require('https');

const testContent = {
  "title": "Today's General Studies Brief",
  "date": "September 7, 2025",
  "impact_summary": {
    "policy_developments": 3,
    "international_updates": 2,
    "economic_indicators": 2,
    "scientific_advances": 1
  },
  "primary_focus": {
    "title": "GST 2.0 Reform Package - Transformational Tax Restructuring",
    "summary": "The 56th GST Council meeting approved comprehensive GST reforms dubbed 'GST 2.0,' introducing a simplified two-rate structure with standard 18% and merit rate of 5%, effective from September 22, 2025. This represents the most significant tax reform since GST implementation in 2017.",
    "content": "Union Finance Minister Nirmala Sitharaman announced these reforms as a 'next-generation' initiative, moving away from the current complex multi-tier structure toward global best practices. The new framework streamlines rates, harmonizes classifications, and clarifies tax rules to address long-standing business concerns about complexity and unpredictability. Only select items will remain in the 40% bracket, significantly simplifying compliance procedures for businesses across sectors.",
    "key_terms": ["GST Council", "Two-rate structure", "Merit goods", "Harmonization", "Tax rationalization"],
    "exam_relevance": "This connects directly to Public Finance topics in Economics, Constitutional provisions under Article 246A (GST), and the evolution of India's federal taxation system. Students should understand the GST Council's constitutional status as a federal body under Article 279A."
  },
  "sections": [
    {
      "id": "governance",
      "title": "Governance and Policy Updates",
      "summary": "Key policy developments affecting governance structures and administrative reforms",
      "articles": [
        {
          "title": "Immigration and Foreigners Act, 2025 Implementation",
          "summary": "New comprehensive immigration framework replacing four outdated laws",
          "content": "The Immigration and Foreigners Act, 2025, recently came into force, replacing four outdated laws and comprehensively overhauling India's immigration system. This legislation modernizes entry, stay, and exit procedures for foreign nationals while strengthening border security mechanisms. The new framework addresses contemporary security challenges while facilitating legitimate travel and business activities.",
          "key_terms": ["Immigration Act 2025", "Border security", "Digital processing", "Visa procedures"],
          "citations": [2]
        },
        {
          "title": "Pension System Transformation Deadline",
          "summary": "Central government employees deadline for UPS transition extended",
          "content": "Central government employees have until September 30, 2025, to switch from the National Pension System (NPS) to the newly introduced Unified Pension Scheme (UPS). The deadline was extended from June due to initial low response rates from eligible employees. This transition affects millions of central government employees and represents a significant shift in India's pension policy.",
          "key_terms": ["UPS", "NPS", "Pension reform", "Government employees"],
          "citations": [3, 5]
        }
      ]
    },
    {
      "id": "international",
      "title": "International Affairs and Global Context",
      "summary": "Global developments and India's strategic positioning in international relations",
      "articles": [
        {
          "title": "India's Strategic Autonomy in Multipolar World Order",
          "summary": "India maintains balanced relationships amid US-China rivalry",
          "content": "India continues to navigate complex geopolitical relationships, maintaining strategic partnerships with both Western allies and traditional partners like Russia while building leadership in the Global South. Recent diplomatic engagements demonstrate India's multi-alignment policy amid intensifying US-China rivalry. This strategy involves diversified defense procurement, balanced energy partnerships, and independent positions on global conflicts.",
          "key_terms": ["Strategic autonomy", "Multi-alignment", "Global South", "Geopolitical balance"],
          "citations": [6]
        }
      ]
    }
  ],
  "rapid_updates": [
    {
      "category": "Economic Development",
      "content": "India-EFTA trade agreement takes effect October 1, 2025, promising $100 billion investments and one million jobs while reducing tariffs on key goods",
      "citations": [7]
    },
    {
      "category": "Administrative Reform",
      "content": "Registered Post services merged with Speed Post from September 1, 2025, streamlining India Post operations and improving delivery efficiency",
      "citations": [3]
    },
    {
      "category": "Environment",
      "content": "Climate Risk Index 2025 ranks India sixth globally among most affected countries with economic losses exceeding $180 billion from climate disasters (1993-2022)",
      "citations": [18]
    }
  ]
};

async function testWebhook() {
  const data = JSON.stringify({
    content: testContent,
    secret: process.env.WEBHOOK_SECRET || 'test-secret'
  });

  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/webhook/daily-update',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  try {
    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        console.log('Webhook test result:', JSON.parse(responseData));
      });
    });

    req.on('error', (error) => {
      console.error('Webhook test failed:', error);
    });

    req.write(data);
    req.end();
  } catch (error) {
    console.error('Webhook test failed:', error);
  }
}

testWebhook();