function getMatchingNodes(data, nodes) {
    if (Array.isArray(data)) {
        const ids = data.map((node) => node.id);
        return nodes.filter((node) => ids.includes(node.id));
    }
    return nodes.find((node) => node.id === data.id);
}

function getUpdatedNodes(data, nodes) {
    if (Array.isArray(data)) {
        const ids = data.map((node) => node.id);
        return nodes.map((node) => {
            if (ids.includes(node.id)) {
                return {...data[ids.indexOf(node.id)]};
            }
            return {...node};
        })
    }
    return nodes.map((node)=>{
        if (node.id === data.id) {
            return {...data};
        }
        return {...node};
    });
}

// to hold the (delta) changes history
const historyStack = [];
// pointing to current index in case of undo/redo applied, other wise pointing to next empty array field
let currentIndex = 0;

// capturing the data been added / removed /edited before the actual changes took place, to undo it (take to previous)
export function recordHistoryEntry(entityType, action, data, setHistoryTracker) {
    // in case undo applied, we are removiung the array that hold old undo values
    historyStack.length = currentIndex;
    historyStack[currentIndex] = {
        entityType,
        action,
        data,
    };
    currentIndex++;
    setHistoryTracker([currentIndex, historyStack.length]);
    console.log("recordHistoryEntry");
    console.log(historyStack);
}



// undo the changes
// entityType :: 'node' 'edge'
// action :: 'create' 'edit' 'delete' 'move'
export function applyUndo(nodes, edges, setHistoryTracker) {
    // moving one index down, as index pointing to new empty location initially or undo appplied location
    currentIndex--;
    const curr = historyStack[currentIndex];
    setHistoryTracker([currentIndex, historyStack.length]);
    // comparing changes for nodes
    if(curr.entityType == 'node') {
        // for edit move we have to 
        //  1. apply previous changes
        // 2. save current value in our historyStack so that we can even re do the undo action
        if (curr.action === 'edit' || curr.action === 'move') {
            // getting the matching node in historyStack, so that we can retain current value to redo
            const updatedData = getMatchingNodes(curr.data, nodes);
            // updating node value with historyStack entries
            const updatedNodes = getUpdatedNodes(curr.data, nodes);
            historyStack[currentIndex] = {
                ...curr,
                data: updatedData,
            };
            return [updatedNodes];
        }
        // for delete action doing reverse (adding)
        if (curr.action === 'delete') {
            return [[...nodes, ...curr.data]];
        }
        // for create action doing reverse (delting)
        if (curr.action === 'create') {
            return [nodes.filter((node) => node.id !== curr.data.id)];
        }
    }
    if(curr.entityType == 'edge') {
        // for delete action doing reverse (adding)
        if (curr.action === 'delete') {
            return [undefined, [...edges, ...curr.data]];
        }
        // for create action doing reverse (delting)
        if (curr.action === 'create') {
            return [undefined, edges.filter((node) => {
                if (node.source === curr.data.source && node.target === curr.data.target) {
                    return false;
                }
                return true;
            })];
        }
    }
}

export function applyRedo(nodes, edges, setHistoryTracker) {
    const curr = historyStack[currentIndex];
    let result = [];
    if(curr.entityType == 'node') {
        // for edit move we have to 
        //  1. apply previous changes
        // 2. save current value in our historyStack so that we can even re do the redo action
        if (curr.action === 'edit' || curr.action === 'move') {
            const updatedData = getMatchingNodes(curr.data, nodes);
            const updatedNodes = getUpdatedNodes(curr.data, nodes);
            historyStack[currentIndex] = {
                ...curr,
                data: updatedData,
            };
            result = [updatedNodes];
        }
        // on redo applying initial operation
        if (curr.action === 'delete') {
            const ids = curr.data.map((node) => node.id);
            result =  [nodes.filter((node) => !ids.includes(node.id))];
        }
        // on redo applying initial operation
        if (curr.action === 'create') {
            result = [[...nodes, curr.data]];;
        }
    }
    if(curr.entityType == 'edge') {
        // on redo applying initial operation
        if (curr.action === 'delete') {
            const connects = curr.data.map((node) => `${node.source}-${node.target}`);
            result = [undefined, edges.filter((node) => {
                if (connects.includes(`${node.source}-${node.target}`)) {
                    return false;
                }
                return true;
            })];
        }
        // on redo applying initial operation
        if (curr.action === 'create') {
            result = [undefined, [...edges, curr.data]];
        }
    }
    currentIndex++;
    setHistoryTracker([currentIndex, historyStack.length]);
    return result;
}

// x10
// x20
// x30

// x40
// {
//     id: '4',
//     type: 'notificationNode',
//     data: {text: "offer", medium: "email"},
//     position: { x: 850, y: 20 },
//     targetPosition: 'left',
//   }

// source: "1"
// sourceHandle: "a"
// target: "2"
// targetHandle: null


/**
 * activate undo / redo button on any action,
 * desable undo on all redo.
 * activate redo on any undo.
 * 
 * on undo, add a entry in array for current state of changing element
 * 
 * 
 * create node
 * edit node
 * delete node
 * move node
 * 
 * create connection
 * delete node
 * 
 * 
 * 
 * 
 * on: node/edge
 * type: add/edit/moved
 * 
 * undo:
 *      deleted: add
 *      added: delete
 *      edited: old value
 *      moved: retain postion
 */