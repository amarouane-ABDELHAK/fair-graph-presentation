const fs = require('fs');

function updateChildren(node) {
    // Check if the node has children
    if (node.hasOwnProperty('children')) {
        node.children.forEach(child => {
            // Check if the child has a 'link' key
            if (child.hasOwnProperty('link')) {
                const linkValue = child.link;
                const oldChildren = [...child.children];
                // Update the children key as required
                child.children = [{
                    "name": linkValue,
                    "symbol": "none",
                    "collapsed": false,
                    "label": {
                        "color": "black",
                        "fontStyle": "bold"
                    },
                    "children": oldChildren
                }];
            }
            // Recursively apply to each child's children
            updateChildren(child);
        });
    }
}

fs.readFile('./data/fair-mapping.json', 'utf8', (err, data) => {
    if (err) throw err;
    let jsonData = JSON.parse(data);

    // Apply the function to the root node
    updateChildren(jsonData);

    // Optionally, you can save the updated JSON data back to the file
    fs.writeFile('./dist/fair-mapping.json', JSON.stringify(jsonData, null, 4), 'utf8', (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});
