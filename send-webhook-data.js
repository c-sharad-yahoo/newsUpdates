const https = require('https');
const http = require('http');

const testContent = `# 📰 Today's World: 5-Minute Brief
*September 7, 2025 | Your Global Update*

**📊 TODAY'S IMPACT TRACKER**
*Major Developments: 2 | Key Updates: 3 | Trend Watchers: 3*

---

## 🔥 HEADLINE STORY: India Unveils Revolutionary Agricultural Marketing Framework

**What Happened:** India launched its comprehensive National Policy Framework on Agricultural Marketing, targeting direct farmer-to-consumer connections and eliminating traditional middlemen structures[5][19].

**The Background:** The policy strengthens Farmer Producer Organizations (FPOs) and expands the e-National Agriculture Market (e-NAM) platform to create unified digital marketplaces. This builds on earlier APMC reforms while addressing persistent issues of price manipulation and limited market access that have affected over 600 million Indian farmers.

**Why This Matters:** This represents the largest agricultural market reform since independence, potentially doubling farmer incomes by 2030 through direct pricing mechanisms and reduced post-harvest losses.

**Knowledge Connect:** Links to microeconomics concepts of market structures, supply chain optimization, and digital governance models that eliminate information asymmetries.

**Think Deeper:** Consider how removing intermediaries affects employment in rural areas while improving farmer welfare - a classic example of creative destruction in economic development.

**Global Perspective:** Similar digital agriculture platforms in Brazil and Kenya have increased farmer incomes by 15-25%, making this a tested model for developing economies.

**Key Concepts:** e-NAM platform, FPOs, contract farming, price discovery mechanisms, post-harvest infrastructure

---

## ⚡ MAJOR UPDATES

### UN General Assembly 2025: AI Governance Takes Center Stage

**The Development:** The UN launched its Global Dialogue on Artificial Intelligence Governance during High-Level Week 2025, establishing the first international framework for AI regulation and ethical standards[6][13]. Germany's Foreign Minister Baerbock, serving as Assembly President, announced the UN80 Initiative for comprehensive organizational reform.

**The Significance:** This marks the transition from national AI policies to coordinated global governance, addressing concerns about AI's impact on employment, privacy, and international security. The framework will influence how 193 member nations regulate AI development and deployment.

**Learning Bridge:** Connects to international relations theory, particularly how global governance evolves to address technological disruption and the balance between national sovereignty and collective action.

**Multiple Angles:** While developed nations push for strict regulations, developing countries worry about limiting their AI advancement opportunities, creating a classic North-South development divide.

### Global Economic Outlook: Cautious Growth Amid Uncertainty

**The Development:** The IMF revised global growth projections to 3.0% for 2025 and 3.1% for 2026, citing improved financial conditions but warning of persistent inflation risks in major economies[8][15]. The revision reflects "tenuous resilience" amid trade policy uncertainties and geopolitical tensions.

**The Significance:** This moderate growth rate falls below historical averages, indicating structural economic challenges including aging populations, reduced productivity growth, and climate adaptation costs affecting long-term prosperity.

**Learning Bridge:** Illustrates macroeconomic concepts of growth drivers, inflation dynamics, and how monetary policy decisions by central banks influence global economic performance.

**Multiple Angles:** While some regions benefit from fiscal expansion and lower tariffs, others face headwinds from policy uncertainty and supply chain disruptions, showcasing economic interdependence.

---

## 📚 KNOWLEDGE BUILDERS

### Social Justice Movement Gains Momentum in India

**The Update:** The Ministry of Social Justice and Empowerment launched "Samajik Nyaya Charcha 2025," bringing together policymakers and grassroots organizations to address equity challenges[9]. The initiative focuses on expanding access to justice, education, and welfare for marginalized communities.

**Broader Context:** This reflects India's growing recognition that economic growth must be accompanied by social inclusion to achieve sustainable development goals and reduce inequality gaps that have widened during rapid urbanization.

**Academic Connection:** Links to sociology, political science, and development studies concepts about social movements, inclusive governance, and the role of civil society in democratic processes.

### Climate Adaptation Policies: Building Resilient Futures

**The Update:** The OECD released comprehensive guidelines for climate adaptation policymaking, emphasizing four-step iterative processes including risk assessment, policy design, implementation, and evaluation[10]. The framework addresses growing urgency as global temperatures approach 1.5°C above pre-industrial levels.

**Broader Context:** With extreme weather events increasing globally, adaptation policies are shifting from reactive disaster response to proactive resilience building, requiring unprecedented coordination across government levels and sectors.

**Academic Connection:** Integrates environmental science, public policy, and economics concepts about externalities, risk management, and intergenerational equity in resource allocation.

---

## ⚡ QUICK INTEL
• **Technology** – Advanced NLP models in 2025 achieve near-human language processing, revolutionizing voice assistants and automated translation services[7][14]
• **Urban Development** – India's smart cities program expands with Indore, Ahmedabad, and Pune leading digital governance integration and sustainable infrastructure[11]
• **Global Health** – WHO focuses on conflict-related health threats at UN Assembly, addressing humanitarian crises' impact on global health security[20]

---

## 🧠 TODAY'S KNOWLEDGE TOOLKIT

**New Concepts Learned:** 
- **e-NAM Platform**: Digital marketplace connecting farmers directly to buyers across India, eliminating geographical barriers and price manipulation
- **FPOs (Farmer Producer Organizations)**: Collective institutions that give small farmers bargaining power and economies of scale
- **Climate Risk Assessment**: Systematic evaluation of climate threats to inform adaptation strategies and resource allocation

**Knowledge Reinforcement:** Today's agricultural reforms demonstrate how technology can address market failures - a core economics principle. The UN's AI governance initiative shows how international cooperation evolves to manage technological change, while climate adaptation policies illustrate the precautionary principle in environmental management.

**Discussion Ammunition:** "Digital platforms are democratizing market access, but what happens to traditional employment in agriculture?" "Can international organizations effectively regulate rapidly evolving AI technology?" "How do we balance economic growth with environmental sustainability?"

**Fast Facts:** India has 146 million agricultural holdings; global AI market expected to reach $1.8 trillion by 2030; climate adaptation requires $140-300 billion annually by 2030.

## 🔗 THE CONNECTION WEB
*Agricultural digitization in India mirrors global trends toward platform economies, while AI governance discussions reflect concerns about technological sovereignty. Climate adaptation policies increasingly influence economic development strategies, showing how environmental and economic policies are converging.*

*Historical parallel: Just as the Green Revolution transformed Indian agriculture in the 1960s through technology adoption, today's digital revolution aims to transform agricultural marketing through connectivity and data.*

---

## 🎯 THIS WEEK'S THINKING CHALLENGE

1. **Evaluation** – Analyze whether removing agricultural intermediaries will benefit all stakeholders or create new forms of inequality
2. **Comparative Analysis** – Compare India's digital agriculture approach with successful models in other developing economies
3. **Trend Prediction** – How might AI governance frameworks evolve as technology advances faster than regulatory capabilities?

---

🌍 **Understanding today's developments builds the knowledge needed for informed citizenship and thoughtful leadership. Stay curious, stay engaged!** ✨`;

async function sendWebhookData() {
  const data = JSON.stringify({
    content: testContent,
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

  return new Promise((resolve, reject) => {
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
          resolve(result);
        } catch (error) {
          console.log('Response:', responseData);
          resolve(responseData);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Webhook failed:', error.message);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

// Wait a moment for server to start, then send the webhook
setTimeout(async () => {
  try {
    await sendWebhookData();
  } catch (error) {
    console.error('Failed to send webhook:', error);
  }
}, 2000);