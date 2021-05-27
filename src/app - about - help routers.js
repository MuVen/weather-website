const path = require('path')
const express = require('express')

console.log(__dirname)
console.log(__filename)

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res)=>{
//     // const data = {
//     //     lat:'12.2',
//     //     lon:'3.3'
//     // }

//     //res.send('Hello Express!' + JSON.stringify(data))
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res)=>{
//     //res.send('Help Page!')
//     res.send({name:'praveen',
//               age:32
//             })
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>About</h1>')
//     // res.send([
//     //     {name: 'praveen', aga: 32},
//     //     {name: 'pragna', aga: 23},
//     //     {name: 'gayathri', aga: 27}
//     // ])
// })

app.get('/weather', (req, res)=>{
    res.send({
        forecast: "its snowing",
        location: "Boston"
    })
    //res.send('Weather Page!')
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})