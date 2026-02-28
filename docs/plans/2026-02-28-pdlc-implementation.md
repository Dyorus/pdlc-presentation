# PDLC Presentation Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a multi-page educational website covering Waterfall, Iterative, and RAD development lifecycles with interactive diagrams and quiz section, deployable to GitHub Pages.

**Architecture:** Static multi-page website with shared navigation and styling. Each lifecycle model gets dedicated page with interactive SVG diagram. Quiz page pulls questions from PDF with reveal-on-click answer screenshots. Pure HTML/CSS/JS for maximum GitHub Pages compatibility.

**Tech Stack:** HTML5, Tailwind CSS (CDN), Vanilla JavaScript, SVG diagrams, GitHub Pages

---

## Task 1: Project Structure Setup

**Files:**
- Create: `.gitignore`
- Create: `assets/css/.gitkeep`
- Create: `assets/js/.gitkeep`
- Create: `assets/images/answers/.gitkeep`

**Step 1: Create .gitignore file**

```gitignore
# System files
.DS_Store
Thumbs.db

# Editor files
.vscode/
.idea/
*.swp
*.swo

# Temporary files
*.tmp
*~

# Node modules (if needed later)
node_modules/
```

**Step 2: Create assets directory structure**

Run:
```bash
cd "/c/Claude/webdesign/Development life cycle"
mkdir -p assets/css assets/js assets/images/answers
touch assets/css/.gitkeep assets/js/.gitkeep assets/images/answers/.gitkeep
```

**Step 3: Move answer screenshots to assets folder**

Run:
```bash
mv answers/*.png assets/images/answers/
rmdir answers
```

**Step 4: Verify structure**

Run: `ls -R assets/`

Expected output:
```
assets/:
css  images  js

assets/css:

assets/images:
answers

assets/images/answers:
Screenshot 2026-02-28 170000.png
Screenshot 2026-02-28 170201.png
Screenshot 2026-02-28 170230.png
Screenshot 2026-02-28 170254.png

assets/js:
```

**Step 5: Commit**

```bash
git add .gitignore assets/
git commit -m "chore: set up project structure and move assets"
```

---

## Task 2: Shared Stylesheet

**Files:**
- Create: `assets/css/styles.css`

**Step 1: Create base styles file**

Create `/c/Claude/webdesign/Development life cycle/assets/css/styles.css`:

```css
/* Custom styles for PDLC Presentation Website */

:root {
    --primary-blue: #2563eb;
    --dark-blue: #1e40af;
    --light-blue: #dbeafe;
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-600: #4b5563;
    --gray-800: #1f2937;
    --gray-900: #111827;
    --success-green: #10b981;
    --warning-orange: #f59e0b;
    --danger-red: #ef4444;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: var(--gray-800);
    background: var(--gray-50);
}

/* Navigation */
.nav-active {
    color: var(--primary-blue) !important;
    font-weight: 600;
    border-bottom: 2px solid var(--primary-blue);
}

/* Interactive Diagrams */
.diagram-phase {
    cursor: pointer;
    transition: all 0.3s ease;
}

.diagram-phase:hover {
    opacity: 0.8;
    transform: scale(1.05);
}

.diagram-phase.active {
    filter: drop-shadow(0 0 8px var(--primary-blue));
}

/* Quiz Section */
.answer-hidden {
    display: none;
    opacity: 0;
}

.answer-visible {
    display: block;
    opacity: 1;
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Button Styles */
.btn-primary {
    background: var(--primary-blue);
    color: white;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background: var(--dark-blue);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.btn-secondary {
    background: var(--gray-200);
    color: var(--gray-800);
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background: var(--gray-300);
}

/* Card Styles */
.card-hover {
    transition: all 0.3s ease;
}

.card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
    .diagram-container {
        overflow-x: auto;
    }
}
```

**Step 2: Verify CSS file**

Run: `cat assets/css/styles.css | head -20`

Expected: CSS content displayed

**Step 3: Commit**

```bash
git add assets/css/styles.css
git commit -m "feat: add shared stylesheet with custom styles"
```

---

## Task 3: Shared JavaScript for Diagrams

**Files:**
- Create: `assets/js/diagrams.js`

**Step 1: Create diagram interaction handler**

Create `/c/Claude/webdesign/Development life cycle/assets/js/diagrams.js`:

```javascript
// Interactive diagram functionality for lifecycle models

document.addEventListener('DOMContentLoaded', function() {
    // Get all diagram phases
    const phases = document.querySelectorAll('.diagram-phase');
    const phaseInfo = document.getElementById('phase-info');

    if (!phases.length) return;

    phases.forEach(phase => {
        phase.addEventListener('click', function() {
            // Remove active class from all phases
            phases.forEach(p => p.classList.remove('active'));

            // Add active class to clicked phase
            this.classList.add('active');

            // Get phase data
            const phaseName = this.getAttribute('data-phase');
            const phaseDesc = this.getAttribute('data-description');

            // Update info panel
            if (phaseInfo) {
                phaseInfo.innerHTML = `
                    <h3 class="text-xl font-bold text-blue-600 mb-2">${phaseName}</h3>
                    <p class="text-gray-700">${phaseDesc}</p>
                `;
            }
        });

        // Hover effect
        phase.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.opacity = '0.8';
            }
        });

        phase.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });

    // Auto-select first phase
    if (phases[0]) {
        phases[0].click();
    }
});
```

**Step 2: Verify JavaScript file**

Run: `cat assets/js/diagrams.js | head -10`

Expected: JavaScript content displayed

**Step 3: Commit**

```bash
git add assets/js/diagrams.js
git commit -m "feat: add interactive diagram JavaScript handler"
```

---

## Task 4: Quiz JavaScript

**Files:**
- Create: `assets/js/quiz.js`

**Step 1: Create quiz interaction handler**

Create `/c/Claude/webdesign/Development life cycle/assets/js/quiz.js`:

