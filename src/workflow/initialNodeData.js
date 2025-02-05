export const initialNodes = [
    {
      id: '1',
      type: 'taskNode',
      data: {title: "title 1", dueDate: "20/12/2024", status: "Pending", description: "description 1"},
      position: { x: 0, y: 50 },
      sourcePosition: 'right',
    },
    {
      id: '2',
      type: 'taskNode',
      data: {title: "title 1", dueDate: "20/12/2024", status: "Pending", description: "description 1"},
      position: { x: 300, y: 50 },
    },
    {
      id: '3',
      type: 'conditionNode',
      data: {checkIf: "conditon 1"},
      position: { x: 600, y: 50 },
      targetPosition: 'left',
    },
    {
      id: '4',
      type: 'notificationNode',
      data: {text: "offer", medium: "email"},
      position: { x: 850, y: 10 },
      targetPosition: 'left',
    },
    {
      id: '5',
      type: 'notificationNode',
      data: {text: "offer 1", medium: "message"},
      position: { x: 850, y: 120 },
      targetPosition: 'left',
    },
];

export const initialEdges = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      animated: true,
    },
    {
      id: 'e2a-3',
      source: '2',
      target: '3',
      // sourceHandle: 'a',
      animated: true,
    },
    {
      id: 'e2b-4',
      source: '3',
      target: '4',
      sourceHandle: 'a',
      animated: true,
    },
    {
      id: 'e2b-5',
      source: '3',
      target: '5',
      sourceHandle: 'b',
      animated: true,
    },
];