let c1 = document.getElementById("colour1");
let c2 = document.getElementById("colour2");
let c3 = document.getElementById("colour3");
let c4 = document.getElementById("colour4");

let mainDiv = document.getElementById("wrapper");

let colours = [];
let length = 9;

let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

setInterval(refresh, 3000);
//refresh();

function refresh(){
    colours = [];
    let colour1 = hexToRGB(c1.value);
    let colour2 = hexToRGB(c2.value);
    let colour3 = hexToRGB(c3.value);
    let colour4 = hexToRGB(c4.value);
    
    let diffTop = getDiff(colour1, colour2);
    let diffBottom = getDiff(colour3, colour4);
    
    let r = 0;
    let g = 0;
    let b = 0;
    
    for(let i=0; i<=length; i++){
        colours.push(`<div class="colour-row">`)
        for(let j=0; j<=length; j++){
            r = Math.round(colour1[0] + j*diffTop[0] + i*((colour3[0]+j*diffBottom[0] - colour1[0]-j*diffTop[0])/length));
            g = Math.round(colour1[1] + j*diffTop[1] + i*((colour3[1]+j*diffBottom[1] - colour1[1]-j*diffTop[1])/length));
            b = Math.round(colour1[2] + j*diffTop[2] + i*((colour3[2]+j*diffBottom[2] - colour1[2]-j*diffTop[2])/length));
            colours.push(`<p class="colour-box" style="background: rgb(${r}, ${g}, ${b});">${rgbToHex(r, g, b)}</p>`);
        }
        colours.push(`</div>`);
    }
    c1.textContent = rgbToHex(c1.value);
    c2.textContent = rgbToHex(c1.value);
    c3.textContent = rgbToHex(c1.value);
    c4.textContent = rgbToHex(c1.value);
    
    mainDiv.innerHTML = colours.join("");
}

function getDiff(c1, c2){
    let r = c2[0]-c1[0];
    let g = c2[1]-c1[1];
    let b = c2[2]-c1[2];
    return [r/length, g/length, b/length];
}

function hexToRGB(c){
    c = String(c);
    let r = c.substring(1, 3);
    let g = c.substring(3, 5);
    let b = c.substring(5, 7);
    r = hexToDec(r);
    g = hexToDec(g);
    b = hexToDec(b);
    return [r, g, b];
}

function rgbToHex(r, g, b){
    return `#${decToHex(r)}${decToHex(g)}${decToHex(b)}`
}

function hexToDec(num){
    let sum = 0;
    for(let i=0; i<hex.length; i++){
        let current = hex[i];
        if(num.charAt(0) == current){
            sum += hex.indexOf(current) * 16;
        }
        if(num.charAt(1) == current){
            sum += hex.indexOf(current);
        }
    }
    return sum;
}

function decToHex(num){
    let sum = "";
    let first = Math.floor(num/16);
    let second = num%16;
    sum = hex[first] + hex[second];
    return sum;
}