```javascript
// Quiz functionality - show/hide answers

document.addEventListener('DOMContentLoaded', function() {
    // Get all show answer buttons
    const answerButtons = document.querySelectorAll('.show-answer-btn');

    answerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const questionId = this.getAttribute('data-question-id');
            const answerDiv = document.getElementById(`answer-${questionId}`);

            if (answerDiv.classList.contains('answer-hidden')) {
                // Show answer
                answerDiv.classList.remove('answer-hidden');
                answerDiv.classList.add('answer-visible');
                this.textContent = 'Hide Answer';
                this.classList.remove('btn-primary');
                this.classList.add('btn-secondary');
            } else {
                // Hide answer
                answerDiv.classList.remove('answer-visible');
                answerDiv.classList.add('answer-hidden');
                this.textContent = 'Show Answer';
                this.classList.remove('btn-secondary');
                this.classList.add('btn-primary');
            }
        });
    });

    // Reset all answers button
    const resetButton = document.getElementById('reset-quiz');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            const allAnswers = document.querySelectorAll('.answer-visible');
            const allButtons = document.querySelectorAll('.show-answer-btn');

            allAnswers.forEach(answer => {
                answer.classList.remove('answer-visible');
                answer.classList.add('answer-hidden');
            });

            allButtons.forEach(button => {
                button.textContent = 'Show Answer';
                button.classList.remove('btn-secondary');
                button.classList.add('btn-primary');
            });
        });
    }
});
```

**Step 2: Verify JavaScript file**

Run: `cat assets/js/quiz.js | head -10`

Expected: JavaScript content displayed

**Step 3: Commit**

```bash
git add assets/js/quiz.js
git commit -m "feat: add quiz answer reveal JavaScript"
```

---

## Task 5: Home Page (index.html)

**Files:**
- Create: `index.html`

**Step 1: Create home page**

Create `/c/Claude/webdesign/Development life cycle/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Program Development Life Cycle | Educational Presentation</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex-shrink-0">
                    <h1 class="text-xl font-bold text-gray-800">PDLC Overview</h1>
                </div>
                <div class="flex space-x-8">
                    <a href="index.html" class="nav-active text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Home</a>
                    <a href="waterfall.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Waterfall</a>
                    <a href="iterative.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Iterative</a>
                    <a href="rad.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">RAD</a>
                    <a href="quiz.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Quiz</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 class="text-5xl font-bold mb-4">Program Development Life Cycle</h1>
            <p class="text-xl mb-8 opacity-90">Understanding the Three Key Methodologies</p>
            <p class="text-lg max-w-3xl mx-auto">A comprehensive guide to Waterfall, Iterative, and RAD development approaches, based on textbook section 12.1</p>
        </div>
    </div>

    <!-- Introduction Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">What is PDLC?</h2>
            <p class="text-lg text-gray-700 mb-4">
                The Program Development Life Cycle (PDLC) is a systematic approach to developing software applications.
                It provides a structured framework that guides developers through the entire process from initial concept to final deployment and maintenance.
            </p>
            <p class="text-lg text-gray-700">
                Different projects require different approaches. In this presentation, we explore three fundamental methodologies:
                <strong>Waterfall</strong>, <strong>Iterative</strong>, and <strong>RAD (Rapid Application Development)</strong>.
            </p>
        </div>

        <!-- Models Grid -->
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Explore the Three Models</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <!-- Waterfall Card -->
            <a href="waterfall.html" class="card-hover bg-white rounded-lg shadow-lg p-6 text-center cursor-pointer">
                <div class="text-5xl mb-4">💧</div>
                <h3 class="text-2xl font-bold text-blue-600 mb-3">Waterfall</h3>
                <p class="text-gray-600 mb-4">Sequential, linear approach where each phase must be completed before the next begins.</p>
                <span class="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">Learn More →</span>
            </a>

            <!-- Iterative Card -->
            <a href="iterative.html" class="card-hover bg-white rounded-lg shadow-lg p-6 text-center cursor-pointer">
                <div class="text-5xl mb-4">🔄</div>
                <h3 class="text-2xl font-bold text-blue-600 mb-3">Iterative</h3>
                <p class="text-gray-600 mb-4">Cyclical approach with repeated refinement through multiple development iterations.</p>
                <span class="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">Learn More →</span>
            </a>

            <!-- RAD Card -->
            <a href="rad.html" class="card-hover bg-white rounded-lg shadow-lg p-6 text-center cursor-pointer">
                <div class="text-5xl mb-4">⚡</div>
                <h3 class="text-2xl font-bold text-blue-600 mb-3">RAD</h3>
                <p class="text-gray-600 mb-4">Rapid prototyping and quick feedback cycles for fast development and deployment.</p>
                <span class="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">Learn More →</span>
            </a>
        </div>

        <!-- Quiz CTA -->
        <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-8 text-center text-white">
            <h2 class="text-3xl font-bold mb-4">Test Your Knowledge</h2>
            <p class="text-lg mb-6">Ready to check your understanding? Try our interactive quiz!</p>
            <a href="quiz.html" class="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
                Take the Quiz →
            </a>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-gray-400">Based on Textbook Section 12.1 | A Level Computer Science</p>
            <p class="text-gray-500 text-sm mt-2">Created for educational presentation purposes</p>
        </div>
    </footer>
</body>
</html>
```

**Step 2: Verify home page**

Run: `start index.html`

