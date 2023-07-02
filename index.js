function calcSalaryByMonthlyIncome(monthlyIncome, numChildrenInput, beFlexInput, specialTaxRegimeInput) {
    // 1 
    const income = monthlyIncome ? (+monthlyIncome + beFlexInput) * 14 : 0;
    const taxAnnualContributions = (income * 0.1387).toFixed(2);
    const taxBase = (income - taxAnnualContributions) * (specialTaxRegimeInput ? 0.5 : 1);

    // 2
    let tax = 0;

    if (income > 12000) {
        if (taxBase <= 10000) {
            tax += +(taxBase * 0.09).toFixed(2);
            console.log('tax 1a', tax)
        } else {
            tax += +(10000 * 0.09).toFixed(2);
            console.log('tax 1b', tax)
        }

        if (taxBase > 10000 && taxBase <= 20000) {
            tax += +((taxBase - 10000) * 0.22).toFixed(2);
            console.log('tax 2a', tax)
        } else if (taxBase > 20000) {
            tax += +(10000 * 0.22).toFixed(2);
            console.log('tax 2b', tax)
        }

        if (taxBase > 20000 && taxBase <= 30000) {
            tax += +((taxBase - 20000) * 0.28).toFixed(2);
            console.log('tax 3a', tax)
        } else if (taxBase > 30000) {
            tax += +(10000 * 0.28).toFixed(2);
            console.log('tax 3b', tax)
        }


        if (taxBase > 30000 && taxBase <= 40000) {
            tax += ((taxBase - 30000) * 0.36).toFixed(2);
            console.log('tax 4a', tax)
        } else if (taxBase > 40000) {
            tax += +(10000 * 0.36).toFixed(2);
            console.log('tax 4b', tax)
        }

        if (taxBase > 40000) {
            tax += +((taxBase - 40000) * 0.44).toFixed(2);
            console.log('tax 5', tax)
        }

        // 3 Tax credit:
        // -- EUR 777 for taxpayers without children
        // -- EUR 810 for taxpayers with one child
        // -- EUR 900 for taxpayers with two children
        // -- EUR 1 120 for taxpayers with three children
        // -- EUR 1 340 for taxpayers with four children
        // -- Additional tax credit of EUR 220 per each additional
        // dependent child for taxpayers with five or more children
        let discount;
        if (numChildrenInput == 0) {
            discount = 777
        } else if (numChildrenInput == 1) {
            discount = 810;
        } else if (numChildrenInput == 2) {
            discount = 900;
        } else if (numChildrenInput == 3) {
            discount = 1120;
        } else if (numChildrenInput == 4) {
            discount = 1340;
        } else {
            discount = 1340 + 220 * (numChildrenInput - 4);
        }
        tax = tax - discount;
    }

    // 4
    const res = +((income - tax - taxAnnualContributions) / 14).toFixed(2);
    return {
        monthlySalaryGross: +monthlyIncome,
        monthlySalaryNet: res,
        taxAnnualContributions: taxAnnualContributions,
        taxBase: taxBase,
        childrenNo: numChildrenInput
    };
}

function calc() {
    const salaryInput = document.querySelector('#salaryInput');
    const calcButton = document.querySelector('#calcButton');
    const childrenNoInput = document.querySelector('#numChildrenInput');
    const beFlexInput = document.querySelector('#beFlexInput');
    const specialTaxRegimeInput = document.querySelector('#specialTaxRegimeInput');
    calcButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (salaryInput.value >= 0 && childrenNoInput.value >= 0) {
            const resObj = calcSalaryByMonthlyIncome(+salaryInput.value, +childrenNoInput.value, +beFlexInput.value, +specialTaxRegimeInput.checked);
            showResult(resObj);
        }
    });
}

function showResult(resObj) {

    const resultArea = document.querySelector('#resultArea');
    resultArea.removeAttribute('hidden');
    resultArea.innerHTML = null;

    const grossHeader = document.createElement("h2");
    grossHeader.textContent = 'Gross';
    resultArea.appendChild(grossHeader);

    const hr = document.createElement("hr");
    resultArea.appendChild(hr);

    const yearSalaryGrossOutput = document.createElement("p");
    yearSalaryGrossOutput.textContent = `Annual salary: ${(resObj.monthlySalaryGross * 14).toFixed(2)}`;
    resultArea.appendChild(yearSalaryGrossOutput);

    const monthlySalaryOutput = document.createElement("p");
    monthlySalaryOutput.textContent = `Monthly salary: ${resObj.monthlySalaryGross.toFixed(2)}`;
    resultArea.appendChild(monthlySalaryOutput);

    const netHeader = document.createElement("h2");
    netHeader.textContent = 'Net';
    resultArea.appendChild(netHeader);

    const netHeaderHint = document.createElement("h5");
    netHeaderHint.textContent = 'BeFlex included';
    resultArea.appendChild(netHeaderHint);

    const hr2 = document.createElement("hr");
    resultArea.appendChild(hr2);

    const yearSalaryNetOutput = document.createElement("p");
    yearSalaryNetOutput.textContent = `Annual salary: ${(resObj.monthlySalaryNet * 14).toFixed(2)}`;
    resultArea.appendChild(yearSalaryNetOutput);

    const monthlySalaryNetOutput = document.createElement("p");
    monthlySalaryNetOutput.textContent = `Monthly salary: ${resObj.monthlySalaryNet.toFixed(2)}`;
    resultArea.appendChild(monthlySalaryNetOutput);

}

calc();
