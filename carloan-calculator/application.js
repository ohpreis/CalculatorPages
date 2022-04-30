/* Add the event handler to our button */
document.getElementById('btn-Calculate')
    .addEventListener('click', calculate, false);

/* Only allow numeric values */
function isNumericKey(evt)
{
    let charCode = (evt) ? evt : evt.keyCode;
    return charCode !== 46 && charCode > 31
        && (charCode < 48 || charCode > 57);
}

/* Calculate the monthly payments, interest payed, and total loan amount */
function calculate() {

    const xPrincipal = parseFloat(document.getElementById('Principal').value);
    const xInterestRate = parseFloat(document.getElementById('InterestRate').value) / 100 / 12;
    const xTermLength = parseFloat(document.getElementById('TermLength').value);

    /* Monthly Payment */
    const x = Math.pow(1 + xInterestRate, xTermLength);
    const monthly = (xPrincipal * x * xInterestRate) / (x -1);
    const monthlyPayment = monthly.toFixed(2);

    /* Total Interest */
    const totalInterest = (monthly * xTermLength - xPrincipal).toFixed(2);

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