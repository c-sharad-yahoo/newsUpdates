const https = require('https');

const testContent = `# 📰 Today's World: 5-Minute Brief
*${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} | Your Global Update*

**📊 TODAY'S IMPACT TRACKER**  
*Major Developments: 2 | Key Updates: 3 | Trend Watchers: 3*

---

## 🔥 HEADLINE STORY: Global Climate Summit Reaches Historic Agreement
**What Happened**: World leaders at COP30 in Dubai reached a breakthrough agreement on carbon pricing mechanisms, with 195 countries committing to unified standards by 2027.  
**The Background**: After years of fragmented approaches, the summit established a global carbon credit system with transparent monitoring and verification protocols.  
**Why This Matters**: The agreement creates the world's first truly global carbon market, potentially mobilizing $2 trillion annually for climate action while ensuring developing nations receive fair compensation.  
**Knowledge Connect**: Ties to *environmental economics*, *international cooperation theory* and *sustainable development goals*.  
**Think Deeper**: How do global agreements balance national sovereignty with collective action needs?  
**Global Perspective**: Critics worry about implementation challenges and the risk of carbon colonialism in developing nations.  
**Key Concepts**: *Carbon pricing*, *climate finance*, *technology transfer*, *green transition*, *environmental justice*.

---

## ⚡ MAJOR UPDATES
### European Union Launches Digital Euro Pilot Program  
**The Development**: The ECB initiated a 12-month pilot program for the digital euro across six member states, testing retail and wholesale applications.  
**The Significance**: Represents Europe's most significant monetary innovation since the euro's introduction, potentially reshaping global digital currency standards.  
**Learning Bridge**: Demonstrates *central bank digital currencies (CBDCs)*, *monetary sovereignty* and *financial inclusion* concepts.  
**Multiple Angles**: Privacy advocates raise concerns about surveillance while economists debate impacts on commercial banking.

### India Achieves 50% Renewable Energy Milestone  
**The Development**: India's renewable energy capacity reached 200 GW, fulfilling its 2030 target five years early, driven by solar and wind expansion.  
**The Significance**: Positions India as a global clean energy leader while reducing import dependence and creating 2.3 million green jobs.  
**Learning Bridge**: Case study in *energy transition*, *industrial policy* and *sustainable development* strategies.  
**Multiple Angles**: Success highlights policy consistency benefits while raising questions about grid stability and storage needs.

---

## 📚 KNOWLEDGE BUILDERS
### Space Technology Breakthrough in Asteroid Mining  
**The Update**: NASA's OSIRIS-REx mission successfully extracted rare earth elements from asteroid Bennu, proving commercial viability of space mining.  
**Broader Context**: Opens new frontiers in *resource economics* and *space commercialization*, potentially solving Earth's critical mineral shortages.  
**Academic Connection**: Crosses *physics* (orbital mechanics), *economics* (resource scarcity) and *international law* (space governance).

### African Continental Free Trade Area Shows Early Success  
**The Update**: Intra-African trade increased 15% in the first quarter, with simplified customs procedures reducing border delays by 40%.  
**Broader Context**: Demonstrates *regional integration* benefits and *trade creation* effects in developing economies.  
**Academic Connection**: Links to *development economics*, *trade theory* and *regional cooperation* frameworks.

---

## ⚡ QUICK INTEL
• **Tech Innovation** – OpenAI announced GPT-5 with breakthrough reasoning capabilities, sparking new AI safety discussions.  
• **Health Milestone** – WHO declared malaria eliminated from three more countries, bringing the total to 45 malaria-free nations.  
• **Economic Data** – Global inflation averaged 2.8% in Q3, the lowest since 2021, signaling monetary policy success.

---

## 🧠 TODAY'S KNOWLEDGE TOOLKIT
**New Concepts Learned**:  
• *Carbon border adjustments* – Tariffs on high-carbon imports to protect domestic climate policies.  
• *Digital currency interoperability* – Technical standards enabling cross-border CBDC transactions.  
• *Space resource rights* – Legal frameworks governing asteroid mining and lunar resource extraction.

**Knowledge Reinforcement**: Shows how environmental policy, monetary innovation, and space technology intersect in shaping future economic systems.

**Discussion Ammunition**:  
• "Can global carbon pricing avoid creating new forms of economic inequality?"  
• "Digital currencies vs privacy: where should societies draw the line?"

**Fast Facts**:  
• 195 countries committed to unified carbon standards.  
• Digital euro pilot covers 67 million citizens.  
• Space mining could supply 90% of rare earth demand by 2040.

---

## 🔗 THE CONNECTION WEB
*Climate agreements and digital currencies both require unprecedented global coordination, testing multilateral institutions' effectiveness.*  
*India's renewable success and Africa's trade growth demonstrate how developing nations can leapfrog traditional development paths.*  
*Historical parallel*: Today's space mining rush echoes 19th-century resource discoveries, but with global governance frameworks in place.*  
*Looking ahead*: Climate finance flows may increasingly use digital currencies, creating new monetary-environmental policy linkages.*

---

## 🎯 THIS WEEK'S THINKING CHALLENGE
1. **Policy Analysis** – Design a carbon pricing mechanism that balances environmental effectiveness with economic equity across developed and developing nations.  
2. **Technology Assessment** – Evaluate the trade-offs between CBDC benefits (financial inclusion, policy effectiveness) and risks (privacy, banking disruption).  
3. **Future Scenario** – Project how space resource extraction might reshape global supply chains and geopolitical power balances by 2040.

---

🌍 **Understanding today's developments builds the knowledge needed for informed citizenship and thoughtful leadership. Stay curious, stay engaged!** ✨`;

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