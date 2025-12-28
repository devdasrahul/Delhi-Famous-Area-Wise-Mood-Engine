import { ContextLoader } from './contextLoader.js';

export class DelhiLocalAI {
  constructor() {
    this.contextLoader = new ContextLoader();
    this.currentTime = new Date();
  }

  async processQuery(query, selectedArea = null) {
    const lowerQuery = query.toLowerCase();

    // Check if it's a slang translation request
    if (this.isSlangQuery(lowerQuery)) {
      return this.handleSlangQuery(query);
    }

    // Check if it's an area-specific query
    if (selectedArea || this.containsAreaName(lowerQuery)) {
      const area = selectedArea || this.extractAreaName(lowerQuery);
      return this.handleAreaQuery(query, area);
    }

    // Check if it's a festival query
    if (this.isFestivalQuery(lowerQuery)) {
      return this.handleFestivalQuery(query);
    }

    // Check if it's a food recommendation
    if (this.isFoodQuery(lowerQuery)) {
      return this.handleFoodQuery(query, selectedArea);
    }

    // Check if it's a metro route query
    if (this.isMetroRouteQuery(lowerQuery)) {
      return this.handleMetroRouteQuery(lowerQuery);
    }

    // Check if it's a traffic/transport query
    if (this.isTrafficQuery(lowerQuery)) {
      return this.handleTrafficQuery(query);
    }

    // General Delhi lifestyle query
    return this.handleGeneralQuery(query);
  }

  isMetroRouteQuery(query) {
    const q = query.toLowerCase();
    return q.includes('metro') || (q.includes('from') && q.includes('to'));
  }

  handleMetroRouteQuery(query) {
    const areas = this.contextLoader.getAllAreas();
    const q = query.toLowerCase();

    // 1. Precise Regex Extraction
    // Matches "from <area> to <area>"
    let source = null;
    let dest = null;

    // Try finding areas that match the query string
    // Sort areas by length (descending) to match longer names first (e.g. "Connaught Place" vs "Place")
    const sortedAreas = [...areas].sort((a, b) => b.length - a.length);

    // Identify Source
    for (const area of sortedAreas) {
      if (q.includes(`from ${area.toLowerCase()}`) || q.includes(`start ${area.toLowerCase()}`)) {
        source = area;
        break; // Match found
      }
    }

    // Identify Destination
    for (const area of sortedAreas) {
      if (q.includes(`to ${area.toLowerCase()}`)) {
        dest = area;
        break;
      }
    }

    // 2. Fallback: Just look for mention of two areas if explicit from/to logic fails
    if (!source || !dest) {
      const mentions = sortedAreas.filter(a => q.includes(a.toLowerCase()) || q.includes(a.split(' ')[0].toLowerCase()));
      // Filter unique mentions
      const uniqueMentions = [...new Set(mentions)];

      if (uniqueMentions.length >= 2) {
        // Assume order is Source -> Dest
        // But we need to check their position in the string to be sure
        const firstIndex = q.indexOf(uniqueMentions[0].toLowerCase());
        const secondIndex = q.indexOf(uniqueMentions[1].toLowerCase());

        if (firstIndex < secondIndex) {
          source = source || uniqueMentions[0];
          dest = dest || uniqueMentions[1];
        } else {
          source = source || uniqueMentions[1];
          dest = dest || uniqueMentions[0];
        }
      }
    }

    if (source && dest) {
      const sourceInfo = this.contextLoader.getAreaInfo(source);
      const destInfo = this.contextLoader.getAreaInfo(dest);

      return {
        type: 'metro',
        source: source,
        destination: dest,
        sourceStation: sourceInfo?.metroStation || 'Nearest Metro Station',
        destStation: destInfo?.metroStation || 'Nearest Metro Station',
        coordinates: sourceInfo?.coordinates, // Focus map on SOURCE
        response: `🚇 **Metro Route Guide**\n\n**📍 Start**: ${source}\nStation: ${sourceInfo?.metroStation || 'Check Map'}\n\n**🏁 End**: ${dest}\nStation: ${destInfo?.metroStation || 'Check Map'}\n\n**Route Advice**:\nThe Delhi Metro is the most reliable way to travel from ${source} to ${dest}. Avoid road traffic during peak hours!`
      };
    }

    return {
      type: 'error',
      response: "Samajh nahi aaya bhai! 😅 To get a route, ask like: 'Metro route from CP to Karol Bagh'."
    };
  }

  isSlangQuery(query) {
    const slangIndicators = ['explain', 'meaning', 'what does', 'what is', 'scene kya hai', 'jugaad', 'timepass', 'chill maar'];
    return slangIndicators.some(indicator => query.includes(indicator));
  }

  handleSlangQuery(query) {
    const slangTerms = Object.keys(this.contextLoader.context.slang);

    // Find slang term in query
    const foundSlang = slangTerms.find(term =>
      query.toLowerCase().includes(term.toLowerCase())
    );

    if (foundSlang) {
      const meaning = this.contextLoader.getSlangMeaning(foundSlang);
      return {
        type: 'slang',
        response: `**${foundSlang}**\n\n📖 **Matlab**: ${meaning}\n\nYe Delhi mein common slang hai. Use it with confidence! 😉`,
        slangTerm: foundSlang,
        meaning: meaning
      };
    }

    return {
      type: 'slang',
      response: `Bhai, I didn't catch any specific Delhi slang in your question. Ask me about "Jugaad", "Gedi", or "Scene kya hai"!`
    };
  }

  containsAreaName(query) {
    const areas = this.contextLoader.getAllAreas();
    return areas.some(area =>
      query.includes(area.toLowerCase()) ||
      query.includes(area.split(' ')[0].toLowerCase())
    );
  }