Expected: Home page opens in browser with navigation, hero section, 3 model cards, and quiz CTA

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: create home page with navigation and model cards"
```

---

## Task 6: Waterfall Page

**Files:**
- Create: `waterfall.html`

**Step 1: Create waterfall page with interactive diagram**

Create `/c/Claude/webdesign/Development life cycle/waterfall.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Waterfall Model | PDLC</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex-shrink-0">
                    <h1 class="text-xl font-bold text-gray-800">PDLC Overview</h1>
                </div>
                <div class="flex space-x-8">
                    <a href="index.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Home</a>
                    <a href="waterfall.html" class="nav-active text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Waterfall</a>
                    <a href="iterative.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Iterative</a>
                    <a href="rad.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">RAD</a>
                    <a href="quiz.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Quiz</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Page Header -->
    <div class="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold mb-2">💧 Waterfall Model</h1>
            <p class="text-xl opacity-90">Sequential development approach</p>
        </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Description -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Description</h2>
            <p class="text-gray-700 mb-3">
                The Waterfall model is a linear and sequential approach to software development. Each phase must be completed entirely before the next phase begins,
                with no overlap between phases. The process flows steadily downwards (like a waterfall) through distinct stages.
            </p>
            <p class="text-gray-700 mb-3">
                The typical phases include: Requirements Analysis, System Design, Implementation, Testing, Deployment, and Maintenance.
                Each phase has specific deliverables and review processes before moving to the next stage.
            </p>
            <p class="text-gray-700">
                This model emphasizes thorough documentation at each stage and works best when requirements are well-understood from the beginning.
            </p>
        </div>

        <!-- Interactive Diagram -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Interactive Diagram</h2>
            <p class="text-gray-600 mb-6">Click on each phase to learn more</p>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- SVG Diagram -->
                <div class="lg:col-span-2 diagram-container">
                    <svg viewBox="0 0 400 600" class="w-full h-auto">
                        <!-- Requirements -->
                        <g class="diagram-phase"
                           data-phase="Requirements Analysis"
                           data-description="Gather and document all functional and non-functional requirements. Create requirement specifications that define what the system should do.">
                            <rect x="50" y="20" width="300" height="80" fill="#3b82f6" rx="8" />
                            <text x="200" y="55" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Requirements</text>
                            <text x="200" y="75" text-anchor="middle" fill="white" font-size="14">Analysis</text>
                        </g>

                        <!-- Arrow -->
                        <path d="M 200 100 L 200 120" stroke="#6b7280" stroke-width="3" marker-end="url(#arrowhead)" />

                        <!-- Design -->
                        <g class="diagram-phase"
                           data-phase="System Design"
                           data-description="Create architectural designs, database schemas, and interface designs. Transform requirements into technical specifications.">
                            <rect x="50" y="120" width="300" height="80" fill="#3b82f6" rx="8" />
                            <text x="200" y="155" text-anchor="middle" fill="white" font-size="16" font-weight="bold">System</text>
                            <text x="200" y="175" text-anchor="middle" fill="white" font-size="14">Design</text>
                        </g>

                        <!-- Arrow -->
                        <path d="M 200 200 L 200 220" stroke="#6b7280" stroke-width="3" marker-end="url(#arrowhead)" />

                        <!-- Implementation -->
                        <g class="diagram-phase"
                           data-phase="Implementation"
                           data-description="Write the actual code based on design specifications. Develop individual software components and integrate them.">
                            <rect x="50" y="220" width="300" height="80" fill="#3b82f6" rx="8" />
                            <text x="200" y="265" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Implementation</text>
                        </g>

                        <!-- Arrow -->
                        <path d="M 200 300 L 200 320" stroke="#6b7280" stroke-width="3" marker-end="url(#arrowhead)" />

                        <!-- Testing -->
                        <g class="diagram-phase"
                           data-phase="Testing"
                           data-description="Verify that the software works as intended. Perform unit testing, integration testing, system testing, and acceptance testing.">
                            <rect x="50" y="320" width="300" height="80" fill="#3b82f6" rx="8" />
                            <text x="200" y="365" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Testing</text>
                        </g>

                        <!-- Arrow -->
                        <path d="M 200 400 L 200 420" stroke="#6b7280" stroke-width="3" marker-end="url(#arrowhead)" />

                        <!-- Deployment -->
                        <g class="diagram-phase"
                           data-phase="Deployment"
                           data-description="Release the software to users. Install and configure the system in the production environment.">
                            <rect x="50" y="420" width="300" height="80" fill="#3b82f6" rx="8" />
                            <text x="200" y="465" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Deployment</text>
                        </g>

                        <!-- Arrow -->
                        <path d="M 200 500 L 200 520" stroke="#6b7280" stroke-width="3" marker-end="url(#arrowhead)" />

                        <!-- Maintenance -->
                        <g class="diagram-phase"
                           data-phase="Maintenance"
                           data-description="Provide ongoing support, fix bugs, and make updates. Monitor system performance and user feedback.">
                            <rect x="50" y="520" width="300" height="80" fill="#3b82f6" rx="8" />
                            <text x="200" y="565" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Maintenance</text>
                        </g>

                        <!-- Arrow marker definition -->
                        <defs>
                            <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                                <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
                            </marker>
                        </defs>
                    </svg>
                </div>

                <!-- Phase Info Panel -->
                <div class="lg:col-span-1">
                    <div class="bg-blue-50 rounded-lg p-6 sticky top-24">
                        <div id="phase-info">
                            <h3 class="text-xl font-bold text-blue-600 mb-2">Select a Phase</h3>
                            <p class="text-gray-700">Click on any phase in the diagram to see its description.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Advantages -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">✅ Advantages</h2>
            <ul class="space-y-3">
                <li class="flex items-start">
                    <span class="text-green-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Simple and easy to understand:</strong> Clear structure makes it easy for teams to follow and manage.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Well-documented:</strong> Each phase produces deliverables and documentation, ensuring thorough records.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Easy to manage:</strong> Distinct phases with specific deliverables make project management straightforward.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Works well for small projects:</strong> Ideal when requirements are clear and unlikely to change.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Clear milestones:</strong> Easy to track progress with defined phase completion criteria.</span>
                </li>
            </ul>
        </div>

        <!-- Disadvantages -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">❌ Disadvantages</h2>
            <ul class="space-y-3">
                <li class="flex items-start">
                    <span class="text-red-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Inflexible to changes:</strong> Difficult and expensive to go back to previous phases if requirements change.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-red-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>No working software until late:</strong> Users don't see the product until implementation is complete.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-red-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>High risk and uncertainty:</strong> Problems may not be discovered until testing phase, which can be costly.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-red-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Not suitable for complex projects:</strong> Real-world projects often have evolving requirements that waterfall cannot accommodate.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-red-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Poor model for long projects:</strong> Requirements may become outdated by the time the project is completed.</span>
                </li>
            </ul>
        </div>

        <!-- Appropriate Contexts -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">🎯 When to Use Waterfall</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-blue-50 p-6 rounded-lg">
                    <h3 class="font-bold text-blue-800 mb-2">✓ Ideal For:</h3>
                    <ul class="space-y-2 text-gray-700">
                        <li>• Well-defined, stable requirements</li>
                        <li>• Short-term projects with fixed scope</li>
                        <li>• Projects requiring extensive documentation</li>
                        <li>• Regulated industries (healthcare, finance)</li>
                        <li>• Projects with fixed budget and timeline</li>
                    </ul>
                </div>
                <div class="bg-red-50 p-6 rounded-lg">
                    <h3 class="font-bold text-red-800 mb-2">✗ Avoid For:</h3>
                    <ul class="space-y-2 text-gray-700">
                        <li>• Unclear or evolving requirements</li>
                        <li>• Long, complex projects</li>
                        <li>• Projects needing frequent client feedback</li>
                        <li>• Innovative or experimental products</li>
                        <li>• Projects requiring rapid deployment</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between items-center mt-12">
            <a href="index.html" class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition">
                ← Back to Home
            </a>
            <a href="iterative.html" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
                Next: Iterative Model →
            </a>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-gray-400">Based on Textbook Section 12.1 | A Level Computer Science</p>
        </div>
    </footer>

    <script src="assets/js/diagrams.js"></script>
