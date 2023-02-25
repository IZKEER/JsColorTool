// displays the slider value 
let slider = document.querySelector('.slider input')
let value = document.querySelector('.slider .value')

slider.addEventListener('input', () => {
    value.textContent = slider.value;
})