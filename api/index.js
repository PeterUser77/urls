const http = require('http')
const data = require('./urls.json')
const URL = require('url')
const fs = require('fs')
const path = require('path')

function writeFile(cb) {

    return fs.writeFile(
        path.join(__dirname, "urls.json"),
        JSON.stringify(data, null, 2),
        err => {
            if (err) throw err

            return cb(JSON.stringify({message: "feito"}))
        }
    )
}

http.createServer((req, res) => {
    const { name, url, del } = URL.parse(req.url, true).query
    
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })

    // lista de urls
    if (!name || !url)
        return res.end(JSON.stringify(data))

    // deletar uma url
    if (del) {
        data.urls = data.urls.filter(item => String(item.url) !== String(url))
        return writeFile((message) => res.end(message))
    }

    // inserindo uma url
    data.urls.push({name, url})
    return writeFile((message) => res.end(message))
}).listen(3000)