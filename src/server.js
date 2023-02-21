import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"

const server = http.createServer(async (req, res) => {
    const { url, method } = req
    await json(req, res)

    const activeRoute = routes.find(route => route.method === method && route.path.test(url))

    if (activeRoute === undefined) {
        return res.writeHead(404).end()
    }

    const activeRouteParams = req.url.match(activeRoute.path)
    console.log(activeRouteParams)
    activeRoute.handler(req, res)
})

server.listen(3333)