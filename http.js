const http = require('http')

const server = http.createServer(function (req,res) {
    console.log(req.url)
    res.end('<h1>hello,resonse is good...</h1>')
})
const PORT = process.env.PORT || 8080
server.listen(PORT,()=>{
console.log('Server is running on port 5050...')
})