# Deployment Guide

## Quick Deploy Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts for configuration
```

### 2. Netlify
```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
# Or connect GitHub repo for auto-deploy
```

### 3. GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

### 4. Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Configuration

### Required Files
- `.kiro/product.md` - Agent steering context (already included)
- `package.json` - Dependencies and scripts
- `vite.config.js` - Build configuration
- `tailwind.config.js` - Styling configuration

### Optional Customization
- Update `.kiro/product.md` to add new areas or modify cultural context
- Modify `src/utils/contextLoader.js` to change context loading behavior
- Customize colors in `tailwind.config.js` for different themes

## Performance Optimization

### Build Optimization
- Vite automatically optimizes bundle size
- Tree shaking removes unused code
- CSS is purged and minified
- Images are optimized

### Runtime Performance
- React components are optimized for re-renders
- Map loading is lazy and on-demand
- Context loading is cached
- Smooth animations use CSS transforms

## Production Checklist

- [ ] Test all sample queries
- [ ] Verify map functionality
- [ ] Check responsive design on mobile
- [ ] Validate agent steering behavior
- [ ] Test loading states and error handling
- [ ] Verify accessibility features
- [ ] Check performance metrics
- [ ] Test in different browsers

## Monitoring

### Key Metrics to Track
- Page load time
- User interaction response time
- Map loading performance
- Error rates
- Mobile vs desktop usage

### Analytics Integration
Add analytics to track:
- Most popular queries
- Area selection patterns
- User engagement time
- Feature usage statistics