</body>
</html>
```

**Step 2: Verify waterfall page**

Run: `start waterfall.html`

Expected:
- Waterfall page loads
- Navigation shows Waterfall as active
- Can click diagram phases and see descriptions
- All content sections visible

**Step 3: Commit**

```bash
git add waterfall.html
git commit -m "feat: add waterfall model page with interactive diagram"
```

---

## Task 7: Iterative Page

**Files:**
- Create: `iterative.html`

**Step 1: Create iterative page with circular diagram**

Create `/c/Claude/webdesign/Development life cycle/iterative.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iterative Model | PDLC</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex-shrink-0">
                    <h1 class="text-xl font-bold text-gray-800">PDLC Overview</h1>
                </div>
                <div class="flex space-x-8">
                    <a href="index.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Home</a>
                    <a href="waterfall.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Waterfall</a>
                    <a href="iterative.html" class="nav-active text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Iterative</a>
                    <a href="rad.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">RAD</a>
                    <a href="quiz.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Quiz</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Page Header -->
    <div class="bg-gradient-to-r from-purple-500 to-purple-700 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold mb-2">🔄 Iterative Model</h1>
            <p class="text-xl opacity-90">Cyclical refinement approach</p>
        </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Description -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Description</h2>
            <p class="text-gray-700 mb-3">
                The Iterative model is a cyclical approach where software development occurs through repeated cycles (iterations).
                Each iteration involves planning, designing, implementing, and testing a portion of the system, producing a working version that can be refined in subsequent iterations.
            </p>
            <p class="text-gray-700 mb-3">
                Unlike Waterfall, the Iterative model allows developers to go back and make changes based on feedback from previous iterations.
                Each cycle builds upon the previous one, gradually improving and expanding the software until it meets all requirements.
            </p>
            <p class="text-gray-700">
                This approach is particularly effective when requirements are not fully understood at the outset, allowing the team to learn and adapt as the project progresses.
            </p>
        </div>

        <!-- Interactive Diagram -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Interactive Diagram</h2>
            <p class="text-gray-600 mb-6">Click on each phase to learn more</p>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- SVG Diagram -->
                <div class="lg:col-span-2 diagram-container flex justify-center">
                    <svg viewBox="0 0 500 500" class="w-full max-w-md h-auto">
                        <!-- Center Circle -->
                        <circle cx="250" cy="250" r="60" fill="#f3f4f6" stroke="#9333ea" stroke-width="2" />
                        <text x="250" y="245" text-anchor="middle" fill="#9333ea" font-size="14" font-weight="bold">Iterative</text>
                        <text x="250" y="265" text-anchor="middle" fill="#9333ea" font-size="12">Cycle</text>

                        <!-- Planning -->
                        <g class="diagram-phase"
                           data-phase="Planning"
                           data-description="Define objectives for this iteration. Determine what features or improvements will be included in this cycle.">
                            <circle cx="250" cy="100" r="50" fill="#9333ea" />
                            <text x="250" y="105" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Planning</text>
                        </g>

                        <!-- Arrow: Planning to Design -->
                        <path d="M 285 120 Q 350 150 340 220" stroke="#6b7280" stroke-width="3" fill="none" marker-end="url(#arrowhead2)" />

                        <!-- Design -->
                        <g class="diagram-phase"
                           data-phase="Design"
                           data-description="Create designs for the features planned in this iteration. Update system architecture as needed.">
                            <circle cx="370" cy="250" r="50" fill="#9333ea" />
                            <text x="370" y="255" text-anchor="middle" fill="white" font-size="14" font-weight="bold">Design</text>
                        </g>

                        <!-- Arrow: Design to Implementation -->
                        <path d="M 340 280 Q 300 350 250 365" stroke="#6b7280" stroke-width="3" fill="none" marker-end="url(#arrowhead2)" />

                        <!-- Implementation -->
                        <g class="diagram-phase"
                           data-phase="Implementation"
                           data-description="Code the designed features. Integrate new code with existing system from previous iterations.">
                            <circle cx="250" cy="400" r="50" fill="#9333ea" />
                            <text x="250" y="400" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Implement-</text>
                            <text x="250" y="415" text-anchor="middle" fill="white" font-size="12" font-weight="bold">ation</text>
                        </g>

                        <!-- Arrow: Implementation to Testing -->
                        <path d="M 215 380 Q 150 350 160 280" stroke="#6b7280" stroke-width="3" fill="none" marker-end="url(#arrowhead2)" />

                        <!-- Testing & Evaluation -->
                        <g class="diagram-phase"
                           data-phase="Testing & Evaluation"
                           data-description="Test the new features. Evaluate the iteration against requirements. Gather feedback for the next iteration.">
                            <circle cx="130" cy="250" r="50" fill="#9333ea" />
                            <text x="130" y="245" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Testing &</text>
                            <text x="130" y="260" text-anchor="middle" fill="white" font-size="12" font-weight="bold">Evaluation</text>
                        </g>

                        <!-- Arrow: Testing back to Planning -->
                        <path d="M 160 220 Q 150 150 215 120" stroke="#6b7280" stroke-width="3" fill="none" marker-end="url(#arrowhead2)" />

                        <!-- Circular arrow indicating cycle -->
                        <path d="M 300 100 Q 420 100 420 250 Q 420 400 300 400 Q 180 400 180 250 Q 180 100 300 100"
                              stroke="#d8b4fe" stroke-width="2" stroke-dasharray="5,5" fill="none" opacity="0.5" />

                        <!-- Arrow marker definition -->
                        <defs>
                            <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                                <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
                            </marker>
                        </defs>
                    </svg>
                </div>

                <!-- Phase Info Panel -->
                <div class="lg:col-span-1">
                    <div class="bg-purple-50 rounded-lg p-6 sticky top-24">
                        <div id="phase-info">
                            <h3 class="text-xl font-bold text-purple-600 mb-2">Select a Phase</h3>
                            <p class="text-gray-700">Click on any phase in the diagram to see its description.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Advantages -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">✅ Advantages</h2>
            <ul class="space-y-3">
                <li class="flex items-start">
                    <span class="text-green-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Flexibility to changes:</strong> Requirements can evolve between iterations based on user feedback and learning.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Working software early:</strong> Produces functional versions at the end of each iteration, allowing early user testing.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Risk reduction:</strong> Problems are identified and addressed early through continuous testing and refinement.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Better suited for large projects:</strong> Complex projects can be broken down into manageable iterations.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Continuous improvement:</strong> Each iteration builds on lessons learned from previous cycles.</span>
                </li>
            </ul>
        </div>

        <!-- Disadvantages -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">❌ Disadvantages</h2>
            <ul class="space-y-3">
                <li class="flex items-start">
                    <span class="text-red-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>More complex management:</strong> Requires careful planning and coordination across multiple iterations.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-red-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Requires more resources:</strong> Repeated cycles mean more time, cost, and team involvement.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-red-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Scope creep risk:</strong> Continuous changes can lead to expanding project scope without proper control.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-red-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>End date uncertainty:</strong> Difficult to determine when the project will be fully complete.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-red-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Requires skilled team:</strong> Team must be experienced in managing iterative processes and adapting to changes.</span>
                </li>
            </ul>
        </div>

        <!-- Appropriate Contexts -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">🎯 When to Use Iterative</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-purple-50 p-6 rounded-lg">
                    <h3 class="font-bold text-purple-800 mb-2">✓ Ideal For:</h3>
                    <ul class="space-y-2 text-gray-700">
                        <li>• Requirements that are not fully understood initially</li>
                        <li>• Large, complex projects</li>
                        <li>• Projects requiring frequent user feedback</li>
                        <li>• Systems that can be developed incrementally</li>
                        <li>• Projects where risk must be minimized early</li>
                    </ul>
                </div>
                <div class="bg-red-50 p-6 rounded-lg">
                    <h3 class="font-bold text-red-800 mb-2">✗ Avoid For:</h3>
                    <ul class="space-y-2 text-gray-700">
                        <li>• Projects with very tight fixed budgets</li>
                        <li>• Systems with strict regulatory requirements</li>
                        <li>• Projects requiring complete documentation upfront</li>
                        <li>• Small, simple projects with clear requirements</li>
                        <li>• Teams without iterative development experience</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between items-center mt-12">
            <a href="waterfall.html" class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition">
                ← Previous: Waterfall
            </a>
            <a href="rad.html" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
                Next: RAD Model →
            </a>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-gray-400">Based on Textbook Section 12.1 | A Level Computer Science</p>
        </div>
    </footer>

    <script src="assets/js/diagrams.js"></script>
