import { Request } from "./types"

export function toNumeric(val: any): boolean {
    return Boolean(val) && !isNaN(val)
}

export function setUrl(req: Request, queryString: URLSearchParams, withQueryString?: boolean): string {
    return `${req.protocol}://${req.get('host') + (req?.originalUrl?.split('?')?.[0] || '')}${withQueryString ? `?${queryString.toString()}` : ''}`
}