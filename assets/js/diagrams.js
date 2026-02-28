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
