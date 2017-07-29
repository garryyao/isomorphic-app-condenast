import {createServer} from 'http'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from 'react-router'
import Routes from './Routes'
import jsonfile from 'jsonfile'
import fs from 'fs'
import path from 'path'
import cheerio from 'cheerio'
import express from 'express';

const PORT = 3001
const articlesData = jsonfile.readFileSync('public/api-data.json');
const indexHtml = fs.readFileSync(path.join(__dirname, '../build/index.html'), 'utf8');
const $ = cheerio.load(indexHtml)
const ReactServer = (req, res) => {
  const context = {}
  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}>
      <Routes articles={articlesData}/>
    </StaticRouter>
  )
  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    })
    res.end()
  } else {
    $('#root').html(html)
    $(`<script>DATA_ARTICLES=${JSON.stringify(articlesData)}</script>`).insertAfter('#root')
    res.write($.html())
    res.end()
  }
}

const app = express()
app.use(express.static('build', {index: false}))
app.get('/api.json', express.static('public/api-data.json'))
app.get('/*', ReactServer)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})