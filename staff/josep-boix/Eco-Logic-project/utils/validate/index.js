const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/ 
const DATE_REGEX = /[0-1]{1}[0-9]{1}[\/][0-9]{2}/

module.exports = {

    string (target, name, empty = true) {
        if (typeof target !== 'string') throw TypeError (`${name} with value ${target} is not a string`)
        if (empty && !target.trim()) throw new Error (`${name} is empty or blank`)
    },

    number (target, name){
        if (typeof target === 'string' && !target.trim()) throw new Error (`${name} is empty or blank`)
        if (typeof target !== 'number') throw TypeError (`${name} with value ${target} is not a number`)
    },

    boolean (target, name) {
        if (typeof target === 'string' && !target.trim()) throw new Error (`${name} is empty or blank`)
        if (typeof target !== 'boolean') throw TypeError (`${name} with value ${target} is not a boolean`)
    },

    email (target, name) {
        if (typeof target === 'string' && !target.trim()) throw new Error (`${name} is empty or blank`)
        if (!EMAIL_REGEX.test(target)) throw Error (`${name} with value ${target} is not a valid e-mail`)
    }, 

    funtion (target, name) {
        if (typeof target === 'string' && !target.trim()) throw new Error (`${name} is empty or blank`)
        if (typeof target !== 'function') throw TypeError (`${name} with value ${target} is not a valid function`)
    },

    url (target, name) {
        if (typeof target === 'string' && !target.trim()) throw new Error (`${name} is empty or blank`)        
        if (!URL_REGEX.test(target)) throw Error (`${name} with value ${target} is not a valid url`)
    },

    date (target, name) {
        if (typeof target === 'string' && !target.trim()) throw new Error (`${name} is empty or blank`)
        if (!DATE_REGEX.test(target)) throw Error (`${name} with value ${target} is not a valid date`)
    }
}