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
                    onclick="onButtonClick('${button.label}', '${button.type}')"
                >
                    ${button.label}
                </button>`).join('')}
        </div>`;
    }).join('');
};
renderButton(allButtons);

const prevResultDOM = document.querySelector('#prev-result');
const currentResultDOM = document.querySelector('#result');
const calculate = (prevResult, currentResult, type) => {
    if (type === 'number') {
        return currentResult === '0' ? currentResult + prevResult : currentResult + prevResult;
    }
    else if (type === 'operator') {
        return currentResult;
    }
    else if (type === 'special') {
        return currentResult;
    }
};
const updateDisplay = (prevResult, currentResult) => {
    prevResultDOM.textContent = prevResult;
    currentResultDOM.textContent = currentResult;
};
const onButtonClick = (type, label) => {
    const prevResult = prevResultDOM.textContent;
    const currentResult = currentResultDOM.textContent;
    const newResult = calculate(prevResult, currentResult, type);
    updateDisplay(prevResult, newResult);
};
