/* Add the event handler to our button */
document.getElementById('btn-Calculate')
    .addEventListener('click', calculate, false);

/* Set the sales tax for the selected state */
document.getElementById('State').addEventListener('change', function(e) {
    document.getElementById('SalesTax').value = e.target.value;
    console.log(e.target.value)
})

/* Only allow numeric values */
function isNumericKey(evt)
{
    let charCode = (evt) ? evt : evt.keyCode;
    return charCode !== 46 && charCode > 31
        && (charCode < 48 || charCode > 57);
}

/* Calculate the monthly payments, interest payed, and total loan amount */
function calculate() {

    /* Get the input field values */
    const uCarPrice = document.getElementById('CarPrice').value;
    let uInterestRate = document.getElementById('InterestRate').value;
    const uTermLength = document.getElementById('TermLength').value;
    let uDownPayment = document.getElementById('DownPayment').value;
    let uTradeIn = document.getElementById('Trade-in').value;
    let uSalesTax = document.getElementById('SalesTax').value;

    if (uDownPayment <= 0 || uDownPayment === undefined) { uDownPayment = 0 }
    if (uTradeIn <= 0 || uTradeIn === undefined) { uDownPayment = 0 }
    if (uSalesTax <= 0 || uSalesTax === undefined) { uDownPayment = 0 }

    uDownPayment = parseFloat(uDownPayment)
    uTradeIn = parseFloat(uTradeIn)
    uSalesTax = parseFloat(uSalesTax)

    let xCarPrice = parseFloat(uCarPrice) - uDownPayment - uTradeIn;

    /* The interest rate must be greater */
    if (uInterestRate <= 0 || uInterestRate == "") { uInterestRate = 0.000001; }
    const xInterestRate = parseFloat(uInterestRate) / 100 / 12;
    const xTermLength = parseFloat(uTermLength);


    /* Monthly Payment */
    const x = Math.pow(1 + xInterestRate, xTermLength);
    const monthly = (xCarPrice * x * xInterestRate) / (x -1);
    const monthlyPayment = monthly.toFixed(2);

    /* Total Interest */
    const totalInterest = (monthly * xTermLength - xCarPrice).toFixed(2);

    /* Total Payment */
    const totalPayment = (monthly * xTermLength).toFixed(2);

    /* Update the results */
    document.getElementById("MonthlyPayment").innerHTML = formatCurrency(monthlyPayment);
    document.getElementById("InterestPayed").innerHTML = formatCurrency(totalInterest);
    document.getElementById("TotalLoanAmount").innerHTML = formatCurrency(totalPayment);

}

/* Currency formatting */
function formatCurrency(number)
{
    /* For now only US */
    return new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency'}).format(number)
}

/**
 * Oregon has no sales tax
 * In California, Hawaii, Kentucky, Maryland, Michigan, Montana and Virginia you will pay taxes on the car sales price
 */
function calculateSalesTaxTradeIn(state, xCarPrice, xTradeIn)
{
    const fullValueStates = ["CA", "HI", "KY", "MD", "MI", "MO", "VA"];
    if (fullValueStates.includes(state)) { return xCarPrice; } else { return (xCarPrice - xTradeIn); }
}