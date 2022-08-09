const allButtons = [
    [
        {
            label: '7',
            type: 'number'
        },
        {
            label: '8',
            type: 'number'
        },
        {
            label: '9',
            type: 'number'
        },
        {
            label: '+',
            type: 'operator'
        }
    ],
    [
        {
            label: '4',
            type: 'number'
        },
        {
            label: '5',
            type: 'number'
        },
        {
            label: '6',
            type: 'number'
        },
        {
            label: '-',
            type: 'operator'
        }
    ],
    [
        {
            label: '1',
            type: 'number'
        },
        {
            label: '2',
            type: 'number'
        },
        {
            label: '3',
            type: 'number'
        },
        {
            label: '*',
            type: 'operator'
        }
    ],
    [
        {
            label: '0',
            type: 'number'
        },
        {
            label: '.',
            type: 'special'
        },
        {
            label: '=',
            type: 'special'
        },
        {
            label: '/',
            type: 'operator'
        }
    ]
];
const buttonContainerDOM = document.querySelector('.button-container');
const renderButton = (data) => {
    buttonContainerDOM.innerHTML = data.map(row => {
        return `<div class="button-wrapper">
            ${row.map(button => `<button 
                    class="button" 
                    onclick="onButtonClick('${button.type}', '${button.label}')"
                >
                    ${button.label}
                </button>`).join('')}
        </div>`;
    }).join('');
};
renderButton(allButtons);
// make a calculator
const prevResultDOM = document.querySelector('#prev-result');
const currentResultDOM = document.querySelector('#result');
// copilot tự sinh
const calculate = (prevResult, currentResult, type) => {
    if (type === 'number') {
        return currentResult === '0' ? currentResult + prevResult : currentResult + prevResult;
    }
    else if (type === 'operator') {
        return currentResult;
    }
    return currentResult;
};
// copilot tự sinh
const updateDisplay = (prevResult, currentResult) => {
    prevResultDOM.textContent = prevResult;
    currentResultDOM.textContent = currentResult;
};
// test linh tinh
const onButtonClick = (type, label) => {
    currentResultDOM.textContent += label;
};
