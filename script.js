// Responsive Navbar
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}
  
// For the Carousel
var mySwiper = new Swiper('.mySwiper', {
  loop: true, // Optional loop mode
  autoplay: {
    delay: 0, // Delay in ms between slides. Adjust as needed.
    disableOnInteraction: false, // Continue autoplay on user interactions
  },
  speed: 10000,          //add
  // Responsive breakpoints
  breakpoints: {
    // when window width is <= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    // when window width is <= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 20
    }
  }
});

/*-------------------Algorithms--------------------*/
// Get input array
function getInputArray(inputId) {
  const numsString = document.getElementById(inputId).value;
  return numsString.split(',').map(num => parseInt(num.trim(), 10));
}

// Generate array inputs
function generateArrayInputs() {
  const size = parseInt(document.getElementById("arraySize").value, 10);
  if (isNaN(size) || size <= 0) {
      alert("Please enter a valid array size.");
      return;
  }

  const container = document.getElementById("arrayInputContainer");
  container.innerHTML = ''; // Clear previous inputs

  // Reset SVG
  const svgTree = document.getElementById('mySVG');
  svgTree.innerHTML = '';

  // Reset output display
  const outputDisplay = document.getElementById('AlgoOutput'); // Assuming you have an output display element
  outputDisplay.textContent = '';

  for (let i = 0; i < size; i++) {
      const input = document.createElement("input");
      input.type = "number";
      input.className = "array-cell";
      //input.placeholder = `val`;
      container.appendChild(input);
  }
}

// Get array values
function getArrayValues() {
  const inputs = document.querySelectorAll("#arrayInputContainer .array-cell");
  return Array.from(inputs).map(input => parseInt(input.value, 10) || 0);
}

// Example implementation of Backtracking (subsets) with visualization
function backtrack(nums) {
    let powerSet = [];
    let treeData = { name: "root", children: [] }; // Initial tree node
    //updateVisual(treeData);

    function back(subset, index, parentNode) {
        // Create a node for the current state
        let currentNode = { 
            name: `${subset.join(", ")}`,
            children: [] 
        };
        parentNode.children.push(currentNode);
        createTree(treeData);
        
        if (index === nums.length) {
            powerSet.push([...subset]);
            return;
        }
        
        // Exclude the current element
        back(subset, index + 1, currentNode);

        // Include the current element
        subset.push(nums[index]);
        back(subset, index + 1, currentNode);

        // Remove the element added in the previous step
        subset.pop();
    }

    back([], 0, treeData);

    createTree(treeData);
    displayBacktrackingOutput(powerSet);
    return powerSet;
}

// Display output for Backtracking algo
function displayBacktrackingOutput(subsets) {
  const outputDiv = document.getElementById("AlgoOutput");
  outputDiv.innerHTML = subsets.map(subset =>
      `<div class="subset">${subset.length ? '[' + subset.join(', ') + ']' : '[]'}</div>`
  ).join('');
}

// Run backtracking 
function runBacktrack() {
    const nums = getArrayValues();
    backtrack(nums);
}

////////////////////////////////////////////////////////////////////////////////////
// -------------------------------- Event Listeners --------------------------------//
////////////////////////////////////////////////////////////////////////////////////
document.getElementById("generateArray").addEventListener("click", generateArrayInputs);

document.getElementById("executeButton").addEventListener("click", function() {
    isExecuteClicked = true;
    runBacktrack();
});