</body>
</html>
```

**Step 2: Verify iterative page**

Run: `start iterative.html`

Expected:
- Iterative page loads with circular diagram
- Can click phases to see descriptions
- Navigation works properly

**Step 3: Commit**

```bash
git add iterative.html
git commit -m "feat: add iterative model page with circular cycle diagram"
```

---

## Task 8: RAD Page

**Files:**
- Create: `rad.html`

**Step 1: Create RAD page**

Create `/c/Claude/webdesign/Development life cycle/rad.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RAD Model | PDLC</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex-shrink-0">
                    <h1 class="text-xl font-bold text-gray-800">PDLC Overview</h1>
                </div>
                <div class="flex space-x-8">
                    <a href="index.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Home</a>
                    <a href="waterfall.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Waterfall</a>
                    <a href="iterative.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Iterative</a>
                    <a href="rad.html" class="nav-active text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">RAD</a>
                    <a href="quiz.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Quiz</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Page Header -->
    <div class="bg-gradient-to-r from-green-500 to-green-700 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold mb-2">⚡ RAD Model</h1>
            <p class="text-xl opacity-90">Rapid Application Development</p>
        </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Description -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Description</h2>
            <p class="text-gray-700 mb-3">
                RAD (Rapid Application Development) is an adaptive software development approach that emphasizes rapid prototyping and quick feedback over lengthy development and testing cycles.
                The primary goal is to develop software quickly while maintaining high quality through active user involvement and iterative refinement.
            </p>
            <p class="text-gray-700 mb-3">
                RAD uses modular construction techniques, reusable components, and automated tools to accelerate development.
                Users are heavily involved throughout the process, providing continuous feedback on working prototypes that evolve into the final product.
            </p>
            <p class="text-gray-700">
                The model consists of short, intensive development cycles (typically 60-90 days) where requirements gathering, design, coding, and testing happen concurrently rather than sequentially.
            </p>
        </div>

        <!-- Interactive Diagram -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Interactive Diagram</h2>
            <p class="text-gray-600 mb-6">Click on each phase to learn more</p>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- SVG Diagram -->
                <div class="lg:col-span-2 diagram-container">
                    <svg viewBox="0 0 500 400" class="w-full h-auto">
                        <!-- Requirements Planning -->
                        <g class="diagram-phase"
                           data-phase="Requirements Planning"
                           data-description="High-level requirements gathering with user participation. Define scope and constraints through workshops and JAD sessions.">
                            <rect x="175" y="20" width="150" height="60" fill="#10b981" rx="8" />
                            <text x="250" y="45" text-anchor="middle" fill="white" font-size="13" font-weight="bold">Requirements</text>
                            <text x="250" y="62" text-anchor="middle" fill="white" font-size="13" font-weight="bold">Planning</text>
                        </g>

                        <!-- Arrow down -->
                        <path d="M 250 80 L 250 110" stroke="#6b7280" stroke-width="3" marker-end="url(#arrowhead3)" />

                        <!-- User Design -->
                        <g class="diagram-phase"
                           data-phase="User Design"
                           data-description="Intensive workshops with users to design system. Create prototypes and get immediate feedback. Iterate rapidly on design.">
                            <rect x="175" y="110" width="150" height="60" fill="#10b981" rx="8" />
                            <text x="250" y="135" text-anchor="middle" fill="white" font-size="13" font-weight="bold">User Design</text>
                            <text x="250" y="152" text-anchor="middle" fill="white" font-size="13" font-weight="bold">Workshop</text>
                        </g>

                        <!-- User feedback loop -->
                        <path d="M 175 140 Q 100 140 100 140 Q 100 140 175 140" stroke="#22c55e" stroke-width="2" stroke-dasharray="4,4" fill="none" />
                        <text x="90" y="135" fill="#10b981" font-size="11">User</text>
                        <text x="85" y="147" fill="#10b981" font-size="11">Feedback</text>

                        <!-- Arrow down -->
                        <path d="M 250 170 L 250 200" stroke="#6b7280" stroke-width="3" marker-end="url(#arrowhead3)" />

                        <!-- Rapid Construction -->
                        <g class="diagram-phase"
                           data-phase="Rapid Construction"
                           data-description="Build the system using automated tools, code generators, and reusable components. Develop in short timeboxed iterations.">
                            <rect x="175" y="200" width="150" height="60" fill="#10b981" rx="8" />
                            <text x="250" y="225" text-anchor="middle" fill="white" font-size="13" font-weight="bold">Rapid</text>
                            <text x="250" y="242" text-anchor="middle" fill="white" font-size="13" font-weight="bold">Construction</text>
                        </g>

                        <!-- Prototyping cycle -->
                        <path d="M 325 230 Q 380 230 380 140 Q 380 50 325 50" stroke="#22c55e" stroke-width="2" stroke-dasharray="4,4" fill="none" marker-end="url(#arrowhead4)" />
                        <text x="385" y="135" fill="#10b981" font-size="11">Prototype</text>
                        <text x="390" y="147" fill="#10b981" font-size="11">Cycle</text>

                        <!-- Arrow down -->
                        <path d="M 250 260 L 250 290" stroke="#6b7280" stroke-width="3" marker-end="url(#arrowhead3)" />

                        <!-- Cutover -->
                        <g class="diagram-phase"
                           data-phase="Cutover"
                           data-description="Final testing, user training, and system deployment. Transition from development to production environment.">
                            <rect x="175" y="290" width="150" height="60" fill="#10b981" rx="8" />
                            <text x="250" y="315" text-anchor="middle" fill="white" font-size="13" font-weight="bold">Cutover</text>
                            <text x="250" y="332" text-anchor="middle" fill="white" font-size="13" font-weight="bold">(Deployment)</text>
                        </g>

                        <!-- Arrow marker definitions -->
                        <defs>
                            <marker id="arrowhead3" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                                <polygon points="0 0, 10 5, 0 10" fill="#6b7280" />
                            </marker>
                            <marker id="arrowhead4" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                                <polygon points="0 0, 10 5, 0 10" fill="#22c55e" />
                            </marker>
                        </defs>
                    </svg>
                </div>

                <!-- Phase Info Panel -->
                <div class="lg:col-span-1">
                    <div class="bg-green-50 rounded-lg p-6 sticky top-24">
                        <div id="phase-info">
                            <h3 class="text-xl font-bold text-green-600 mb-2">Select a Phase</h3>
                            <p class="text-gray-700">Click on any phase in the diagram to see its description.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Advantages -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">✅ Advantages</h2>
            <ul class="space-y-3">
                <li class="flex items-start">
                    <span class="text-green-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Extremely fast development:</strong> Delivers working systems in 60-90 days using rapid techniques and automated tools.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>High user involvement:</strong> Users actively participate throughout, ensuring the system meets their actual needs.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Reduced risk:</strong> Early prototypes help identify issues before significant resources are committed.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Reusability:</strong> Encourages use of reusable components and automated code generation tools.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-green-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Better quality:</strong> Continuous testing and user feedback lead to higher quality final products.</span>
                </li>
            </ul>
        </div>

        <!-- Disadvantages -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">❌ Disadvantages</h2>
            <ul class="space-y-3">
                <li class="flex items-start">
                    <span class="text-red-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Requires skilled developers:</strong> Team must be experienced with RAD tools, techniques, and rapid development methods.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-red-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Needs user commitment:</strong> Requires significant time investment from users for workshops and feedback sessions.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-red-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Not suitable for all projects:</strong> Works best for modular systems; difficult for large, complex, or highly integrated systems.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-red-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Requires modular design:</strong> System must be componentized, which may not suit all application types.</span>
                </li>
                <li class="flex items-start">
                    <span class="text-red-500 mr-3 text-xl">•</span>
                    <span class="text-gray-700"><strong>Can be more expensive:</strong> Requires specialized tools and highly skilled developers, increasing costs.</span>
                </li>
            </ul>
        </div>

        <!-- Appropriate Contexts -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">🎯 When to Use RAD</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-green-50 p-6 rounded-lg">
                    <h3 class="font-bold text-green-800 mb-2">✓ Ideal For:</h3>
                    <ul class="space-y-2 text-gray-700">
                        <li>• Projects with tight time constraints (2-3 months)</li>
                        <li>• Applications that can be modularized</li>
                        <li>• Projects with available, committed users</li>
                        <li>• Systems requiring high user involvement</li>
                        <li>• Business applications with clear objectives</li>
                        <li>• Projects using reusable components</li>
                    </ul>
                </div>
                <div class="bg-red-50 p-6 rounded-lg">
                    <h3 class="font-bold text-red-800 mb-2">✗ Avoid For:</h3>
                    <ul class="space-y-2 text-gray-700">
                        <li>• Large-scale, highly complex systems</li>
                        <li>• Projects with low user availability</li>
                        <li>• Systems requiring extensive integration</li>
                        <li>• Projects with inexperienced developers</li>
                        <li>• Safety-critical or high-risk systems</li>
                        <li>• Projects without modular structure</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between items-center mt-12">
            <a href="iterative.html" class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition">
                ← Previous: Iterative
            </a>
            <a href="quiz.html" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
                Test Your Knowledge →
            </a>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-gray-400">Based on Textbook Section 12.1 | A Level Computer Science</p>
        </div>
    </footer>

    <script src="assets/js/diagrams.js"></script>
