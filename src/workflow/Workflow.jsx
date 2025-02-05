/* eslint-disable react/prop-types */
// import { useState, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';


import NotificationNode from './NotificationNode';
import TaskNode from './TaskNode';
import ConditionNode from './ConditionNode';

import {nodeTypes as nodeTypesConstants} from '../nodeForm/fromFieldsConstants';

const initBgColor = '#c9f1dd';

const snapGrid = [20, 20];
const nodeTypes = {
  [nodeTypesConstants.NOTIFICATION]: NotificationNode,
  [nodeTypesConstants.TASK]: TaskNode,
  [nodeTypesConstants.CONDITION]: ConditionNode
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const CustomNodeFlow = ({
  nodes,
  onNodesChange,
  edges,
  onEdgesChange,
  onNodesDelete,
  onEdgesDelete,
  onNodeDragStart,
  onEdgeConnect,
}) => {

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onEdgeConnect}
      style={{ background: initBgColor }}
      nodeTypes={nodeTypes}
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultViewport={defaultViewport}
      fitView
      attributionPosition="bottom-left"
      onNodeDragStart={onNodeDragStart}
      onNodesDelete={onNodesDelete}
      onEdgesDelete={onEdgesDelete}
    >
      <Background />
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.type === nodeTypesConstants.NOTIFICATION) return '#a6aa67';
          if (n.type === nodeTypesConstants.TASK) return initBgColor;
          if (n.type === nodeTypesConstants.CONDITION) return '#c9ad92';
        }}
        nodeColor={(n) => {
          if (n.type === nodeTypesConstants.NOTIFICATION) return '#a6aa67';
          if (n.type === nodeTypesConstants.TASK) return initBgColor;
          if (n.type === nodeTypesConstants.CONDITION) return '#a892c9';
        }}
      />
      <Controls />
    </ReactFlow>
  );
};

export default CustomNodeFlow;
