export function buildRoutePath(path) {
    // path -> /users/:id

    const routeParamtersRegex = /:([a-zA-z0-9]+)/g
    // regex ^
    // começa com : | vai de a-z ou A-Z | essa sequência de letras pode se repetir
    // g = global, indica TODOS OS MATCHES, não apenas o primeiro. EX: /idum/iddois (com g os dois pegam)

    const pathWithParams = path.replaceAll(routeParamtersRegex, "(?<$1>[a-z0-9A-Z\-_]+)") // ?<id> nomeia esse grupo "()" com id
    const pathRegex = new RegExp(`^${pathWithParams}`)

    return pathRegex
}