</body>
</html>
```

**Step 2: Verify RAD page**

Run: `start rad.html`

Expected:
- RAD page loads with diagram
- Interactive diagram phases work
- All content visible

**Step 3: Commit**

```bash
git add rad.html
git commit -m "feat: add RAD model page with rapid development cycle diagram"
```

---

## Task 9: Quiz Page

**Files:**
- Create: `quiz.html`

**Step 1: Create quiz page**

> **Note:** You need to manually read `program-development-life-cycle-nqptztXwTZF6jm32.pdf` and extract the questions, then add them to the quiz page below. Replace the placeholder questions with actual content from the PDF.

Create `/c/Claude/webdesign/Development life cycle/quiz.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz | PDLC</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex-shrink-0">
                    <h1 class="text-xl font-bold text-gray-800">PDLC Overview</h1>
                </div>
                <div class="flex space-x-8">
                    <a href="index.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Home</a>
                    <a href="waterfall.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Waterfall</a>
                    <a href="iterative.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Iterative</a>
                    <a href="rad.html" class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">RAD</a>
                    <a href="quiz.html" class="nav-active text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition">Quiz</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Page Header -->
    <div class="bg-gradient-to-r from-orange-500 to-orange-700 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold mb-2">📝 Test Your Knowledge</h1>
            <p class="text-xl opacity-90">Practice questions on PDLC models</p>
        </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- Instructions -->
        <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h2 class="font-bold text-blue-800 mb-2">Instructions</h2>
            <p class="text-blue-700">
                Read each question carefully. Click "Show Answer" to reveal the answer.
                Use the "Reset Quiz" button to hide all answers and start fresh.
            </p>
        </div>

        <!-- Reset Button -->
        <div class="text-right mb-6">
            <button id="reset-quiz" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition">
                Reset All Answers
            </button>
        </div>

        <!-- Questions -->

        <!-- Question 1 -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div class="flex items-start mb-4">
                <span class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">1</span>
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">
                        <!-- TODO: Replace with actual question from PDF -->
                        What is the main characteristic of the Waterfall model that distinguishes it from other development methodologies?
                    </h3>
                </div>
            </div>
            <button class="show-answer-btn btn-primary px-6 py-2 rounded-lg font-medium" data-question-id="1">
                Show Answer
            </button>
            <div id="answer-1" class="answer-hidden mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <img src="assets/images/answers/Screenshot 2026-02-28 170000.png" alt="Answer to question 1" class="w-full max-w-2xl rounded shadow">
            </div>
        </div>

        <!-- Question 2 -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div class="flex items-start mb-4">
                <span class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">2</span>
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">
                        <!-- TODO: Replace with actual question from PDF -->
                        Describe the key advantages of using the Iterative development approach.
                    </h3>
                </div>
            </div>
            <button class="show-answer-btn btn-primary px-6 py-2 rounded-lg font-medium" data-question-id="2">
                Show Answer
            </button>
            <div id="answer-2" class="answer-hidden mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <img src="assets/images/answers/Screenshot 2026-02-28 170201.png" alt="Answer to question 2" class="w-full max-w-2xl rounded shadow">
            </div>
        </div>

        <!-- Question 3 -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div class="flex items-start mb-4">
                <span class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">3</span>
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">
                        <!-- TODO: Replace with actual question from PDF -->
                        In what situations would RAD (Rapid Application Development) be the most appropriate choice?
                    </h3>
                </div>
            </div>
            <button class="show-answer-btn btn-primary px-6 py-2 rounded-lg font-medium" data-question-id="3">
                Show Answer
            </button>
            <div id="answer-3" class="answer-hidden mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <img src="assets/images/answers/Screenshot 2026-02-28 170230.png" alt="Answer to question 3" class="w-full max-w-2xl rounded shadow">
            </div>
        </div>

        <!-- Question 4 -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div class="flex items-start mb-4">
                <span class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 flex-shrink-0">4</span>
                <div>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">
                        <!-- TODO: Replace with actual question from PDF -->
                        Compare and contrast the Waterfall and Iterative models. What are the main differences?
                    </h3>
                </div>
            </div>
            <button class="show-answer-btn btn-primary px-6 py-2 rounded-lg font-medium" data-question-id="4">
                Show Answer
            </button>
            <div id="answer-4" class="answer-hidden mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <img src="assets/images/answers/Screenshot 2026-02-28 170254.png" alt="Answer to question 4" class="w-full max-w-2xl rounded shadow">
            </div>
        </div>

        <!-- Back to Home -->
        <div class="text-center mt-12">
            <a href="index.html" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium inline-block transition">
                ← Back to Home
            </a>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p class="text-gray-400">Based on Textbook Section 12.1 | A Level Computer Science</p>
        </div>
    </footer>

    <script src="assets/js/quiz.js"></script>
