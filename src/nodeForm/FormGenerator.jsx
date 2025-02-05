/* eslint-disable react/prop-types */
import { useMemo } from 'react';

import {formFields} from './fromFieldsConstants';
import { useForm } from "react-hook-form";

import Input from "./FormFields/Input";
import DropDown from "./FormFields/DropDown";

const FormGenerator = ({data, onSubmit, nodeToEdit}) => {
    // console.log(nodeToEdit);
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        defaultValues: nodeToEdit || null
    });
    const submitData = (data) => {
        console.log(data);
        onSubmit(data);
        reset();
    }
// to generate different kind of form using generic json ata and field to gerenrate the form on fly.
    const formfield = useMemo(() => {
        if (data?.nodeType) {
            return formFields[data.nodeType];
        }
        return [];
    }, [data?.nodeType])

    return (
        <div className="py-4 overflow-y-auto">
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit(submitData)}>
            {formfield.map((field, index) => {
                switch (field.type) {
                    case "Input":
                        return <Input register={register} key={index+field.fieldName} fieldData={field} errors={errors} />

                    case "DropDown":
                        return <DropDown register={register} key={index+field.fieldName} fieldData={field} errors={errors} />
                    default:
                        break;
                }
            })}
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
        </form>
        </div>
    );
}

export default FormGenerator;