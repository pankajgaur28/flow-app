import './App.css';
import {useEffect, useState, useCallback} from 'react';
import {
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import CustomNodeFlow from './workflow/Workflow';
import LeftDrawer from './nodeForm/leftDrawer';
import {initialNodes, initialEdges} from './workflow/initialNodeData';
import {recordHistoryEntry, applyUndo, applyRedo} from './undoRedoUtils';

import {getRandomString} from './utills';

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeToEdit, setNodeToEdit] = useState();
  const [historyTracker, setHistoryTracker] = useState([0, 0]);

  useEffect(() => {
    setNodes(initialNodes.map(node => {
      return {
        ...node,
        data: {
          ...node.data,
          onEditNodeClick
        }
      }
    }));
    setEdges(initialEdges);
  }, []);

  const onAddEditNode = useCallback((data, nodeType) => {
    if (data.id) {
      setNodes((prevNodes) => {
        return prevNodes.map((node) => {
          if (node.id === data.id) {
            recordHistoryEntry('node', 'edit', node, setHistoryTracker);
            return {
              ...node,
              data,
            }
          } else {
            return node;
          }
        });
      });
      setNodeToEdit(null);
      return;
    }
    const node = {
      id: `${nodes.length}${getRandomString()}`,
      type: nodeType,
      data: data,
      position: { x:  Math.floor(Math.random() * 400), y: Math.floor(Math.random() * 400) },
    };
    recordHistoryEntry('node', 'create', node, setHistoryTracker);
    setNodes((prevNodes) => [
      ...prevNodes,
      node,
    ]);
  }, [nodes.length, setNodes]);

  const onEditNodeClick = useCallback((nodeData) => {
    setNodeToEdit(nodeData);
  }, []);

  const onNodesDelete = useCallback((nodes) => {
    recordHistoryEntry('node', 'delete', nodes, setHistoryTracker);
  }, []);
  const onEdgesDelete = useCallback((edges) => {
    recordHistoryEntry('edge', 'delete', edges, setHistoryTracker);
  }, []);

  const onNodeDragStart = useCallback((event, node) => {
    recordHistoryEntry('node', 'move', node, setHistoryTracker);
  }, []);

  const onEdgeConnect = useCallback(
    (params) => {
      recordHistoryEntry('edge', 'create', params, setHistoryTracker);
      setEdges((eds) =>
        addEdge({ ...params, animated: true }, eds),
      )
  },[setEdges]);

  const undoHandler = useCallback(() => {
    const updatedData = applyUndo(nodes, edges, setHistoryTracker);
    if (updatedData[0]) {
      setNodes(updatedData[0]);
    }
    if (updatedData[1]) {
      setEdges(updatedData[1]);
    }
  }, [edges, nodes, setEdges, setNodes]);

  const redoHandler = useCallback(() => {
    const updatedData = applyRedo(nodes, edges, setHistoryTracker);
    if (updatedData[0]) {
      setNodes(updatedData[0]);
    }
    if (updatedData[1]) {
      setEdges(updatedData[1]);
    }
  }, [edges, nodes, setEdges, setNodes]);

  

  const flowProps = {
    nodes,
    // setNodes,
    onNodesChange,
    edges,
    // setEdges,
    onEdgesChange,
    onNodesDelete,
    onEdgesDelete,
    onNodeDragStart,
    onEdgeConnect
  }

  return (
    <div className="app">
      <div className="" role="group">
        <LeftDrawer onAddEditNode={onAddEditNode} nodeToEdit={nodeToEdit} undoHandler={undoHandler} redoHandler={redoHandler} historyTracker={historyTracker} />
      </div>
      <CustomNodeFlow {...flowProps} />
    </div>
  );
}

export default App;
