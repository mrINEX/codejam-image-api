const canvasS = document.getElementById("myCanvas"); 
const context = canvasS.getContext("2d");
canvasS.width = 512;
canvasS.height = 512;
let pixelSize = 8;
let arraycolor = ["#00ff00"];
context.fillStyle = "white";
context.fillRect(0,0,512,512);
//storage---------------------------------------_
var dataURL = localStorage.getItem(canvasS);
var img = new Image;
img.src = dataURL;
img.onload = function () {
    context.drawImage(img, 0, 0);
};

let cur = document.getElementById("cur");
let pre = document.getElementById("pre");
context.fillStyle = "#00ff00";

let forfill = document.getElementsByClassName('icon fill');
let forchoose = document.getElementsByClassName('icon choose');
let forpencil = document.getElementsByClassName('icon pencil');

let range = document.getElementById("range"); ///newwww
let get = document.getElementById('i'); ///newwwww

cur.addEventListener("input", function(){
    console.log('input change: ', cur.value);
    arraycolor.push(cur.value);

    context.fillStyle = arraycolor[arraycolor.length-1];
    cur.value = arraycolor[arraycolor.length-1];
    pre.style.background = arraycolor[arraycolor.length-2];
})
range.addEventListener("input", function(){
    console.log('input lisner---: ', get.value, range.value);
    getLinkToImage(get.value, range.value);
})

document.addEventListener('click', function(e){
    if(e.target.id === "red"){
        arraycolor.push("#ff0000");
        context.fillStyle = arraycolor[arraycolor.length-1];
        cur.value = arraycolor[arraycolor.length-1];
        pre.style.background = arraycolor[arraycolor.length-2];
    }
    if(e.target.id === "blue"){
        arraycolor.push("#0000ff");
        context.fillStyle = arraycolor[arraycolor.length-1];
        cur.value = arraycolor[arraycolor.length-1];
        pre.style.background = arraycolor[arraycolor.length-2];
    }
    if(e.target.id === "pre" && arraycolor.length > 1){
        arraycolor.pop();
        context.fillStyle = arraycolor[arraycolor.length-1];
        cur.value = arraycolor[arraycolor.length-1];
        pre.style.background = arraycolor[arraycolor.length-2];
    }
    if(e.target.id === "getlink"){
        //let get = document.getElementById('i');
        getLinkToImage(get.value, );
        //console.log('if clicl: ',e, get.value, range.value);
    }
    
    context.fillStyle = arraycolor[arraycolor.length-1];
    cur.value = arraycolor[arraycolor.length-1];
    pre.style.background = arraycolor[arraycolor.length-2];
    console.log('arr: ',arraycolor);
})

document.addEventListener('keydown', function(event){
    if(event.code === "KeyP"){pencil();}
    if(event.code === "KeyB"){fill();}
    if(event.code === "KeyC"){choose();}
})

let isDrawing = false;
let lismd = function(event) {
    context.fillRect(Math.floor(event.layerX / pixelSize) * pixelSize, Math.floor(event.layerY / pixelSize) * pixelSize, pixelSize, pixelSize);
    isDrawing = true;
    console.log('---->', event);
    if(canvasS.width === 512){localStorage.setItem(canvasS, canvasS.toDataURL())}
    //localStorage.setItem(canvasS, canvasS.toDataURL());
}
let lismm = function() {
    if (isDrawing === true) {
        context.fillRect(Math.floor(event.layerX / pixelSize) * pixelSize, Math.floor(event.layerY / pixelSize) * pixelSize, pixelSize, pixelSize);
    }
}
let lismu = function() {
    if (isDrawing === true) {
        if(canvasS.width === 512){localStorage.setItem(canvasS, canvasS.toDataURL())}
        isDrawing = false;
    }
}
    

let fillmd = function(e) {

    //console.log('fill color: ',colo);
    //context.fillRect(0,0,512,512);
    if(forfill[0].style.background === 'grey'){

        // parse from 16 into 10
        let curC = arraycolor[arraycolor.length-1];
        console.log('input -->',curC);
        let rgb = [parseInt(curC.substr(1, 2), 16), parseInt(curC.substr(3, 2), 16), parseInt(curC.substr(5, 2), 16), 255];
        //get imgData
        //var curpointcolorCanvas = context.getImageData(e.layerX, e.layerY, 1, 1);
        //console.log(rgb);
        console.log('for fill: ',rgb);
        //------------ start ---------------------------------------------------
        floodFill(context, e.layerX, e.layerY, rgb);

        function getPixel(imageData, x, y) {
          if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
            return [-1, -1, -1, -1];  // impossible color
          } else {
            const offset = (y * imageData.width + x) * 4;
            return imageData.data.slice(offset, offset + 4);
          }
        }
        
        function setPixel(imageData, x, y, color) {
          const offset = (y * imageData.width + x) * 4;
          imageData.data[offset + 0] = color[0];
          imageData.data[offset + 1] = color[1];
          imageData.data[offset + 2] = color[2];
          imageData.data[offset + 3] = color[0];
        }
        
        function colorsMatch(a, b) {
          return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
        }
        
        function floodFill(ctx, x, y, fillColor) {
          // read the pixels in the canvas
          const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
          
          // get the color we're filling
          const targetColor = getPixel(imageData, x, y);
          
          // check we are actually filling a different color
          if (!colorsMatch(targetColor, fillColor)) {
          
            const pixelsToCheck = [x, y];
            while (pixelsToCheck.length > 0) {
              const y = pixelsToCheck.pop();
              const x = pixelsToCheck.pop();
              
              const currentColor = getPixel(imageData, x, y);
              if (colorsMatch(currentColor, targetColor)) {
                setPixel(imageData, x, y, fillColor);
                pixelsToCheck.push(x + 1, y);
                pixelsToCheck.push(x - 1, y);
                pixelsToCheck.push(x, y + 1);
                pixelsToCheck.push(x, y - 1);
              }
            }
            
            // put the data back
            ctx.putImageData(imageData, 0, 0);
          }
        }
        //------------ end ---------------------------------------------------
    }
    if(canvasS.width === 512){localStorage.setItem(canvasS, canvasS.toDataURL())}
    //localStorage.setItem(canvasS, canvasS.toDataURL());
}

