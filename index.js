// displays the slider value 
let slider = document.querySelector('.slider input')
let value = document.querySelector('.slider .value')
let alteredColor = document.querySelector('.altered-block')
let alteredColorText = document.querySelector('.alteredColorText')

slider.addEventListener('input', () => {
    if (!isValidHex(inputColor.value)) return;


    value.textContent = `${slider.value}%`;

    const alteredHex = alterColor(inputColor.value, slider.value);
    alteredColor.style.backgroundColor = alteredHex;
    alteredColorText.innerText = `Altered Color ${alteredHex}`;

})

//checks if its valid Hex


let inputColor = document.querySelector('.hex-input')
let colorBlock = document.querySelector('.color-block')


//function to check if hex is a valid Hex.
const isValidHex = (hex) => {
    if (!hex) return false;

    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}


// if it has a stripped hex, it will replace the colorBlock background for the selected hex color
inputColor.addEventListener('keyup', () => {
    const hex = inputColor.value
    if (!isValidHex(hex)) return;

    const strippedHex = hex.replace('#', '');
    /* if the number does not include a # 
     it will be added to the start */
    colorBlock.style.backgroundColor = "#" + strippedHex;

})


//function to convert hex to rbg

const convertHexToRGB = (hex) => {
    if (!isValidHex(hex)) return null;

    let strippedHex = hex.replace('#', '');

    if (strippedHex.length === 3) {
        strippedHex = strippedHex + strippedHex[0] +
            strippedHex[1] + strippedHex[1] +
            strippedHex[2] + strippedHex[2];
    }

    const r = parseInt(strippedHex.substring(0, 2), 16);
    const g = parseInt(strippedHex.substring(2, 4), 16);
    const b = parseInt(strippedHex.substring(4, 6), 16);

    return {
        r,
        g,
        b
    }
}
//function to convert rgb to rbg

const convertRGBtoHex = (r, g, b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const SecondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);

    const hex = "#" + firstPair + SecondPair + thirdPair;
    return hex
}


//function to create an alter color

const alterColor = (hex, percentage) => {
    const {
        r,
        g,
        b
    } = convertHexToRGB(hex);

    const amount = Math.floor((percentage / 100) * 255);

    const newR = increaseWithinRange0To255(r, amount);
    const newG = increaseWithinRange0To255(g, amount);
    const newB = increaseWithinRange0To255(b, amount);
    return convertRGBtoHex(newR, newG, newB);

}

const increaseWithinRange0To255 = (hex, amount) => {
    return Math.min(255, Math.max(0, hex + amount))
}