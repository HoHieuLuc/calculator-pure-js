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
            type: 'operator'
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
    buttonContainerDOM.innerHTML = `
        <div class="button-wrapper">
            <button class="button-long" onclick="clearAll()">C</button>
            <button class="button-long" onclick="deleteLast()">CE</button>
        </div>
    ` + data.map((row) => {
        return `
            <div class="button-wrapper">
                ${row.map((button) => `
                    <button 
                        class="button" 
                        onclick="onButtonClick('${button.type}', '${button.label}')"
                    >
                        ${button.label}
                    </button>`).join('')}
            </div>
        `;
    }).join('');
};
renderButton(allButtons);

const deleteLast = () => {
    isEqualButtonPreviouslyClicked = false;
    if (currentResultDOM.textContent.toLowerCase().includes('error')) {
        currentResultDOM.textContent = '';
        return;
    }
    currentResultDOM.textContent = currentResultDOM.textContent.slice(0, -1);
};

const clearAll = () => {
    isEqualButtonPreviouslyClicked = false;
    currentResultDOM.textContent = '';
    prevExpressionDOM.textContent = '';
};

const prevExpressionDOM = document.querySelector('#prev-expression');
const currentResultDOM = document.querySelector('#result');

let isEqualButtonPreviouslyClicked = false;
const onButtonClick = (type, label) => {
    // if the equal button is previously clicked
    // and the clicked button's type is "number"
    // replace the current result
    if (isEqualButtonPreviouslyClicked && type === 'number') {
        currentResultDOM.textContent = label;
        isEqualButtonPreviouslyClicked = false;
        return;
    }
    try {
        // the equal button is clicked
        if (type === 'special') {
            prevExpressionDOM.textContent = currentResultDOM.textContent;
            /* the expression doesn't contain letter => valid */
            if (currentResultDOM.textContent.match(/[a-zA-Z]/g) === null) {
                const result = eval(currentResultDOM.textContent);
                if (result === Infinity || result === -Infinity) {
                    currentResultDOM.textContent = 'Overflow error';
                }
                else {
                    const BILLION = 1000000000;
                    currentResultDOM.textContent = `${Math.round(result * BILLION) / BILLION}`;
                }
            }
            else {
                currentResultDOM.textContent = 'Syntax error';
            }
            isEqualButtonPreviouslyClicked = true;
            return;
        }
        // other buttons are clicked
        isEqualButtonPreviouslyClicked = false;
        if (currentResultDOM.textContent.toLowerCase().includes('error')) {
            currentResultDOM.textContent = '';
        }
        if (currentResultDOM.textContent.length < 21) {
            currentResultDOM.textContent += label;
        }
    }
    catch (e) {
        currentResultDOM.textContent = 'Syntax error';
    }
};
