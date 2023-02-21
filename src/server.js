import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"
import { extractQueryParams } from "./utils/extract-query-params.js"

const server = http.createServer(async (req, res) => {
    const { url, method } = req
    await json(req, res)

    const activeRoute = routes.find(route => route.method === method && route.path.test(url))

    if (activeRoute === undefined) {
        return res.writeHead(404).end()
    }

    const activeRouteParams = req.url.match(activeRoute.path)
    const { query, ...params } = activeRouteParams.groups // params é o mesmo que ...rest, mas com um nome

    const queryParams = query ? extractQueryParams(query) : {}
    
    req.params = params ? params : {}
    req.query = queryParams
    activeRoute.handler(req, res)
})

server.listen(3333)