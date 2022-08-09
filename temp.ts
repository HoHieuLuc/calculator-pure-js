type ButtonType = 'number' | 'operator' | 'special';

interface BaseButton {
    type: ButtonType;
}

interface NumberButton extends BaseButton {
    type: 'number';
    label: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0';
}

interface OperatorButton extends BaseButton {
    type: 'operator';
    label: '+' | '-' | '*' | '/';
}

interface SpecialButton extends BaseButton {
    type: 'special';
    label: '=' | '.';
}

type Button = NumberButton | OperatorButton | SpecialButton;

type Buttons = Array<Button>;

const allButtons: Array<Buttons> = [
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

const buttonContainerDOM = document.querySelector('.button-container')!;

const renderButton = (data: Array<Buttons>) => {
    buttonContainerDOM.innerHTML = data.map(row => {
        return `<div class="button-wrapper">
            ${row.map(button =>
                `<button 
                    class="button" 
                    onclick="onButtonClick('${button.type}', '${button.label}')"
                >
                    ${button.label}
                </button>`
                ).join('')}
        </div>`;
    }).join('');
};

renderButton(allButtons);

// make a calculator
const prevResultDOM = document.querySelector('#prev-result')!;
const currentResultDOM = document.querySelector('#result')!;

// copilot tự sinh
const calculate = (prevResult: string, currentResult: string, type: ButtonType) => {
    if (type === 'number') {
        return currentResult === '0' ? currentResult + prevResult : currentResult + prevResult;
    } else if (type === 'operator') {
        return currentResult;
    } 
    return currentResult;
}

// copilot tự sinh
const updateDisplay = (prevResult: string, currentResult: string) => {
    prevResultDOM.textContent = prevResult;
    currentResultDOM.textContent = currentResult;
}

// test linh tinh
const onButtonClick = (type: Button['type'], label: Button['label']) => {
    currentResultDOM.textContent += label;   
}
// tsc .\temp.ts -t es2022 
// xóa dòng export{} này bên file temp.js sau khi compile
export {}