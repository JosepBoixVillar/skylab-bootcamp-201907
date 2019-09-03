const validate = require ('./')
const { expect } = require ('chai')

describe ('validate', () => {
    
    describe ('string', () => {
        it ('should succeed on string', () => {
            validate.string ('some string', 'string')
            expect(true).to.be.true
        })
        it ('should throw TypeError on not string', () => {
            expect(() => { validate.string(123, 'string') }).to.throw(Error, 'string with value 123 is not a string')
            expect(false).to.be.false
        })
        it ('should throw Error on empty value', () => {
            expect(() => { validate.string() }).to.throw(Error, 'string is empty or blank')
        })
    })
    
    describe ('number', () => {
        it ('should succeed on number', () => {
            validate.number (123, 'number')
            expect(true).to.be.true
        })
        it ('should throw TypeError on not number', () => {
            expect(() => { validate.number('string', 'number') }).to.throw(Error, 'number with value string is not a number')
            expect(false).to.be.false
        })
        it ('should throw Error on empty value', () => {
            expect(() => { validate.number() }).to.throw(Error, 'number is empty or blank')
        })
    })

    describe ('boolean', () => {
        it ('should succeed on boolean', () => {
            validate.boolean ("false", 'boolean')
            expect(true).to.be.true
        })
        it ('should succeed on boolean', () => {
            expect(() => { validate.boolean('', 'boolean') }).to.throw(Error, 'boolean with value string is not a boolean')
            expect(false).to.be.false
        })
    })

    describe ('email', () => {
        it ('should succeed on e-mail', () => {
            validate.email('test@mail.com', 'email')
            expect(true).to.be.true
        })
        it ('should throw TypeError on not email', () => {
            expect(() => { validate.email('not#mail.com', 'email') }).to.throw (Error, 'email with value not#mail.com is not a valid e-mail')
        })
        it ('should throw Error on empty value', () => {
            expect(() => { validate.email() }).to.throw(Error, 'email is empty or blank')
        })
    })

    describe ('function', () => {
        it ('should succeed on function', () => {
            const func = function func() {}

            validate.function(func, 'function')
            expect(true).to.be.true
        })
        it ('should throw TypeError on not function', () => {
            expect(() => { validate.function('not_a_function', 'function') }).to.throw (Error, 'function with value not_a_function is not a valid function')
        })
        it ('should throw Error on empty value', () => {
            expect(() => { validate.function() }).to.throw(Error, 'function is empty or blank')
        })
    })

    describe ('url', () => {
        it ('should succeed on url', () => {
            validate.url('www.url.com', 'url')
            expect(true).to.be.true
        })
        it ('should throw TypeError on not url', () => {
            expect(() => { validate.url('w.not#url.com', 'url') }).to.throw (Error, 'url with value w.not#url.com is not a valid url')
        })
        it ('should throw Error on empty value', () => {
            expect(() => { validate.url() }).to.throw(Error, 'url is empty or blank')
        })
    })

    describe ('date', () => {
        it ('should succeed on date', () => {
            validate.date('11/06/1986', 'date')
            expect(true).to.be.true
        })
        it ('should throw TypeError on not da', () => {
            expect(() => { validate.date ('not_a_date', 'date') }).to.throw (Error, 'date  with value w.not#dat.com is not a valid dat')
        })
        it ('should throw Error on empty value', () => {
            expect(() => { validate.date() }).to.throw(Error, 'date is empty or blank')
        })
    })
})