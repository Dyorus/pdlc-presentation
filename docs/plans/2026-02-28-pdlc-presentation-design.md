# Program Development Life Cycle Presentation Website - Design Document

**Date:** 2026-02-28
**Project:** PDLC Educational Presentation Website
**Audience:** Classmates and teacher (A Level CS course)

## Purpose

Create an interactive educational website for a 5-10 minute class presentation covering three program development lifecycles (Waterfall, Iterative, RAD) from textbook section 12.1. The site will serve both as a live presentation tool and a long-term study resource.

## Requirements

### Content Requirements
For each of the 3 lifecycle models (Waterfall, Iterative, RAD):
- Description of the model
- Advantages and disadvantages
- Appropriate contexts to use
- Interactive visual diagram

### Quiz Section
- Display questions from `program-development-life-cycle-nqptztXwTZF6jm32.pdf`
- Simple Q&A format with "Show Answer" buttons
- Reveal answer screenshots from `answers/` folder when clicked

### Technical Requirements
- Multi-page website structure
- Professional/academic design aesthetic
- Interactive diagrams with animations
- GitHub Pages hosting for shareable link
- Mobile-responsive design

## Architecture

### Site Structure
```
/Development life cycle/
├── index.html          # Home page - overview of PDLC
├── waterfall.html      # Waterfall model details + diagram
├── iterative.html      # Iterative model details + diagram
├── rad.html            # RAD model details + diagram
├── quiz.html           # Quiz section with Q&A
├── assets/
│   ├── css/
│   │   └── styles.css  # Shared styles
│   ├── js/
│   │   ├── diagrams.js # Interactive diagram logic
│   │   └── quiz.js     # Quiz functionality
│   └── images/
│       └── answers/    # Quiz answer screenshots
├── program-development-life-cycle-nqptztXwTZF6jm32.pdf
└── A Level CS 9618 (Watson _ Williams).pdf
```

### Technology Stack
- **HTML5** - Semantic structure
- **Tailwind CSS** - Professional styling (CDN)
- **Vanilla JavaScript** - Interactive diagrams and quiz logic
- **SVG** - Lifecycle diagrams
- **GitHub Pages** - Free hosting with shareable URL

### Design System

**Visual Style:** Professional/Academic
- Clean, minimalist layout
- Trustworthy color palette (blues, grays, white)
- Clear typography hierarchy
- Generous whitespace
- Subtle animations (no distractions)

**Navigation:**
- Fixed header with nav links on all pages
- Clear active page indicator
- Smooth page transitions

**Interactive Elements:**
- Clickable diagram phases with hover states
- "Show Answer" buttons that reveal content
- Smooth fade-in animations
- Focus states for accessibility

## Components

### 1. Home Page
- Hero section with title and introduction
- Brief overview of what PDLC is
- Three cards linking to each model page
- Clean, welcoming design

### 2. Model Pages (Waterfall, Iterative, RAD)
Each page follows same structure:
- **Header:** Model name and brief tagline
- **Description Section:** What the model is, how it works
- **Interactive Diagram:** SVG visualization with clickable phases
- **Advantages Section:** Bulleted list with icons
- **Disadvantages Section:** Bulleted list with icons
- **Use Cases Section:** When to use this model
- **Navigation:** Previous/Next buttons to other models

### 3. Interactive Diagrams
- **Waterfall:** Sequential flow (linear cascade)
- **Iterative:** Circular cycle showing repeated iterations
- **RAD:** Rapid prototyping cycle with user feedback loops
- **Interactivity:** Click phases to highlight, hover for tooltips

### 4. Quiz Page
- List of questions from PDF
- Each question in a card format
- "Show Answer" button below each question
- Answer screenshot reveals with smooth animation
- Score tracking (optional)
- Reset button to hide all answers

## Data Flow

### Quiz Functionality
1. Questions hardcoded from PDF content
2. Answer screenshots stored in `assets/images/answers/`
3. Click "Show Answer" → JavaScript toggles visibility
4. Answer image fades in with CSS transition
5. "Hide Answer" option to close

### Diagram Interactions
1. SVG elements rendered in HTML
2. JavaScript adds click handlers to diagram phases
3. Click phase → highlight active state
4. Show phase description in sidebar/tooltip
5. CSS transitions for smooth animations

## Error Handling

- Missing images: Use placeholder with error message
- JavaScript disabled: Ensure basic content still readable
- Mobile devices: Responsive breakpoints for all screen sizes
- Browser compatibility: Modern browsers (last 2 versions)

## Testing Strategy

- Visual testing: Compare on different screen sizes
- Interaction testing: Click all buttons, diagrams, quiz answers
- Content accuracy: Cross-reference with textbook section 12.1
- Link testing: Ensure all navigation works
- GitHub Pages deployment: Test live URL before sharing

## Deployment

1. Create Git repository in `Development life cycle/` folder
2. Commit all files
3. Push to GitHub (repository: `pdlc-presentation`)
4. Enable GitHub Pages in repo settings (deploy from main branch)
5. Share live URL: `https://Dyorus.github.io/pdlc-presentation/`

## Success Criteria

- ✅ Contains all 3 lifecycle models with required content
- ✅ Interactive diagrams work smoothly
- ✅ Quiz displays questions and reveals answers
- ✅ Professional, academic appearance
- ✅ Works on desktop and mobile
- ✅ Live URL accessible for teacher and classmates
- ✅ Presentation-ready (5-10 minute walkthrough)
- ✅ Study resource for later review

## Timeline

1. Build home page and navigation structure
2. Create model pages (Waterfall, Iterative, RAD)
3. Implement interactive SVG diagrams
4. Build quiz section with answer reveals
5. Test all interactions and responsiveness
6. Deploy to GitHub Pages
7. Share link with teacher

## Trade-offs Considered

**Alternative Approach 1:** Single-page scrolling site
- ❌ Rejected: Harder to navigate during presentation
- ❌ Harder to bookmark specific sections

**Alternative Approach 2:** React/framework-based
- ❌ Rejected: Overkill for static content
- ❌ Slower initial load, harder to maintain

**Chosen Approach:** Multi-page static site
- ✅ Fast loading, easy navigation
- ✅ Works perfectly on GitHub Pages
- ✅ Simple to maintain and update
- ✅ No build step required
