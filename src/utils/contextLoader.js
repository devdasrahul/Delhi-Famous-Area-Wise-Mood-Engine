import productMd from '../../.kiro/product.md?raw';

// Context loader for agent steering
export class ContextLoader {
  constructor() {
    this.context = {
      areas: {},
      slang: {},
      festivals: {},
      personality: {}
    };
    this.loadContext();
  }

  loadContext() {
    try {
      this.parseMarkdown(productMd);
    } catch (error) {
      console.error('Failed to parse context from product.md:', error);
    }
  }

  parseMarkdown(md) {
    const lines = md.split('\n');
    let currentSection = null;
    let currentSubSection = null;

    // Regex helpers
    const sectionHeader = /^##\s+(.+)/;
    const subSectionHeader = /^###\s+(.+)/;
    const bulletPoint = /^-\s+\*\*(.+?)\*\*:\s+(.+)/;
    const subBullet = /^\s+-\s+\*(.+?)\*:\s+(.+)/;

    lines.forEach(line => {
      // 1. Check for Sections
      const secMatch = line.match(sectionHeader);
      if (secMatch) {
        if (secMatch[1].includes('Slang Dictionary')) currentSection = 'slang';
        else if (secMatch[1].includes('Area-Wise Intelligence')) currentSection = 'areas';
        else if (secMatch[1].includes('Metro Network')) currentSection = 'metro';
        else if (secMatch[1].includes('Festival Awareness Mode')) currentSection = 'festivals';
        else if (secMatch[1].includes('Core Persona')) currentSection = 'personality';
        else currentSection = null;
        currentSubSection = null; // Reset subsection on new section
        return;
      }

      // 2. Check for Subsections (Specific Areas/Festivals)
      const subSecMatch = line.match(subSectionHeader);
      if (subSecMatch) {
        currentSubSection = subSecMatch[1].trim();
        // Initialize object for this entity
        if (currentSection === 'areas') {
          this.context.areas[currentSubSection] = {};
        } else if (currentSection === 'festivals') {
          this.context.festivals[currentSubSection] = {};
        }
        return;
      }

      // 3. Parse content based on current section
      if (currentSection === 'slang') {
        const match = line.match(bulletPoint);
        if (match) {
          const [_, term, meaning] = match;
          this.context.slang[term.replace(/\?$/, '')] = meaning; // Remove trailing ? for key
        }
      }

      else if (currentSection === 'personality') {
        const match = line.match(bulletPoint);
        if (match) {
          const [_, key, value] = match;
          this.context.personality[key.toLowerCase()] = value;
        }
      }

      else if (currentSection === 'metro') {
        const match = line.match(bulletPoint);
        if (match) {
          // Format: - **Area**: Station info
          const [_, area, info] = match;
          this.attachMetroInfoToArea(area, info);
        }
      }

      else if (currentSection === 'areas' && currentSubSection) {
        // Main property (Vibe, Crowd, etc)
        const match = line.match(bulletPoint);
        if (match) {
          const [_, key, value] = match;
          let prop = this.mapToProperty(key);

          if (prop === 'coordinates') {
            try {
              this.context.areas[currentSubSection][prop] = JSON.parse(value);
            } catch (e) { console.warn('Bad coords', value); }
          } else {
            this.context.areas[currentSubSection][prop] = value;
          }
        }

        // Sub-property (e.g. Food Mood -> Snacks)
        const subMatch = line.match(subBullet);
        if (subMatch) {
          // Append to foodMood or relevant field
          const [_, type, desc] = subMatch;
          const targetProp = 'foodMood'; // Assuming sub-bullets are mainly for food mood logic
          const userKey = this.context.areas[currentSubSection][targetProp];
          // Append nicely
          this.context.areas[currentSubSection][targetProp] = userKey
            ? `${userKey}\n• ${type}: ${desc}`
            : `• ${type}: ${desc}`;
        }
      }

      else if (currentSection === 'festivals' && currentSubSection) {
        const match = line.match(bulletPoint);
        if (match) {
          const [_, key, value] = match;
          this.context.festivals[currentSubSection][this.mapToProperty(key)] = value;
        }
      }
    });
  }

  attachMetroInfoToArea(areaName, info) {
    // Try to find the matching area in existing areas
    const areaKeys = Object.keys(this.context.areas);
    const match = areaKeys.find(k => k.toLowerCase().includes(areaName.toLowerCase()) || areaName.toLowerCase().includes(k.split(' ')[0].toLowerCase()));

    if (match) {
      this.context.areas[match].metroStation = info;
    }
  }

  // Helper to map Markdown Keys (User facing) to internal Keys
  mapToProperty(rawKey) {
    const k = rawKey.toLowerCase();
    if (k.includes('vibe')) return 'crowdVibe';
    if (k.includes('food')) return 'foodMood';
    if (k.includes('crowd')) return 'crowd';
    if (k.includes('travel') || k.includes('tips') || k.includes('tip')) return 'travelTips';
    if (k.includes('traffic') || k.includes('status')) return 'traffic';
    if (k.includes('peak') || k.includes('time')) return 'peakTimes';
    if (k.includes('mood')) return 'mood'; // For festival mood
    if (k.includes('coordinates')) return 'coordinates';
    return k; // fallback
  }

  getAreaInfo(areaName) {
    if (!areaName) return null;
    // Fuzzy match area name
    const keys = Object.keys(this.context.areas);
    const match = keys.find(k => k.toLowerCase().includes(areaName.toLowerCase()) || areaName.toLowerCase().includes(k.split(' ')[0].toLowerCase()));
    return match ? this.context.areas[match] : null;
  }

  getSlangMeaning(slang) {
    const keys = Object.keys(this.context.slang);
    const match = keys.find(k => slang.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(slang.toLowerCase()));
    return match ? this.context.slang[match] : null;
  }

  getFestivalInfo(festival) {
    const keys = Object.keys(this.context.festivals);
    const match = keys.find(k => k.toLowerCase().includes(festival.toLowerCase()));
    return match ? this.context.festivals[match] : null;
  }

  getPersonality() {
    return this.context.personality;
  }

  getAllAreas() {
    return Object.keys(this.context.areas);
  }
}