let choosemd = function(e) {
    let intovalue = '#';
    var imgData = context.getImageData(e.layerX, e.layerY, 1, 1);
    for(let i = 0; i < 3; i++){
        if(imgData.data[i] === 0)
            intovalue += '00';
        else
            intovalue += imgData.data[i].toString(16);
    }
    arraycolor.push(intovalue);
}
//function listener---------------------------------------------------------
function pencil(){ //onclick="pencil()"
    //remove
    canvasS.removeEventListener('mousedown', fillmd, false);
    canvasS.removeEventListener('mousedown', choosemd, false);
    //background
    forfill[0].style.background = 'none';
    forchoose[0].style.background = 'none';
    forpencil[0].style.background = 'grey';
    //add
    canvasS.addEventListener('mousedown', lismd, false); 
    canvasS.addEventListener('mousemove', lismm, false);
    canvasS.addEventListener('mouseup', lismu, false);
 }
function fill(){
    //remove
    canvasS.removeEventListener('mousedown', choosemd, false);

    canvasS.removeEventListener('mousedown', lismd, false);
    canvasS.removeEventListener('mousemove', lismm, false);
    canvasS.removeEventListener('mouseup', lismu, false);
    //background
    forfill[0].style.background = 'grey';
    forchoose[0].style.background = 'none';
    forpencil[0].style.background = 'none';
    //add
    canvasS.addEventListener('mousedown', fillmd, false);
}
function choose(){
    //remove
    canvasS.removeEventListener('mousedown', fillmd, false);

    canvasS.removeEventListener('mousedown', lismd, false);
    canvasS.removeEventListener('mousemove', lismm, false);
    canvasS.removeEventListener('mouseup', lismu, false);
    //background
    forfill[0].style.background = 'none';
    forchoose[0].style.background = 'grey';
    forpencil[0].style.background = 'none';
    //add
    canvasS.addEventListener('mousedown', choosemd, false);
}
pencil();

async function getLinkToImage(n, s){
    grayscalebtn.removeEventListener('click', grayscal, false);
    let size = s;

    if(s === undefined){//input from click 'load' button
        const url = `https://api.unsplash.com/photos/random?query=town,${n}&client_id=87e26779aa6242a2b2fc8e863886185d1d1f07215e4890071e45448baedf8950`;
        
        let promise = fetch(url)
            .then(response => response.json())
            .then(data => {return data;});
        
        let result = await promise;
        size = 512;
        var image = new Image();
        image.crossOrigin = "Anonymous";
        image.onload = drawImageActualSize;
        image.src = result.urls.small;
        context.imageSmoothingEnabled = false;
        
    } else {            //input from change size
        console.log('change size: ', s);
        var dataURL = localStorage.getItem(canvasS);
        var img = new Image(size, size);
        img.src = dataURL;
        context.imageSmoothingEnabled = false;
        img.onload = function () {
            canvasS.width = size;
            canvasS.height = size;
            context.drawImage(img, 0, 0, this.width, this.height);
        };
    }

    function drawImageActualSize(){
        console.log('---------- size: ', size);
        canvasS.width = size;
        canvasS.height = size;
        console.log(this.naturalWidth, this.naturalHeight);
            //context.drawImage(this, 0, 0);
        if(this.naturalWidth > this.naturalHeight){
            console.log('0', (size - this.naturalWidth)/2, (512 - this.naturalWidth)+this.naturalWidth, (512 - this.naturalWidth)+this.naturalHeight);
            context.drawImage(this, 0, (size - ((512 - this.naturalWidth)+this.naturalHeight))/2, (512 - this.naturalWidth)+this.naturalWidth, (512 - this.naturalWidth)+this.naturalHeight);
        }
        if(this.naturalWidth < this.naturalHeight){
            console.log((size - ((512 - this.naturalHeight)+this.naturalWidth))/2, '0', (512 - this.naturalHeight)+this.naturalWidth, (512 - this.naturalHeight)+this.naturalHeight);
            context.drawImage(this, (size - ((512 - this.naturalHeight)+this.naturalWidth))/2, 0, (512 - this.naturalHeight)+this.naturalWidth, (512 - this.naturalHeight)+this.naturalHeight);
        }
        localStorage.setItem(canvasS, canvasS.toDataURL());
    }

    var grayscale = function() {
        var imageData = context.getImageData(0, 0, canvasS.width, canvasS.height);
        var data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
            var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i]     = avg; // red
            data[i + 1] = avg; // green
            data[i + 2] = avg; // blue
        }
        context.putImageData(imageData, 0, 0);
        if(canvasS.width === 512){localStorage.setItem(canvasS, canvasS.toDataURL())};
    };
    let grayscalee = document.getElementById('grayscalebtn');
    grayscalee.addEventListener('click', grayscale);
}
var grayscal = function() {
    alert("Please. Load image.");
};
let grayscalebtn = document.getElementById('grayscalebtn');
grayscalebtn.addEventListener('click', grayscal);