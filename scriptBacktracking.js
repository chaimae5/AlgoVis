
function getInputArray(inputId) {
    const numsString = document.getElementById(inputId).value;
    return numsString.split(',').map(num => parseInt(num.trim(), 10));
  }
  
  // Function to execute the algorithm and start the visualization 
  function startVisualization() {
    const nums = getArrayValues();
    backtrack(nums);
  }
  
  // Example implementation of Bubble Sort
  function bubbleSort() {
    // This is just a placeholder function
    // You will need to implement the actual visualization logic
    console.log("Running Bubble Sort...");
    // Add Bubble Sort logic here
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
  
  // Example implementation of Binary Search ( find index of element in array )
  function binarySearch(nums, target) {
    //nums.sort((a, b) => a - b); // Sorts the array in ascending order
    let low = 0;
    let high = nums.length - 1;
  
    while (low <= high) {
        let mid = Math.floor(low + (high - low) / 2);
        if (nums[mid] < target) {
            low = mid + 1;
        } else if (nums[mid] > target) {
            high = mid - 1;
        } else {
            displayBinarySearchOutput(mid);
            return mid;
        }
    }
    displayBinarySearchOutput(-1);
    return -1;
  }
  
  // Example implementation of Depth-first Search
  function DFS() {
    console.log("Running DFS...");
  }
  
  // Display output for Backtracking algo
  function displayBacktrackingOutput(subsets) {
    const outputDiv = document.getElementById("AlgoOutput");
    outputDiv.innerHTML = subsets.map(subset =>
        `<div class="subset">${subset.length ? '[' + subset.join(', ') + ']' : '[]'}</div>`
    ).join('');
  }
  
  // Display output for Binary Search algo
  function displayBinarySearchOutput(index) {
    const outputDiv = document.getElementById("AlgoOutput");
    let htmlContent;
    if (index == -1) {
        htmlContent = "Element Not found.";
    }
    else {
        htmlContent = "Element found at index: ";
        htmlContent += index;
    }
    outputDiv.textContent = htmlContent; // Use textContent since we're not using HTML tags here
  }
  
  // Function to handle the change in algorithm selection and display fields for arguments
  function handleAlgorithmChange() {
    resetUI();
    const algorithm = document.getElementById("algorithmSelector").value;
    // Hide all input fields initially
    document.getElementById("arrayInput").style.display = 'none';
    document.getElementById("targetInput").style.display = 'none';
  
    // Show relevant input fields based on selected algorithm
    if (algorithm === "Backtracking") {
        document.getElementById("arrayInput").style.display = 'block';
    } else if (algorithm === "Binary Search") {
        document.getElementById("arrayInput").style.display = 'block';
        document.getElementById("targetInput").style.display = 'block';
    }
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
  
  // Reset UI 
  function resetUI() {
    // Clear array input fields
    const arrayInputContainer = document.getElementById('arrayInputContainer');
    arrayInputContainer.innerHTML = '';
  
    document.getElementById('arraySize').value = '';
  
    // Reset output display
    const outputDisplay = document.getElementById('AlgoOutput'); // Assuming you have an output display element
    outputDisplay.textContent = '';
  
    // Reset SVG
    const svgTree = document.getElementById('mySVG');
    svgTree.innerHTML = '';
  
    // Optionally, reset the select box to a default value
    // document.getElementById('algorithmSelector').value = 'default'; // Uncomment if you have a default option
  }
  
  //////////////////////////////////////////////////////////////////////////////////////
  // ---------------------------------- Tree building --------------------------------
  //////////////////////////////////////////////////////////////////////////////////////
  function createTree(treeData) {
    // Reset SVG
    const svgTree = document.getElementById('mySVG');
    svgTree.innerHTML = '';
  
    // Set layout based on the SVG's visible size
    const svgWidth = svgTree.clientWidth || 650;
    const svgHeight = svgTree.clientHeight || 360;

    const svgRoot = d3.select("#mySVG")
        .style("width", "100%")
        .style("height", "100%")
        .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

    const root = d3.hierarchy(treeData);
    const treeLayout = d3.tree().nodeSize([40, 90]);
    treeLayout(root);

    const nodes = root.descendants();
    const x0 = d3.min(nodes, d => d.x);
    const x1 = d3.max(nodes, d => d.x);
    const y0 = d3.min(nodes, d => d.y);
    const y1 = d3.max(nodes, d => d.y);
  const padding = 20;
  const paddingBottom = 40;

  const width = Math.max(1, x1 - x0);
  const height = Math.max(1, y1 - y0);
  const scale = Math.min(
    1,
    (svgWidth - padding * 2) / width,
    (svgHeight - padding - paddingBottom) / height
  );

  const availableHeight = svgHeight - padding - paddingBottom;
  const translateX = (svgWidth - width * scale) / 2 - x0 * scale;
  const translateY = (availableHeight - height * scale) / 2 + padding - y0 * scale;

  const svg = svgRoot.append("g")
    .attr("transform", `translate(${translateX},${translateY}) scale(${scale})`);
  
    let delay = 0;
    const delayIncrement = 1000; // Adjust as needed
  
    // Queue for BFS
    const queue = [{ node: root, parent: null }];
  
    while (queue.length > 0) {
        const { node, parent } = queue.shift();
  
        // Schedule node rendering
        setTimeout(() => {
            // Add node
            const nodeG = svg.append("g")
                .attr("class", "node")
                .attr("transform", "translate(" + node.x + "," + node.y + ")");
  
            nodeG.append("circle")
                .attr('class', 'node')
                .attr("r", 22);
  
            nodeG.append("text")
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .text(node.data.name);
  
            // Add link to parent
            if (parent) {
                svg.insert("line", ":first-child")
                    .attr("class", "link")
                    .attr("x1", parent.x)
                    .attr("y1", parent.y)
                    .attr("x2", node.x)
                    .attr("y2", node.y)
                    .style("stroke", "#320685")
                    .style("stroke-width", "2px");
            }
        }, delay);
  
        delay += delayIncrement;
  
        // Add children to queue
        if (node.children) {
            node.children.forEach(child => {
                queue.push({ node: child, parent: node });
            });
        }
    }
  }
  
  function stepCreateTree(treeData) {
    // implement this
  }
  
  //////////////////////////////////////////////////////////////////////////////////////
  // ---------------------------------- Event Listeners --------------------------------
  //////////////////////////////////////////////////////////////////////////////////////
  let isExecuteClicked = false;
  let isAutoClicked = false;
  let isStepByStepClicked = false;
  
  //document.getElementById("algorithmSelector").addEventListener("change", handleAlgorithmChange);
  document.getElementById("generateArray").addEventListener("click", generateArrayInputs);
  
  document.getElementById("executeButton").addEventListener("click", function() {
    isExecuteClicked = true;
    startVisualization();
  });
  
  /*
  document.getElementById("autoDisplayButton").addEventListener("click", function() {
    if (isExecuteClicked && !isStepByStepClicked) {
        isAutoClicked = true;
        createTree(treeData); // Only call this if Execute was clicked
        isAutoClicked = false;
    } else {
        alert("Please define inputs and click 'Execute' first.");
    }
  });
  
  document.getElementById("stepByStepButton").addEventListener("click", function() {
    if (isExecuteClicked && !isAutoClicked) {
        isStepByStepClicked = true;
        stepCreateTree(treeData); // Only call this if Execute was clicked
        isStepByStepClicked = false;
    } else {
        alert("Please define inputs and click 'Execute' first.");
    }
  });
  
  */