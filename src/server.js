import http from "node:http"

const users = []

const server = http.createServer(async (req, res) => {
    const { url, method } = req

    try {
        const buffers = []

        for await (const chunk of req) {
            buffers.push(chunk)
        }
    
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }

    if (url === "/users" && method === "GET") {
        return res
            .setHeader("Content-type", "application/json")
            .end(JSON.stringify(
            {
                users: users
            }
        ))
    }

    if (url === "/users" && method === "POST") {
        users.push(req.body)

        return res.writeHead(201).end()
    }

    return res.writeHead(404).end()
})

server.listen(3333)