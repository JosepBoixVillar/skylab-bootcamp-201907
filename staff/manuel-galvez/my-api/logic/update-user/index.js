const { ObjectId } = require('mongodb')
const validate = require('../../utils/validate')
module.exports = function(id, fieldsToUpdate) {
    /**
     * 
     * @param {*} id
     * @param {*} fieldsToUpdate 
     * 
     * @returns {Promise}
     */

    validate.string(id, 'id')

    return this.__users__.updateOne({ _id: ObjectId(id) }, { $set: fieldsToUpdate })
        .then(user => {
            if (!user) throw Error('Fail to update fields')
            else if (!user.result.nModified) throw Error('Wrong fields provided.')
        })
}