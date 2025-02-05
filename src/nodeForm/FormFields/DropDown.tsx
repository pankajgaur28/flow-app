import React from "react";

const DropDown = ({register, fieldData}) => {
    return (
        <>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{fieldData.title}</label>
            <select id="countries" {...register(fieldData.fieldName)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {fieldData.options.map((val) => {
                    return <option key={val} value={val}>{val}</option>
                })}
            </select>
        </>
    )
};

export default DropDown;