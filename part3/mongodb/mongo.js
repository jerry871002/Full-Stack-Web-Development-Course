const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.dby5wbl.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Person = mongoose.model('Person', personSchema)

// add a new phone number
if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    phone: process.argv[4],
  })

  mongoose
    .connect(url)
    .then(result => {
      console.log('connected')
      return person.save()
    })
    .then(result => {
      console.log(`added ${result.name} number ${result.phone} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
// show all phone numbers
} else {
  mongoose
    .connect(url)
    .then(result => {
      console.log('phonebook:')
      Person
        .find({})
        .then(result => {
          result.forEach(person => {
            console.log(person.name, person.phone)
          })
          return mongoose.connection.close()
        })
    })
    .catch((err) => console.log(err))
}
