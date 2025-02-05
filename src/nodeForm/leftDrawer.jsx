/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import FormGenerator from './FormGenerator';
import {nodeTypes} from './fromFieldsConstants';


const LeftDrawer = ({onAddEditNode, nodeToEdit, undoHandler, redoHandler, historyTracker}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen((pre) => !pre);
	const drawerData = useRef(null);

	useEffect(() => {
		if (nodeToEdit) {
			toggledrawer(nodeToEdit.nodeType);
		}
	}, [nodeToEdit]);

	const toggledrawer = (nodeType) => {
		if (!isOpen) {
			drawerData.current = {
				nodeType,
			}
		}
		setIsOpen((pre) => !pre);
	}

	const submitData = (data) => {
		onAddEditNode(data, drawerData.current.nodeType);
		toggledrawer();
	}

  return (
    <>
      <div className="flex justify-between px-1 bg-[#addbc4]">
				<div className="text-center">
					<button
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
						type="button"
						onClick={() => toggledrawer(nodeTypes.TASK)}
						data-drawer-target="drawer-navigation"
						data-drawer-show="drawer-navigation"
						aria-controls="drawer-navigation"
					>
						Add task
					</button>
					<button
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
						type="button"
						onClick={() => toggledrawer(nodeTypes.CONDITION)}
						data-drawer-target="drawer-navigation"
						data-drawer-show="drawer-navigation"
						aria-controls="drawer-navigation"
					>
						Add condition
					</button>
					<button
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
						type="button"
						onClick={() => toggledrawer(nodeTypes.NOTIFICATION)}
						data-drawer-target="drawer-navigation"
						data-drawer-show="drawer-navigation"
						aria-controls="drawer-navigation"
					>
						Add notification
					</button>
				</div>
				<div className="text-center">
					<button
						className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 ${!historyTracker[0] ? "dark:bg-gray-800" : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"}`}
						type="button"
						onClick={undoHandler}
						data-drawer-target="drawer-navigation"
						data-drawer-show="drawer-navigation"
						aria-controls="drawer-navigation"
						disabled={!historyTracker[0]}
					>
						Undo
					</button>
					<button
						className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 ${historyTracker[0] >= historyTracker[1] ? "dark:bg-gray-800" : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"}`}
						type="button"
						onClick={redoHandler}
						data-drawer-target="drawer-navigation"
						data-drawer-show="drawer-navigation"
						aria-controls="drawer-navigation"
						disabled={historyTracker[0] >= historyTracker[1]}
					>
						Redo
					</button>
				</div>
      </div>
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-64 dark:bg-gray-800 ${
          isOpen ? "" : "-translate-x-full"
        }`}
        tabIndex="-1"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
        >
          Menu
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={handleToggle}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        {isOpen ? <FormGenerator data={drawerData.current} onSubmit={submitData} nodeToEdit={nodeToEdit} /> : null}
      </div>
    </>
  );
};
export default LeftDrawer;
