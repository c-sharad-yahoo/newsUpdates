const http = require('http');

const webhookContent = {
  "title": "Today's General Studies Brief",
  "date": "September 07, 2025",
  "impact_summary": {
    "policy_developments": 4,
    "international_updates": 3,
    "economic_indicators": 4,
    "scientific_advances": 2
  },
  "primary_focus": {
    "title": "GST 2.0 Reform Package - Transformational Tax Restructuring",
    "summary": "The 56th GST Council meeting on September 3, 2025, approved comprehensive GST reforms dubbed 'GST 2.0,' introducing a simplified two-rate structure with standard 18% and merit rate of 5%, effective from September 22, 2025. This represents the most significant tax reform since GST implementation in 2017.",
    "content": "Union Finance Minister Nirmala Sitharaman announced these reforms as a 'next-generation' initiative, moving away from the current complex multi-tier structure toward global best practices. The new framework streamlines rates, harmonizes classifications, and clarifies tax rules to address long-standing business concerns about complexity and unpredictability. Only select items will remain in the 40% bracket, significantly simplifying compliance procedures for businesses across sectors.\n\nThis reform promises to boost business confidence and reduce compliance costs. Politically, it demonstrates federal cooperation through consensus-building in the GST Council. Socially, simplified taxation could translate to better price stability for consumers through reduced administrative overhead.",
    "key_terms": ["GST Council", "Two-rate structure", "Merit goods", "Harmonization", "Federal taxation"],
    "exam_relevance": "This connects directly to Public Finance topics in Economics, Constitutional provisions under Article 246A (GST), and the evolution of India's federal taxation system. Students should understand the GST Council's constitutional status as a federal body under Article 279A."
  },
  "sections": [
    {
      "id": "governance",
      "title": "Governance and Policy Updates",
      "summary": "Major policy developments affecting governance structures and administrative reforms across sectors",
      "articles": [
        {
          "title": "Immigration and Foreigners Act, 2025 Implementation",
          "summary": "Comprehensive immigration framework modernizes entry procedures and strengthens border security",
          "content": "The Immigration and Foreigners Act, 2025, recently came into force, replacing four outdated laws and comprehensively overhauling India's immigration system. This legislation modernizes entry, stay, and exit procedures for foreign nationals while strengthening border security mechanisms. The new framework addresses contemporary security challenges while facilitating legitimate travel and business activities. It introduces digital processing systems, streamlined visa procedures, and enhanced monitoring capabilities for foreign nationals residing in India.",
          "key_terms": ["Immigration Act 2025", "Border security", "Digital processing", "Visa modernization"],
          "citations": [2]
        },
        {
          "title": "Pension System Transformation Deadline",
          "summary": "Central employees have until September 30 to switch from NPS to UPS",
          "content": "Central government employees have until September 30, 2025, to switch from the National Pension System (NPS) to the newly introduced Unified Pension Scheme (UPS). The deadline was extended from June due to initial low response rates from eligible employees. This transition affects millions of central government employees and represents a significant shift in India's pension policy, moving toward assured pension benefits while maintaining fiscal sustainability. The UPS promises better retirement security compared to market-linked NPS returns.",
          "key_terms": ["UPS", "NPS", "Pension reform", "Assured benefits", "Fiscal sustainability"],
          "citations": [3, 5]
        }
      ]
    },
    {
      "id": "international",
      "title": "International Affairs and Global Context",
      "summary": "Strategic developments in India's foreign policy and global diplomatic engagement",
      "articles": [
        {
          "title": "India's Strategic Autonomy in Multipolar World Order",
          "summary": "India navigates complex geopolitical relationships while maintaining independent foreign policy",
          "content": "India continues to navigate complex geopolitical relationships, maintaining strategic partnerships with both Western allies and traditional partners like Russia while building leadership in the Global South. Recent diplomatic engagements demonstrate India's multi-alignment policy amid intensifying US-China rivalry. This strategy involves diversified defense procurement, balanced energy partnerships, and independent positions on global conflicts including Ukraine and Gaza. As global power dynamics shift toward multipolarity, India's position as a bridge between competing blocs enhances its strategic value while requiring careful calibration of relationships.",
          "key_terms": ["Strategic autonomy", "Multi-alignment", "Global South", "Multipolar world", "Diplomatic balance"],
          "citations": [6]
        },
        {
          "title": "BRICS Virtual Summit and Mauritius State Visit",
          "summary": "External Affairs Minister participates in BRICS meeting while strengthening Indian Ocean partnerships",
          "content": "External Affairs Minister will participate in the BRICS virtual meeting on September 8, 2025, under Brazilian chairmanship, while Mauritius Prime Minister Dr. Navinchandra Ramgoolam undertakes a state visit to India from September 9-16, 2025. These engagements reinforce India's commitment to South-South cooperation through BRICS while strengthening strategic partnerships in the Indian Ocean region. Mauritius remains crucial for India's maritime security and economic interests in the southwestern Indian Ocean.",
          "key_terms": ["BRICS", "South-South cooperation", "Indian Ocean", "Maritime security", "Strategic partnerships"],
          "citations": [14]
        }
      ]
    },
    {
      "id": "economic",
      "title": "Economic and Financial Intelligence",
      "summary": "Key economic indicators and policy developments affecting India's growth trajectory",
      "articles": [
        {
          "title": "Services Sector Achieves 15-Year Growth High",
          "summary": "India's services PMI surged to 62.9, marking fastest growth in 15 years",
          "content": "India's services PMI surged to 62.9 in August 2025, marking the fastest growth in 15 years and pushing the composite PMI to a 17-year high. This reinforces India's robust 7.8% GDP growth in Q1 FY26, demonstrating economic resilience despite global uncertainties. The services boom reflects strong domestic demand, digital transformation acceleration, and India's growing share in global services trade. This growth spans across IT services, financial services, logistics, and professional services sectors.",
          "key_terms": ["Services PMI", "GDP growth", "Digital transformation", "Economic resilience", "Global services trade"],
          "citations": [7]
        },
        {
          "title": "Critical Minerals Recycling Initiative",
          "summary": "Cabinet approves Rs. 1,500 crore scheme for critical mineral recovery from e-waste",
          "content": "The Union Cabinet approved a Rs. 1,500 crore scheme to promote critical mineral recycling from e-waste and batteries, targeting 40 kilotonnes of mineral recovery and creating 70,000 jobs. This initiative addresses India's strategic mineral dependencies while promoting circular economy principles. The scheme reduces import dependence on critical minerals essential for renewable energy, electronics, and defense applications. It creates new industrial clusters while addressing environmental challenges from electronic waste accumulation.",
          "key_terms": ["Critical minerals", "Circular economy", "E-waste recycling", "Strategic autonomy", "Green jobs"],
          "citations": [7]
        }
      ]
    }
  ],
  "rapid_updates": [
    {
      "category": "Technology Innovation",
      "content": "OpenAI announced GPT-5 with breakthrough reasoning capabilities, sparking new AI safety discussions and regulatory considerations globally",
      "citations": [1]
    },
    {
      "category": "Health Milestone",
      "content": "WHO declared malaria eliminated from three more countries, bringing the total to 45 malaria-free nations and demonstrating progress in global health initiatives",
      "citations": [2]
    },
    {
      "category": "Economic Data",
      "content": "Global inflation averaged 2.8% in Q3, the lowest since 2021, signaling monetary policy success across major economies",
      "citations": [3]
    },
    {
      "category": "Space Technology",
      "content": "NASA's OSIRIS-REx mission successfully extracted rare earth elements from asteroid Bennu, proving commercial viability of space mining",
      "citations": [4]
    },
    {
      "category": "Trade Development",
      "content": "African Continental Free Trade Area showed early success with 15% increase in intra-African trade and 40% reduction in border delays",
      "citations": [5]
    }
  ]
};

const data = JSON.stringify({
  content: webhookContent,
  secret: process.env.WEBHOOK_SECRET || 'development-secret'
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

console.log('🚀 Sending General Studies Brief webhook...');

const req = http.request(options, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(responseData);
      console.log('✅ Webhook sent successfully!');
      console.log('📄 Article created:', result.article?.title);
      console.log('📅 Date:', result.article?.date);
      console.log('🏷️ Category:', result.article?.category);
      console.log('🆔 ID:', result.article?.id);
    } catch (error) {
      console.log('📝 Response:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Webhook failed:', error.message);
  console.log('💡 Make sure the server is running on port 3001');
});

req.write(data);
req.end();