require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(number) {
        if (number.length < 8) {
          return false
        }

        const splitedNumber = number.split('-')
        if (splitedNumber.length > 2) {
          return false
        }

        // if formed of two parts that are separated by "-"
        // the first part should have two or three numbers
        if (
          splitedNumber.length === 2 &&
          (splitedNumber[0].length < 2 || splitedNumber[0].length > 3)
        ) {
          return false
        }

        // all elements should be numbers
        splitedNumber.forEach(element => {
          if (isNaN(element)) {
            return false
          }
        })

        return true
      }
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)