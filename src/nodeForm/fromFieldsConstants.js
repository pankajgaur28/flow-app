export const nodeTypes = {
    TASK: "taskNode",
    CONDITION: "conditionNode",
    NOTIFICATION: "notificationNode"
};

export const formFields = {
    [nodeTypes.TASK] : [
        {
            "type": "Input",
            "title": "Title",
            "fieldName": 'title',
            "placeHolder": "title",
            validation: {
                required: "This is required",
                minLength: {
                    value: 4,
                    message: "Title should be min of 4 character"
                }
            }
        },
        {
            "type": "Input",
            "title": "Due date (DD/MM/YYYY)",
            "fieldName": 'dueDate',
            "placeHolder": "DD/MM/YYYY",
            validation: {
                required: "Due date is required",
                validate: {
                    validateDate: (value) => {
                        if (value) {
                            var temp = value.split('/');
                            var d = new Date(temp[2] + '/' + temp[1] + '/' + temp[0]);
                            const isValid = (d && (d.getMonth() + 1) == temp[1] && d.getDate() == Number(temp[0]) && d.getFullYear() == Number(temp[2]));
                            return isValid || "Please enter a valid date (DD/MM/YYYY)."
                        }
                            
                    }
                }
            }
        },
        {
            "type": "DropDown",
            "title": "Status",
            "fieldName": 'status',
            "options": ["Done", "Pending", "In progress"],
            validation: {
                required: "Status is required",
            }
        },
        {
            "type": "Input",
            "title": "Description",
            "fieldName": 'description',
            "placeHolder": "enter description",
            validation: {
                required: "Description is required",
            }
        }
    ],
    [nodeTypes.CONDITION] : [
        {
            "type": "Input",
            "fieldName": "checkIf",
            "title": "Ckeck if",
            "placeHolder": "write condition",
            validation: {
                required: "Ckeck if field is required",
            }
        }
    ],
    [nodeTypes.NOTIFICATION] : [
        {
            "type": "Input",
            "fieldName": "text",
            "title": "Text",
            "placeHolder": "notification text",
            validation: {
                required: "Text is required",
                minLength: {
                    value: 4,
                    message: "Text should be min of 4 character"
                }
            }
        },
        {
            "type": "Input",
            "fieldName": "medium",
            "title": "Medium",
            "placeHolder": "email / message etc..",
            validation: {
                required: "Medium is required",
            }

        } 
    ]
};
