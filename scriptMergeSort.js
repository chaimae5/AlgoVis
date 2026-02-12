const container = document.getElementById("array-container");
const generateBtn = document.getElementById("generateArray");
const executeBtn = document.getElementById("executeButton");
const arraySizeInput = document.getElementById("arraySize");

let array = [];

function generateArray() {
    const size = parseInt(arraySizeInput.value);
    array = [];
    container.innerHTML = "";
    // container.style.alignItems = "center"; // Not using flex anymore
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

async function mergeHelper(arr, start, mid, end, items) {
    let i = start, j = mid + 1;
    let temp = [];
    const speed = parseInt(document.getElementById("speed").value);

    // Highlight the sub-arrays being merged
    for(let k = start; k <= end; k++) {
        items[k].style.backgroundColor = "orange";
    }
    await sleep(speed);

    while (i <= mid && j <= end) {
        // Comparison
        items[i].style.backgroundColor = "red";
        items[j].style.backgroundColor = "red";
        await sleep(speed);

        if (arr[i] <= arr[j]) {
            temp.push(arr[i]);
            i++;
        } else {
            temp.push(arr[j]);
            j++;
        }
    }

    while (i <= mid) {
        temp.push(arr[i]);
        i++;
    }

    while (j <= end) {
        temp.push(arr[j]);
        j++;
    }

    // Copy back to original array and update items
    for (let k = 0; k < temp.length; k++) {
        arr[start + k] = temp[k];
        items[start + k].textContent = arr[start + k]; // Update text
        items[start + k].style.backgroundColor = "green"; // Sorted part of this merge
        await sleep(Math.max(50, speed / 2));
    }
}

async function mergeSort(arr, start, end, items) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);
        await mergeSort(arr, start, mid, items);
        await mergeSort(arr, mid + 1, end, items);
        await mergeHelper(arr, start, mid, end, items);
    }
}

generateBtn.addEventListener("click", generateArray);
executeBtn.addEventListener("click", async () => {
    const items = document.getElementsByClassName("array-cell");
    await mergeSort(array, 0, array.length - 1, items);
    
    // Final green sweep
    for(let i=0; i<items.length; i++){
        items[i].style.backgroundColor = "green";
    }
});

// Initial load
generateArray();
