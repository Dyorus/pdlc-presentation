# Program Development Life Cycle - Educational Presentation Website

An interactive educational website covering three key program development methodologies: Waterfall, Iterative, and RAD (Rapid Application Development).

## 📚 Purpose

This website was created for an A Level Computer Science presentation on textbook section 12.1. It serves as both a live presentation tool and a study resource for understanding different PDLC approaches.

## 🌐 View Live

**GitHub Pages URL:** `https://Dyorus.github.io/pdlc-presentation/`

## 📖 Content

### Models Covered
1. **Waterfall Model** - Sequential, linear development approach
2. **Iterative Model** - Cyclical refinement through repeated iterations
3. **RAD Model** - Rapid Application Development with prototyping

### For Each Model
- ✅ Description of the methodology
- ✅ Interactive diagram (click phases to learn more)
- ✅ Advantages and disadvantages
- ✅ Appropriate use cases
- ✅ When to avoid using this model

### Quiz Section
- Practice questions from course materials
- "Show Answer" reveal functionality
- Answer screenshots from textbook/materials

## 🚀 Running Locally

### Option 1: Simple File Opening
```bash
# Just open index.html in your browser
start index.html  # Windows
open index.html   # Mac
```

### Option 2: Local Server (Optional)
```bash
# Python 3
python -m http.server 8000

# Then visit: http://localhost:8000
```

## 📁 Project Structure

```
Development life cycle/
├── index.html              # Home page
├── waterfall.html          # Waterfall model page
├── iterative.html          # Iterative model page
├── rad.html                # RAD model page
├── quiz.html               # Quiz section
├── assets/
│   ├── css/
│   │   └── styles.css      # Custom styles
│   ├── js/
│   │   ├── diagrams.js     # Interactive diagram handler
│   │   └── quiz.js         # Quiz answer reveal logic
│   └── images/
│       └── answers/        # Quiz answer screenshots
├── docs/
│   └── plans/              # Design & implementation docs
└── README.md               # This file
```

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **Tailwind CSS** - Utility-first styling (via CDN)
- **Vanilla JavaScript** - Interactive diagrams and quiz
- **SVG** - Lifecycle model diagrams
- **GitHub Pages** - Free hosting

## 🎨 Features

### Interactive Diagrams
- Click phases to see detailed descriptions
- Hover effects and smooth transitions
- Visual feedback for active states

### Quiz System
- Show/hide answer functionality
- Clean answer reveal animations
- Reset all answers button

### Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interactions

## 📝 Development Notes

### Making Changes

1. **Update content:** Edit HTML files directly
2. **Modify styles:** Edit `assets/css/styles.css`
3. **Change interactions:** Edit JavaScript in `assets/js/`

### Adding New Questions

Edit `quiz.html`:
```html
<div class="bg-white rounded-lg shadow-lg p-6 mb-6">
    <div class="flex items-start mb-4">
        <span class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">5</span>
        <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
                Your question here?
            </h3>
        </div>
    </div>
    <button class="show-answer-btn btn-primary px-6 py-2 rounded-lg font-medium" data-question-id="5">
        Show Answer
    </button>
    <div id="answer-5" class="answer-hidden mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
        <img src="assets/images/answers/your-answer.png" alt="Answer to question 5" class="w-full max-w-2xl rounded shadow">
    </div>
</div>
```

## 🎓 Educational Context

Based on **A Level Computer Science Textbook Section 12.1**

### Learning Objectives
- Understand different PDLC methodologies
- Compare advantages and disadvantages
- Identify appropriate use cases for each model
- Apply knowledge through quiz questions

## 📄 License

Educational use only. Created for A Level Computer Science coursework.

## 👤 Author

Created by Dyorus for class presentation

---

**For more information:** See design document at `docs/plans/2026-02-28-pdlc-presentation-design.md`
