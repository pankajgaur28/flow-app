import React from "react";

const Input = ({register, fieldData, errors}) => {
  return (
    <div className="mb-6">
      <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{fieldData.title}</label>
      <input type="text" {...register(fieldData.fieldName, fieldData.validation)} placeholder={fieldData.placeholder} id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        {errors[fieldData.fieldName]?.message && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors[fieldData.fieldName]?.message}</p>}
    </div>
    );
};

export default Input;