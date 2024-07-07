import json

def update_children(node):
    # Check if the node has children
    if 'children' in node:
        for _, child in enumerate(node['children']):
            # Check if the child has a 'link' key
            if 'link' in child:
                link_value = child['link']
                old_children = child['children'].copy()
                # Update the children key as required
                child['children'] = [{
                    "name": link_value,
                    "symbol": "none",
                    "collapsed": False,
                    "label": {
                        "color": "black",
                        "fontStyle": "bold"
                    },
                    "children": old_children
                }]
            # Recursively apply to each child's children
            update_children(child)
if __name__=="__main__":
    with open("./data/fair-mapping.json", 'r') as _file:
        data = json.load(_file)
        # Apply the function to the root node
    update_children(data)

    # Optionally, you can save the updated JSON data back to the file
    with open('./dist/fair-mapping.json', 'w') as file:
        json.dump(data, file, indent=4)
