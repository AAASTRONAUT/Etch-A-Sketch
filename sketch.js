const grid = document.querySelector(".grid");

function createGrid(size) {
    for (let rowNumber = 1; rowNumber <= size; rowNumber++) {
        const row = document.createElement('div');
        row.classList.add('box');
        grid.appendChild(row);
        for (let boxNumber = 1; boxNumber <= size ; boxNumber++) {
            const box = document.createElement('div');
            box.classList.add('box');
            box.classList.add('select');
            row.appendChild(box);
        }
    }
}

//size of Grid
const slider=document.querySelector(".slider");
const gridSize = document.querySelector(".sizeValue");
gridSize.textContent = `${slider.value}X${slider.value}`;
createGrid(16);
let boxes = document.querySelectorAll('.select');
slider.oninput = () => {
    sizeNum = slider.value;
    grid.innerHTML = ''; //remove the existing grid
    if (sizeNum==0) {
        gridSize.textContent = '1X1';
        createGrid(1);
    }
    else{
        gridSize.textContent = `${sizeNum}X${sizeNum}`;
        createGrid(sizeNum);
    }
    boxes = document.querySelectorAll('.select');
    fillColor();
};

//showGrid button
const showGridBtn = document.querySelector('#showGridBtn');
showGridBtn.onclick = () => {
    showGridBtn.classList.toggle('onClick');
    boxes.forEach((box) => box.classList.toggle('border'));
};

// program for colouring the grid.
const colorSetter = (e) => {
    if (mode=='rainbow') {
        let red = Math.floor(Math.random()*256);
        let green = Math.floor(Math.random()*256);
        let blue = Math.floor(Math.random()*256);
        color = `rgb(${red}, ${green}, ${blue})`;
    } 
    else if (mode == 'eraser') color='white';

    else if (mode=='shade') {
        color='';
        //***********************to be completed*******************************
    }
    e.target.style.backgroundColor=color;
};

function colorChanger(e)  {
    if (e.type == 'mousedown') {
        boxes.forEach((box) => box.addEventListener('mouseenter', colorSetter));
        boxes.forEach((box) => box.addEventListener('mousedown', colorSetter));
    }
    else if (e.type == 'mouseup') {
        boxes.forEach((box) => box.removeEventListener('mouseenter', colorSetter));
    }
}
function fillColor() {
    boxes.forEach((box) => {
        box.addEventListener('mousedown', colorChanger);
        box.addEventListener('mouseup', colorChanger);
    });
}
//program for colouring the grid ends here.

//color picker
let mode = 'colorMode';
let alpha = 0.1; // for shade mode
let color = 'black';
let colorPicker = document.querySelector('#colorPicker');
colorPicker.oninput = () => {
    mode='colorMode';
    color=colorPicker.value
    /* fillColor(); */
};

 //eraser button
const eraserBtn = document.querySelector('#eraserBtn');
eraserBtn.onclick = () => {
    mode='eraser';
    /* fillColor(); */
};
 
//rainbow  Button
rainbowBtn = document.querySelector('#rainbowBtn');
rainbowBtn.onclick = () => {
    mode = 'rainbow';
    /* fillColor(); */
};

//shade Button
const shadeBtn = document.querySelector('#shadeBtn');
shadeBtn.onclick = () => {
    mode = 'shade';
    /* fillColor(); */
}; 

//clear button
const clearBtn = document.querySelector('#clearBtn');
clearBtn.onclick = () => {
    boxes.forEach((box) => {box.removeAttribute('style')})
};

// hover and click effect of buttons
menuBtns = document.querySelectorAll('button, #colorPicker');
modeBtns = document.querySelectorAll('.toggleBtn');
menuBtns.forEach((Btn) => {
    Btn.addEventListener('mouseenter', (e) =>{
        Btn.classList.add('onHover');
    });
    Btn.addEventListener('mouseleave', (e) => {
        Btn.classList.remove('onHover');
    });

    Btn.addEventListener( 'mousedown', (e) => {
        modeBtns.forEach( (Btn) => {
            Btn.classList.remove('onClick');
        });
        if (Btn!=document.querySelector('#clearBtn')) Btn.classList.add('onClick');
    });
});

fillColor();  //default color='black'
