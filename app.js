const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurants.json').results

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))




// index 頁面路由
app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

// 搜尋餐廳路由
app.get('/restaurants', (req, res) => {
  const keyword = req.query.search

  const matchedRestaurants = keyword ? restaurants.filter((re) =>
    Object.values(re).some((property) => {
      if (typeof property === 'string') {
        return property.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
  ) : restaurants
  res.render('index', { restaurants: matchedRestaurants, keyword })
})

// 餐廳詳細頁面路由
app.get('/restaurants/:id', (req, res) => {
  // 從 req.params 物件取得 URL 中的餐廳 id
  const id = req.params.id
  const restaurant = restaurants.find((re) => re.id.toString() === id)
  res.render('detail', { restaurant })
})


app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})