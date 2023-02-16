import http from "node:http"

const server = http.createServer((req, res) => {
    const { url, method } = req

    if (url === "/users" && method === "GET") {
        return res.end(JSON.stringify(
            {
                users: [
                    {
                        name: "Kaio Felipe",
                        age: 17,
                        phoneNumber: 44998379460,
                    }
                ]
            }
        ))
    }

    if (url === "/users" && method === "POST") {
        return res.end(JSON.stringify({
            success: true,
            createdUser: {
                name: "Teste",
                age: 17,
                phoneNumber: 44998379460,
            }
        }))
    }

    return res.end("Request sent")
})

server.listen(3333)