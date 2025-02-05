/* eslint-disable react/prop-types */
import { memo, useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

 const ConditionNode = ({ data, isConnectable, id, type }) => {
  const editNodeClickhandler = useCallback(() => {
    data.onEditNodeClick({
      ...data,
      id,
      nodeType: type,
    });
  },[data, id, type]);
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <button
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-red-400 bg-transparent hover:bg-gray-200 hover:text-red-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-red"
          onClick={editNodeClickhandler}
        ><svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
        </button>
      <div>
      <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg rounded-b-lg dark:border-gray-600">{data?.checkIf}</li>
      </ul>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(ConditionNode);