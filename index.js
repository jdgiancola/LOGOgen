const fs = require('fs');
const readline = require('readline');
let inquirer;

import('inquirer').then(module => {
    inquirer = module.default;

    const promptText = async () => {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'text',
                message: 'Enter text for the logo (up to 3 characters):',
                validate: (input) => {
                    if (input.length <= 3) {
                        return true;
                    }
                    return 'Please enter up to 3 characters only.';
                }
            }
        ]);
    };

    const promptColor = async (text) => {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'color',
                message: `Enter ${text} color (color keyword OR hexadecimal):`
            }
        ]);
    };

    const promptShape = async () => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'shape',
                message: 'Choose a shape:',
                choices: ['circle', 'triangle', 'square'],
                filter: (val) => val.toLowerCase()
            }
        ]);
    };

    const generateSVG = async () => {
        const { text } = await promptText();
        const { color: textColor } = await promptColor('text');
        const { shape } = await promptShape();
        const { color: shapeColor } = await promptColor('shape');

        let svgContent = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;
        svgContent += `<rect width="300" height="200" fill="white"/>`;

        if (shape === 'circle') {
            svgContent += `<circle cx="150" cy="100" r="80" fill="${shapeColor}"/>`;
        } else if (shape === 'square') {
            svgContent += `<rect x="75" y="25" width="150" height="150" fill="${shapeColor}"/>`;
        } else if (shape === 'triangle') {
            svgContent += `<polygon points="150,25 75,175 225,175" fill="${shapeColor}"/>`;
        }

        svgContent += `<text x="150" y="110" font-family="Arial" font-size="48" fill="${textColor}" text-anchor="middle">${text}</text>`;
        svgContent += `</svg>`;

        fs.writeFileSync('logo.svg', svgContent);

        console.log('Generated logo.svg');
    };

    generateSVG();

});
