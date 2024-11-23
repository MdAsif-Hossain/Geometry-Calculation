document.addEventListener('DOMContentLoaded', () => {
    const shapeSelector = document.getElementById('shape-selector');
    const inputsContainer = document.getElementById('inputs-container');
    const calculateBtn = document.getElementById('calculate-btn');
    const result = document.getElementById('result');

    const shapes = {
        parallelogram: ['Base (b)', 'Height (h)'],
        ellipse: ['Major Axis (a)', 'Minor Axis (b)'],
        rhombus: ['Diagonal 1 (d₁)', 'Diagonal 2 (d₂)'],
        rectangle: ['Width (w)', 'Length (l)'],
        pentagon: ['Perimeter (p)', 'Base (b)'],
        triangle: ['Base (b)', 'Height (h)']
    };

    const areaFormulas = {
        parallelogram: (b, h) => b * h,
        ellipse: (a, b) => Math.PI * a * b,
        rhombus: (d1, d2) => 0.5 * d1 * d2,
        rectangle: (w, l) => w * l,
        pentagon: (p, b) => 0.5 * p * b,
        triangle: (b, h) => 0.5 * b * h
    };

    shapeSelector.addEventListener('change', () => {
        const shape = shapeSelector.value;
        inputsContainer.innerHTML = '';

        if (shape && shapes[shape]) {
            shapes[shape].forEach(label => {
                const inputField = document.createElement('div');
                inputField.className = 'flex flex-col';
                inputField.innerHTML = `
                    <label class="text-gray-600 font-medium">${label}</label>
                    <input type="number" class="p-2 border rounded-md" placeholder="${label}">
                `;
                inputsContainer.appendChild(inputField);
            });
        }
    });

    calculateBtn.addEventListener('click', () => {
        const shape = shapeSelector.value;
        const inputs = Array.from(inputsContainer.querySelectorAll('input')).map(input => parseFloat(input.value));
        if (shape && areaFormulas[shape] && inputs.every(value => !isNaN(value))) {
            const area = areaFormulas[shape](...inputs);
            result.textContent = `Area: ${area.toFixed(2)} cm²`;
        } else {
            result.textContent = 'Please enter valid values for the selected shape.';
        }
    });
});
