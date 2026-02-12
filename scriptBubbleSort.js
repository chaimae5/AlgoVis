const container = document.getElementById("array-container");
const generateBtn = document.getElementById("generateArray");
const executeBtn = document.getElementById("executeButton");
const arraySizeInput = document.getElementById("arraySize");

let array = [];

function generateArray() {
    const size = parseInt(arraySizeInput.value);
    array = [];
    container.innerHTML = "";
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
        
        const item = document.createElement("div");
        item.classList.add("array-cell");
        item.id = `item-${i}`;
        item.textContent = value; 
        container.appendChild(item);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    const items = document.getElementsByClassName("array-cell");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            
            items[j].style.backgroundColor = "yellow"; // Compare
            items[j + 1].style.backgroundColor = "yellow";
            
            await sleep(parseInt(document.getElementById("speed").value));

            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                items[j].textContent = array[j];
                items[j + 1].textContent = array[j + 1];
                
                items[j].style.backgroundColor = "red"; // Swap
                items[j + 1].style.backgroundColor = "red";
                await sleep(parseInt(document.getElementById("speed").value));
            }

            items[j].style.backgroundColor = ""; // Reset
            items[j + 1].style.backgroundColor = "";
        }
        items[array.length - i - 1].style.backgroundColor = "green"; // Sorted
    }
    // Ensure first element is green at end
    if(items.length > 0) items[0].style.backgroundColor = "green";
}

generateBtn.addEventListener("click", generateArray);
executeBtn.addEventListener("click", () => {
    bubbleSort();
});

// Initial load
generateArray();