</body>
</html>
```

**Step 2: Read PDF and update questions**

Action required:
1. Open `program-development-life-cycle-nqptztXwTZF6jm32.pdf`
2. Extract the actual questions
3. Replace the placeholder question text in `quiz.html` with real questions
4. Ensure answer screenshot numbers match questions

**Step 3: Verify quiz page**

Run: `start quiz.html`

Expected:
- Quiz page loads
- Can click "Show Answer" to reveal screenshots
- "Hide Answer" works to hide them again
- "Reset All Answers" button works

**Step 4: Commit**

```bash
git add quiz.html
git commit -m "feat: add quiz page with answer reveal functionality"
```

---

## Task 10: Create README

**Files:**
- Create: `README.md`

**Step 1: Create documentation**

Create `/c/Claude/webdesign/Development life cycle/README.md`:

```markdown
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
```

**Step 2: Verify README**

Run: `cat README.md | head -20`

Expected: README content displayed

**Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add comprehensive README with usage instructions"
```

---

## Task 11: Final Testing

**Files:**
- None (testing only)

**Step 1: Test home page**

Run: `start index.html`

Checklist:
- [ ] Page loads without errors
- [ ] Navigation links work
- [ ] Three model cards are clickable
- [ ] Quiz CTA button works
- [ ] Responsive on smaller window size

