const arrayContainer = document.getElementById("arrayContainer");
const generateBtn = document.getElementById("generateArray");
const executeBtn = document.getElementById("executeButton");
const arraySizeInput = document.getElementById("arraySize");
const targetInput = document.getElementById("targetValue");
const outputDiv = document.getElementById("AlgoOutput");

let array = [];

function generateArray() {
    const size = parseInt(arraySizeInput.value);
    array = [];
    arrayContainer.innerHTML = "";
    
    // Generate sorted array
    let current = Math.floor(Math.random() * 5);
    for (let i = 0; i < size; i++) {
        current += Math.floor(Math.random() * 5) + 1;
        array.push(current);
        
        const cell = document.createElement("div");
        cell.classList.add("array-cell");
        cell.id = `cell-${i}`;
        cell.textContent = current;
        arrayContainer.appendChild(cell);
    }
    
    outputDiv.textContent = "";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function binarySearch() {
    const target = parseInt(targetInput.value);
    outputDiv.textContent = `Searching for ${target}...`;
    
    let left = 0;
    let right = array.length - 1;
    
    // Reset styles
    const cells = document.getElementsByClassName("array-cell");
    for(let cell of cells) {
        cell.className = "array-cell";
    }

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midCell = document.getElementById(`cell-${mid}`);
        
        // Visualize range
        for(let i=0; i<array.length; i++) {
            if(i < left || i > right) {
                document.getElementById(`cell-${i}`).style.opacity = "0.3";
            } else {
                document.getElementById(`cell-${i}`).style.opacity = "1";
            }
        }
        
        midCell.style.backgroundColor = "yellow";
        await sleep(parseInt(document.getElementById("speed").value));

        if (array[mid] === target) {
            midCell.style.backgroundColor = "green";
            outputDiv.textContent = `Found ${target} at index ${mid}`;
            return;
        } else if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
        
        midCell.style.backgroundColor = ""; // Reset mid color
    }
    
    outputDiv.textContent = `${target} not found in array.`;
}

generateBtn.addEventListener("click", generateArray);
executeBtn.addEventListener("click", binarySearch);

// Initial load
generateArray();
