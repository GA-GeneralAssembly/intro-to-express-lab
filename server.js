const express = require('express')
const app = express()

app.get('/greetings/:username', (req, res) => {
    const username = req.params.username
    res.send(`Hello there, ${username}!`)
})

app.get('/roll/:num', (req,res) => {
    const num = req.params.num
    if (num){
        const randNum = Math.floor(Math.random() * num+1)
        res.send(`You rolled a ${randNum}`)
    }else{
        res.send('You must specify a number')
    }
})

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ]

  app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10)
    const result = collectibles[index]

    if (result) {
        res.send(`So, you want the ${result.name}? For ${result.price}, it can be yours!`)
    } else {
        res.send('This item is not yet in stock. Check back soon!')
    }
})

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
]

app.get('/shoes', (req, res) => {
    const minPrice = req.query['min-price']
    const maxPrice = req.query['max-price']
    const type = req.query.type

    let filteredShoes = shoes

    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice))
    }else if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice))
    }else if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type)
    }

    res.send(filteredShoes)
})

app.listen(3000, ( () => {
    console.log('server is running on port 3000')
}))