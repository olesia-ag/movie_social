

//inputs validity check:
export const checkValidity = (value, rules) => {
    let isValid = true
    if (!rules) {
        return true
    }
    if (rules.required) {
        isValid = value.trim() !== '' && isValid
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }
    if (rules.numeric) {
        const pattern = /^\d+$/
        isValid = pattern.test(value) && isValid
    }
    if (rules.isEmail) {
        const pattern = /^[a-zA-Z0-9][a-zA-Z0-9-_.]+@([a-zA-Z]|[a-zA-Z0-9]?[a-zA-Z0-9-]+[a-zA-Z0-9])\.[a-zA-Z0-9]{2,10}(?:\.[a-zA-Z]{2,10})?$/
        isValid = pattern.test(value) && isValid
    }
    return isValid
}

export const updateObject = (oldObject, updateObject) => {
    return {
        ...oldObject,
        ...updateObject
    }
}

//may not to be in this file
export const checkMatch = (value, valueToCompare) => {
    if (value===valueToCompare) return true
    else return false
  }
