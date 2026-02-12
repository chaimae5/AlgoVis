// Uses D3 for visualization

let treeData = {};

function generateRandomTree() {
    treeData = {
        name: "A",
        children: [
            { name: "B", children: [{ name: "D" }, { name: "E" }] },
            { name: "C", children: [{ name: "F" }, { name: "G" }] }
        ]
    };
    renderTree(treeData);
    document.getElementById("AlgoOutput").textContent = "";
}

function buildTreeFromInput() {
    const input = document.getElementById("treeInput").value.trim();
    if (!input) {
        alert("Please enter tree edges.");
        return;
    }
    const lines = input.split('\n');
    const relationMap = {};
    const allNodes = new Set();
    const childrenNodes = new Set();
    
    lines.forEach(line => {
        const parts = line.split(',');
        if (parts.length < 2) return;
        const parent = parts[0].trim();
        const child = parts[1].trim();
        
        if (!relationMap[parent]) relationMap[parent] = [];
        relationMap[parent].push(child);
        
        allNodes.add(parent);
        allNodes.add(child);
        childrenNodes.add(child);
    });

    // Find root: Node in allNodes but not in childrenNodes
    let rootName = null;
    for (let node of allNodes) {
        if (!childrenNodes.has(node)) {
            rootName = node;
            break;
        }
    }

    if (!rootName) {
        alert("Invalid Tree: No root found (or cycle detected).");
        return;
    }

    function buildNode(name) {
        const node = { name: name };
        if (relationMap[name]) {
            node.children = relationMap[name].map(childName => buildNode(childName));
        }
        return node;
    }

    treeData = buildNode(rootName);
    renderTree(treeData);
    document.getElementById("AlgoOutput").textContent = "";
}

function renderTree(data) {
    document.getElementById("mySVG").innerHTML = '';
    
    // Set fixed dimensions for simple tree setup
    const width = 600;
    const height = 400;
    
    const svg = d3.select("#mySVG")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", "translate(40,40)");

    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().size([height - 80, width - 160]);
    treeLayout(root);

    // Links
    svg.selectAll('.link')
        .data(root.links())
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

    // Nodes
    const nodes = svg.selectAll('.node')
        .data(root.descendants())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.y},${d.x})`);

    nodes.append('circle')
        .attr('r', 20)
        .attr('id', d => `node-${d.data.name}`);

    nodes.append('text')
        .attr('dy', 5)
        .attr("text-anchor", "middle")
        .text(d => d.data.name);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runBFS() {
    const output = document.getElementById("AlgoOutput");
    output.textContent = "";

    const queue = [treeData];
    const visited = new Set();
    
    while (queue.length > 0) {
        const node = queue.shift();
        if (visited.has(node.name)) continue;
        visited.add(node.name);

        output.textContent += node.name + " ";
        
        // Highlight Node
        d3.select(`#node-${node.name}`)
            .transition().duration(500)
            .style("fill", "orange");
            
        await sleep(800);

        d3.select(`#node-${node.name}`)
            .transition().duration(500)
            .style("fill", "green"); // Mark processed

        if (node.children) {
            queue.push(...node.children);
        }
    }
}

document.getElementById("generateTree").addEventListener("click", generateRandomTree);
document.getElementById("executeButton").addEventListener("click", runBFS);
if (document.getElementById("buildTreeBtn")) {
    document.getElementById("buildTreeBtn").addEventListener("click", buildTreeFromInput);
}

// Initial
generateRandomTree();
