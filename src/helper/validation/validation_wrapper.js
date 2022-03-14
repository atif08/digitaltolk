import validationRules from './validationRules.js'
import validatejs from 'validate.js'

export  function validate(fieldName, value) {
    // Validate.js validates your values as an object
    // e.g. var form = {email: 'email@example.com'}
    // Line 8-9 creates an object based on the field name and field value
    var formValues = {}
    formValues[fieldName] = value
    // Line 13-14 creates an temporary form with the validation fields
    // e.g. var formFields = {
    //                        email: {
    //                         presence: {
    //                          message: 'Email is blank'
    //                         }
    //                       }
    var formFields = {}
    formFields[fieldName] = validationRules[fieldName]
    // The formValues and validated against the formFields
    // the variable result hold the error messages of the field
    const result = validatejs(formValues, formFields)
    // If there is an error message, return it!

    if (result) {
        // console.warn(result[fieldName][0]);
        // Return only the field error message if there are multiple
        return result[fieldName][0]
    }
    return null
}
export  function onSubmit(fields) {
    // getting validation rules only for given fields
    var formFields = {}
    const keys = Object.keys(fields)
    for (const key of keys) {
        formFields[key] = validationRules[key]
    }
    //build error object to update in state
    const error = validatejs(fields, formFields);
    if(error){
        var buildErrorObject = {}
        const errorKeys = Object.keys(error)
        for (const key of errorKeys) {
            buildErrorObject[key+'Error'] = error[key][0]
        }
    }

    return buildErrorObject
}
