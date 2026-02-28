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