  extractAreaName(query) {
    const areas = this.contextLoader.getAllAreas();
    return areas.find(area =>
      query.includes(area.toLowerCase()) ||
      query.includes(area.split(' ')[0].toLowerCase())
    );
  }

  handleAreaQuery(query, areaName) {
    const areaInfo = this.contextLoader.getAreaInfo(areaName);

    if (!areaInfo) {
      return {
        type: 'error',
        response: `Sorry yaar, info nahi hai about that area. Try CP, Karol Bagh, or HKV! 🤔`
      };
    }

    const currentHour = this.currentTime.getHours();
    const timeContext = this.getTimeContext(currentHour);

    return {
      type: 'area',
      area: areaName,
      coordinates: areaInfo.coordinates,
      metroStation: areaInfo.metroStation,
      // Breaking down response for structured card
      crowdVibe: areaInfo.crowdVibe,
      foodMood: areaInfo.foodMood,
      travelTips: areaInfo.travelTips,
      peakTimes: areaInfo.peakTimes,
      greeting: timeContext.greeting,
      advice: timeContext.advice,
      response: "Area details loaded successfully." // Placeholder, UI will render cards
    };
  }

  getTimeContext(hour) {
    if (hour >= 6 && hour < 10) {
      return {
        greeting: "Subah ka scene hai",
        advice: "Morning vibes! Roads relatively clear."
      };
    } else if (hour >= 10 && hour < 14) {
      return {
        greeting: "Din shuru ho gaya",
        advice: "Market hustle is starting!"
      };
    } else if (hour >= 14 && hour < 18) {
      return {
        greeting: "Afternoon dhoop",
        advice: "Thoda slow scene hai abhi."
      };
    } else if (hour >= 18 && hour < 22) {
      return {
        greeting: "Evening chaos",
        advice: "Traffic peak pe hai!"
      };
    } else {
      return {
        greeting: "Raat ka time",
        advice: "City is winding down (or partying!)."
      };
    }
  }

  isFestivalQuery(query) {
    const festivalKeywords = ['diwali', 'holi', 'festival', 'celebration', 'independence'];
    return festivalKeywords.some(keyword => query.includes(keyword));
  }

  handleFestivalQuery(query) {
    const festivals = ['Diwali', 'Holi', 'Independence'];
    const foundFestival = festivals.find(festival =>
      query.toLowerCase().includes(festival.toLowerCase())
    );

    if (foundFestival) {
      const festivalInfo = this.contextLoader.getFestivalInfo(foundFestival);
      return {
        type: 'festival',
        festival: foundFestival,
        response: `**${foundFestival} in Delhi** 🎉\n\n🚦 **Traffic**: ${festivalInfo.traffic}\n\n🍽️ **Food**: ${festivalInfo.food}\n\n💡 **Tip**: ${festivalInfo.tip || festivalInfo.travelTips}`
      };
    }

    return {
      type: 'festival',
      response: `Festival vibes in Delhi are crazy! Ask me about Diwali or Holi.`
    };
  }

  isFoodQuery(query) {
    const foodKeywords = ['food', 'eat', 'hungry', 'restaurant', 'street food', 'khana', 'chaat', 'dinner', 'lunch'];
    return foodKeywords.some(keyword => query.includes(keyword));
  }

  handleFoodQuery(query, selectedArea) {
    const timeOfDay = this.getTimeOfDay();
    let response = `${timeOfDay.greeting}!\n\n${timeOfDay.foodSuggestion}\n\n`;

    if (selectedArea) {
      const areaInfo = this.contextLoader.getAreaInfo(selectedArea);
      if (areaInfo) {
        response += `**In ${selectedArea}**:\n${areaInfo.foodMood}`;
      }
    } else {
      response += "Select an area for specific suggestions (like CP or Chandni Chowk)!";
    }

    return {
      type: 'food',
      area: selectedArea,
      response: response
    };
  }

  getTimeOfDay() {
    const hour = this.currentTime.getHours();

    if (hour >= 6 && hour < 11) {
      return {
        greeting: "Nashta time",
        foodSuggestion: "Paranthas or Bedmi Puri?"
      };
    } else if (hour >= 11 && hour < 16) {
      return {
        greeting: "Lunch time",
        foodSuggestion: "Rajma Chawal or Thali?"
      };
    } else if (hour >= 16 && hour < 20) {
      return {
        greeting: "Chai-Samosa time",
        foodSuggestion: "Best time for Chaat and Tikki!"
      };
    } else {
      return {
        greeting: "Dinner scene",
        foodSuggestion: "Butter Chicken or Mughlai?"
      };
    }
  }

  isTrafficQuery(query) {
    const trafficKeywords = ['traffic', 'transport', 'metro', 'auto', 'travel', 'road', 'jam'];
    return trafficKeywords.some(keyword => query.includes(keyword));
  }

  handleTrafficQuery(query) {
    return {
      type: 'traffic',
      response: `Delhi Traffic Logic: \n\n1. **Morning (8-11 AM)**: Office rush. Bad.\n2. **Evening (6-9 PM)**: Bhasad (Chaos). Avoid roads.\n3. **Metro**: Always best option.\n4. **Auto**: Bargain hard (Rule of thumb: Meter + Rs 20).`
    };
  }

  handleGeneralQuery(query) {
    return {
      type: 'general',
      response: `**Namaste!** I am your Delhi Local Guide. 🇮🇳\n\nI can help you with:\n• **Area Vibe**: "How is CP?"\n• **Metro Routes**: "From Karol Bagh to Noida"\n• **Slang**: "Meaning of Jugaad"\n• **Food**: "Best food in HKV"`
    };
  }
}