**Step 2: Test each model page**

Run: `start waterfall.html`

Checklist:
- [ ] Interactive diagram phases are clickable
- [ ] Phase info panel updates when clicked
- [ ] Advantages/disadvantages sections visible
- [ ] Use cases section visible
- [ ] Navigation buttons work

Repeat for `iterative.html` and `rad.html`

**Step 3: Test quiz page**

Run: `start quiz.html`

Checklist:
- [ ] All questions visible
- [ ] "Show Answer" buttons work
- [ ] Answer screenshots appear correctly
- [ ] "Hide Answer" works
- [ ] "Reset All Answers" button works

**Step 4: Test navigation flow**

Test complete user journey:
1. Home → Waterfall → Next → Iterative → Next → RAD → Quiz → Home
2. Verify all links work correctly
3. Check that nav highlights active page

**Step 5: Test responsiveness**

Resize browser window to mobile size (375px width)

Checklist:
- [ ] Navigation doesn't break
- [ ] Content is readable
- [ ] Images scale properly
- [ ] Diagrams are usable (may need horizontal scroll)

**Step 6: Document any issues**

If issues found, create new commits to fix them before proceeding to deployment.

---

## Task 12: GitHub Repository Setup

**Files:**
- None (GitHub setup)

**Step 1: Create GitHub repository**

Run:
```bash
cd "/c/Claude/webdesign/Development life cycle"
"/c/Program Files/GitHub CLI/gh.exe" repo create pdlc-presentation --public --description "Program Development Life Cycle educational presentation website" --source=. --remote=origin --push
```

Expected: Repository created and code pushed

**Step 2: Verify repository**

Run:
```bash
"/c/Program Files/GitHub CLI/gh.exe" repo view --web
```

Expected: Browser opens to your new GitHub repository

**Step 3: Check files on GitHub**

Visit: `https://github.com/Dyorus/pdlc-presentation`

Verify all files are present:
- index.html
- waterfall.html, iterative.html, rad.html
- quiz.html
- assets/ folder with css, js, images
- README.md

---

## Task 13: Enable GitHub Pages

**Files:**
- None (GitHub settings)

**Step 1: Enable GitHub Pages via CLI**

Run:
```bash
"/c/Program Files/GitHub CLI/gh.exe" api repos/Dyorus/pdlc-presentation/pages -X POST -f source[branch]=master -f source[path]=/
```

Expected: GitHub Pages enabled

**Alternative: Manual Setup**

If CLI command fails:
1. Go to `https://github.com/Dyorus/pdlc-presentation/settings/pages`
2. Under "Source", select **Branch: master** and **/ (root)**
3. Click **Save**

**Step 2: Wait for deployment**

GitHub Pages takes 1-2 minutes to build and deploy.

Check status:
```bash
"/c/Program Files/GitHub CLI/gh.exe" api repos/Dyorus/pdlc-presentation/pages
```

**Step 3: Get your live URL**

Your site will be live at:
```
https://Dyorus.github.io/pdlc-presentation/
```

**Step 4: Test live site**

Visit the URL and verify:
- [ ] Home page loads
- [ ] All navigation works
- [ ] Model pages load correctly
- [ ] Interactive diagrams work
- [ ] Quiz page shows answers
- [ ] No broken links or images

**Step 5: Share with teacher**

Copy the URL and share it:
```
https://Dyorus.github.io/pdlc-presentation/
```

---

## Task 14: Final Commit

**Files:**
- Update `README.md` with live URL

**Step 1: Update README with live URL**

Edit `/c/Claude/webdesign/Development life cycle/README.md` line 11:

```markdown
**GitHub Pages URL:** https://Dyorus.github.io/pdlc-presentation/
```

**Step 2: Commit and push**

```bash
git add README.md
git commit -m "docs: add live GitHub Pages URL to README"
git push origin master
```

**Step 3: Verify final deployment**

Wait 30 seconds, then visit:
```
https://Dyorus.github.io/pdlc-presentation/
```

Expected: Updated README visible on GitHub

---

## Summary

**Implementation Complete!**

You now have:
✅ Multi-page educational website about PDLC models
✅ Interactive SVG diagrams for Waterfall, Iterative, and RAD
✅ Quiz section with answer reveal functionality
✅ Professional, academic design
✅ Responsive layout for all devices
✅ Live on GitHub Pages with shareable URL
✅ Full documentation in README

**Next Steps:**
1. Read `program-development-life-cycle-nqptztXwTZF6jm32.pdf`
2. Replace placeholder quiz questions with actual content
3. Practice your 5-10 minute presentation walkthrough
4. Share URL with teacher: `https://Dyorus.github.io/pdlc-presentation/`

**Files Created:**
- 6 HTML pages (index, waterfall, iterative, rad, quiz, README)
- 1 CSS file (styles.css)
- 2 JS files (diagrams.js, quiz.js)
- 1 .gitignore
- 2 documentation files (design doc, implementation plan)

**Total Estimated Time:** 2-3 hours for implementation
