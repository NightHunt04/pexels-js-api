const { createClient } = require('pexels')
const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 8000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('Server is running!'))

app.post('/api/pexels', async (req, res) => {
    const query = req.body.query
    const orientation = req.body.orientation

    const client = createClient(process.env.PEXELS_API_KEY)
    
    const videos = await client.videos.search({ query, per_page: 8, min_duration: 15, max_duration: 20, orientation })
    return res.json(videos)
})

app.post('/api/pexels-photo', async (req, res) => {
    const query = req.body.query
    const orientation = req.body.orientation

    const client = createClient(process.env.PEXELS_API_KEY)
    
    const photos = await client.photos.search({ query, per_page: 8, orientation })
    return res.json(photos)
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

module.exports = app