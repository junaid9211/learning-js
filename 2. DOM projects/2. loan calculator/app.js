
const loading = document.getElementById('loading');
const results = document.getElementById('results');

const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const yearsToRepay = document.getElementById('years');

const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');
const calculateBtn = document.querySelector('#loan-form');

calculateBtn.addEventListener('submit', submitEvent);


function submitEvent(e){
  loading.style.display='block';
  results.style.display='none';

  e.preventDefault();
  setTimeout(calculateResults, 1000);
}


function calculateResults(){

  loading.style.display = 'none';

  const principle = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value)/100/12;
  const calculatedPayment = parseFloat(yearsToRepay.value)*12;

  // compute monthly payment
  const x = Math.pow(1+calculatedInterest, calculatedPayment);
  const monthly = (principle*x*calculatedInterest)/(x-1);

  if (isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly*calculatedPayment).toFixed(2);
    totalInterest.value = ((monthly*calculatedPayment)-principle).toFixed(2);
    results.style.display='block'
  } else {

    showError('Please check your numbers');
    setTimeout(clearError, 3000);
  }
}


function showError(message){
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(message));

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  card.insertBefore(errorDiv, heading);
}


function clearError(){
  document.querySelector('.alert').remove();
}