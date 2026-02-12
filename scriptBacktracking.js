
// Layout constants matching DFS/BFS
const width = 600;
const height = 400;
let treeData = { name: "Root", children: [] };

function generateArrayInputs() {
    const size = parseInt(document.getElementById("arraySize").value, 10);
    if (isNaN(size) || size < 1 || size > 6) { // Limited to 6 to prevent visual overflow
        alert("Please enter a size between 1 and 6.");
        return;
    }

    const container = document.getElementById("arrayInputContainer");
    container.innerHTML = ''; 

    // Clear previous visuals
    document.getElementById("mySVG").innerHTML = '';
    document.getElementById("AlgoOutput").textContent = '';

    for (let i = 0; i < size; i++) {
        const input = document.createElement("input");
        input.type = "text"; // Changed to text to allow customization like 'A'
        input.className = "form-control d-inline-block m-1";
        input.style.width = "40px";
        input.style.textAlign = "center";
        input.value = i + 1; // Default
        container.appendChild(input);
    }
}

function getArrayValues() {
    const inputs = document.querySelectorAll("#arrayInputContainer input");
    return Array.from(inputs).map(input => input.value.trim() || "?");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runBacktrack() {
    const nums = getArrayValues();
    if(nums.length === 0) {
        alert("Please generate input first.");
        return;
    }

    document.getElementById("AlgoOutput").innerHTML = "<strong>State Space Tree (Subsets):</strong><br>Showing inclusions vs exclusions";
    
    // Reset Tree - Root is empty set
    treeData = { name: "{}", children: [], subset: [] };
    renderTree(treeData);
    
    // Disable button to prevent double click
    const btn = document.getElementById("executeButton");
    btn.disabled = true;
    
    try {
        await backtrack(nums, 0, [], treeData);
    } finally {
        btn.disabled = false;
    }
}

async function backtrack(nums, index, currentSubset, parentNode) {
    // Current Node is already in properties of parentNode from previous step or initialization
    // But we need to visualize the *process* of expansion from this node.
    
    // D3 Re-render to ensure current state is visible
    renderTree(treeData);
    
    // If we are at the end, we don't branch further
    if (index === nums.length) {
        // Highlight leaf? 
        return;
    }
    
    // Add delays to visualize thought process
    await sleep(600);

    const currentVal = nums[index];

    // Branch 1: Exclude currentVal 
    // Logic: subset doesn't change
    const childExclude = { 
        name: `Excl ${currentVal}`, 
        children: [], 
        subset: [...currentSubset]
    };
    parentNode.children.push(childExclude);
    renderTree(treeData);
    await sleep(300); // Small delay between branches
    
    await backtrack(nums, index + 1, currentSubset, childExclude);

    // Branch 2: Include currentVal
    // Logic: subset adds currentVal
    const newSubset = [...currentSubset, currentVal];
    const childInclude = { 
        name: `Incl ${currentVal}`, 
        children: [], 
        subset: newSubset
    };
    parentNode.children.push(childInclude);
    renderTree(treeData); 
    await sleep(300);

    await backtrack(nums, index + 1, newSubset, childInclude);
}

// Render function matching DFS/BFS style
function renderTree(data) {
    document.getElementById("mySVG").innerHTML = '';
    
    // Switch to Top-to-Bottom layout (Vertical)
    const svg = d3.select("#mySVG")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", "translate(0, 40)"); // slight margin top

    const root = d3.hierarchy(data);
    
    // Size: Width is width of container, Height involves depth
    // Standard D3 tree expects size([x_width, y_height]) for vertical trees
    const treeLayout = d3.tree().size([width, height - 100]);
    treeLayout(root);

    // Links - Vertical
    svg.selectAll('.link')
        .data(root.links())
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', d3.linkVertical()
            .x(d => d.x)
            .y(d => d.y));

    // Nodes
    const nodes = svg.selectAll('.node')
        .data(root.descendants())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x},${d.y})`);

    nodes.append('circle')
        .attr('r', 18)
        .style("fill", "#fff")
        .style("stroke", "steelblue")
        .style("stroke-width", "3px");

    // Label: Above circle
    nodes.append('text')
        .attr('dy', -25)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "#555")
        .text(d => d.data.name === "{}" ? "Start" : d.data.name);

    // Subset: Inside circle
    nodes.append('text')
        .attr('dy', 5)
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "11px")
        .text(d => {
            if(d.data.subset.length === 0) return "{}";
            return "{" + d.data.subset.join(",") + "}";
        });
}


document.getElementById("generateArray").addEventListener("click", generateArrayInputs);
document.getElementById("executeButton").addEventListener("click", runBacktrack);

// Initial Load
generateArrayInputs();

/* End of Script */