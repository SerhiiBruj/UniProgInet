const stick = document.getElementById("stick");
let time = 100;
let stop = false;
let vinil = document.getElementById('vinilspot');

class Vinil {
    constructor(id, bg, color, bgs) {
        this.id = id;
        this.bg = bg;
        this.color = color;
        this.bgs = bgs;
        this.createVinil();
    }
   
}


Vinil.prototype.createVinil = function() {
    this.firstLayer = document.createElement('div');
    this.firstLayer.className = "first";
    this.firstLayer.id = this.id;

    this.second = document.createElement('div');
    this.second.className = "second";

    this.third = document.createElement('div');
    this.third.className = "third";

    this.forth = document.createElement('div');
    this.forth.className = "forth";
    this.forth.style.backgroundColor = this.color;
    this.forth.style.backgroundImage = this.bg;
    this.forth.style.backgroundSize = this.bgs;
    this.forth.style.backgroundPosition = "center";

    this.circ = document.createElement('div');
    this.circ.className = "circ";

    this.forth.appendChild(this.circ);
    this.third.appendChild(this.forth);
    this.second.appendChild(this.third);
    this.firstLayer.appendChild(this.second);
    document.getElementById('container').appendChild(this.firstLayer);
    this.moveVinil(this.firstLayer);
}
Vinil.prototype.moveVinil=function(firstLayer) {
        let grab = false;
        const vinilSpotElement = this.vinilSpot();
        let onspot;
        const move = (pageX, pageY) => {
            if (grab) {
                firstLayer.style.position = "absolute";
                firstLayer.style.transition = "transform 1s ease";
                firstLayer.style.left = pageX - firstLayer.offsetWidth / 2 + 'px';
                firstLayer.style.top = pageY - firstLayer.offsetHeight / 2 + 'px';
            }
        };
    
        const checkCollision = (mouseX, mouseY, targetElement) => {
            const targetRect = targetElement.getBoundingClientRect();
            const isOverlapping = mouseX >= targetRect.left &&
                mouseX <= targetRect.right &&
                mouseY >= targetRect.top &&
                mouseY <= targetRect.bottom;
            if (isOverlapping) {
                onOverlap();
            }
        };
    
        const onOverlap = () => {
            if(vinilSpotElement.firstElementChild.className!=="first"){
            vinilSpotElement.replaceChild(firstLayer, vinilSpotElement.firstElementChild);
        }
            else{
                vinilSpotElement.firstElementChild.addEventListener('mousedown', eve);
                document.getElementById('container').appendChild( vinilSpotElement.firstElementChild);
                vinilSpotElement.appendChild(firstLayer);
                onspot=false;
                firstLayer.addEventListener('mousedown', eve);

            }
            onspot=true;
                grab = false;
                firstLayer.style.position = "static";
                firstLayer.style.transform = "none";
                firstLayer.style.zIndex = "0";
                firstLayer.style.animation = "1s disco linear";
                firstLayer.removeEventListener('mousedown', eve);
                console.log('a');
        };
    
        const onMousemove = (event) => {
            move(event.pageX, event.pageY);
            checkCollision(event.pageX, event.pageY, vinilSpotElement);
        };
    
        const eve = (event) => {
            grab = true;
            move(event.pageX, event.pageY);
            document.addEventListener('mousemove', onMousemove);
            document.addEventListener('mouseup', onMouseup, { once: true });
        };
    
        const onMouseup = () => {
            grab = false;
            document.removeEventListener('mousemove', onMousemove);
        };
    
        firstLayer.addEventListener('mousedown', eve);
        const replace =()=>  {
            if(onspot){
                onspot=false;
            firstLayer.style.position = 'static';
            document.getElementById('container').appendChild(firstLayer);
            this.circ = document.createElement('div');
            this.circ.className = "circ";
            vinilSpotElement.appendChild(this.circ);
        firstLayer.addEventListener('mousedown', eve);}
        }
        firstLayer.addEventListener('dblclick',replace );
    }


Vinil.prototype.vinilSpot = function () {
    return document.querySelector('.vinilspot');
}
Vinil.prototype.console = function () {
    console.log(this.color);
}


let background = "linear-gradient(rgb(37, 62, 151), rgb(18, 51, 113), rgb(12, 22, 60))";
let img = [
    "url(./photo_2023-12-13_14-51-33.jpg)",
    "url(./photo_2023-10-15_18-17-01.jpg)"
];
let ha = new Vinil("v1", background, "black");
let h = new Vinil("v2", "red", "red", "cover");
let juj = new Vinil("v3", "darkgreen", "darkgreen", "120%");

console.log(h);

function getCurrentRotation(element) {
    var style = window.getComputedStyle(element, null);
    var transform = style.getPropertyValue("transform");
    if (transform === "none") return 0;
    var matrix = new DOMMatrixReadOnly(transform);
    return Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
}

stick.addEventListener("click", function () {
    if (stop === false) {
        stop = true;
        stick.style.transition = "2s all ease";
        stick.style.transform = "rotate(-87deg)";
        vinil.style.pointerEvents = "none";
        
        stick.addEventListener('transitionend', function onTransitionEnd() {
            vinil.style.animation = `${time}s rotate linear`;
            stick.style.animation = `${time + 5 * time / 100}s play linear`;
            stick.style.transform = "rotate(0deg)";
            // Remove the event listener to prevent it from running multiple times
            stick.removeEventListener('transitionend', onTransitionEnd);
        });
    } else {
        vinil.style.transform = "rotate(" + getCurrentRotation(vinil) + "deg)";
        vinil.style.pointerEvents = "all";
        vinil.style.animation = `none`;
        stop = false;
        stick.style.transform = "rotate(0deg)";
        stick.style.animation = 'none';
    }
});

const myPromise = new Promise((resolve, reject) => {
    const success = 1; 

    if (success) {
        resolve('Проміс success');
    } else {
        reject('Проміс відхилений.');
    }
});

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        let l = 1; // Можете змінити значення на 1, щоб протестувати успішне виконання

        if (l) {
            setTimeout(() => {
                resolve(`Затримка ${ms} мілісекунд завершена`);
            }, ms);
        } else {
            reject('Помилка');
        }
    });
};
myPromise
    .then((message) => {
        console.log(message);
        return  delay(2000)
        .then((message) => {
            console.log(message); 
        })
        .catch((error) => {
            console.error(error);
        }); 
    })
    .catch((error) => {
        console.error(error); 
    })
    .finally(() => {
        console.log('Проміс завершено.'); // Виведе в будь-якому випадку
        Promise.all([myPromise, delay(2000)]).then((values) => {
            console.log(values);  
            Promise.race([delay(2000), delay(1000)]).then((value) => {
                console.log(value); 
              });
          });
    });


    

        
// setInterval(() => {
// const data = new Date();
// alert(data.toLocaleTimeString());
    
// }, 1000);