import { Schema } from "mongoose"
import { StringNull, Request, IPaginateObject, IPages, IOptions } from "./types"
import { toNumeric, setUrl } from "./utils"

module.exports = function (schema: Schema): void {

    schema.query.paginate = async function (req: Request, options: IOptions): Promise<IPaginateObject> {
        let firstPageUrl: StringNull = null
        let lastPageUrl: StringNull = null
        let params: any = { ...req.query }
        const page: number = toNumeric(params?.page) ? +params?.page : 1
        const perPage: number = toNumeric(params?.perPage) ? +params?.perPage : 15
        !options?.withQueryString && (params = { page, perPage })
        const queryString: URLSearchParams = new URLSearchParams(params)
        const total: number = await this.model.find(this.getQuery()).count()
        const totalPages: number = Math.ceil(total / perPage)
        const pages: Array<IPages> = Array(totalPages).fill(1).map((_, index): IPages => {
            const page: number = index + 1
            let nextPageUrl: StringNull = null
            let prevPageUrl: StringNull = null
            if (page + 1 <= totalPages) {
                const incPage: string = (page + 1).toString()
                queryString.set('page', incPage)
                nextPageUrl = setUrl(req, queryString, true)
            }
            if (index > 0) {
                const decPage: string = (page - 1).toString()
                queryString.set('page', decPage)
                prevPageUrl = setUrl(req, queryString, true)
            }
            return { page, nextPageUrl, prevPageUrl }
        })

        if (pages[0]) {
            queryString.set('page', pages[0]?.page?.toString())
            firstPageUrl = setUrl(req, queryString, true)
        }

        if (pages?.[pages?.length - 1]) {
            queryString.set('page', pages[pages.length - 1]?.page?.toString())
            lastPageUrl = setUrl(req, queryString, true)
        }

        const data: Array<any> = await this.model.find(this.getQuery(), this.projection() ?? { _: 0 })
            .sort(this.options?.sort ?? {})
            .skip((perPage ? +perPage : 15) * ((page ?? 1) - 1))
            .limit(perPage ? +perPage : 15)

        const pager = pages?.find(p => p.page == page)

        if (options?._sno) {
            let _sno: number = data?.length ? (page > 1 ? (perPage * (page - 1)) + 1 : 1) : 0
            for (let i = 0; i < data.length; i++) {
                data[i] = { ...data[i].toObject(), _sno }
                _sno++
            }
        }

        return {
            currentPage: +page,
            data,
            firstPageUrl,
            lastPageUrl,
            lastPage: totalPages,
            nextPageUrl: pager?.nextPageUrl ?? null,
            prevPageUrl: pager?.prevPageUrl ?? null,
            path: setUrl(req, queryString, false),
            perPage: +perPage,
            total
        }
    }

}