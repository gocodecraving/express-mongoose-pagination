module.exports = schema => {
    schema.query.paginate = async function (req, options = { withQueryString: false }) {
        let firstPageUrl = lastPageUrl = null
        let params = { ...req.query }
        const page = isNumeric(params?.page) ? params?.page : 1
        const perPage = isNumeric(params?.perPage) ? params?.perPage : 15
        !options.withQueryString && (params = { page, perPage })
        const queryString = new URLSearchParams(params)
        const path = setUrl(withQueryString = false)

        const total = await this.model.countDocuments(this.getQuery())
        const totalPages = Math.ceil(total / perPage)

        const pages = Array(totalPages).fill().map((_, index) => {

            const page = index + 1
            let nextPageUrl = prevPageUrl = null

            if (page + 1 <= totalPages) {
                queryString.set('page', page + 1)
                nextPageUrl = setUrl()
            }

            if (index > 0) {
                queryString.set('page', page - 1)
                prevPageUrl = setUrl()
            }

            return { page, nextPageUrl, prevPageUrl }
        })

        if (pages?.[0]) {
            queryString.set('page', pages?.[0]?.page)
            firstPageUrl = setUrl()
        }

        if (pages?.[pages?.length - 1]) {
            queryString.set('page', pages?.[pages?.length - 1]?.page)
            lastPageUrl = setUrl()
        }


        const data = await this.model.find(this.getQuery(), this.projection() ?? { _: 0 })
            .sort(this.options?.sort ?? {})
            .skip((perPage ? +perPage : 15) * ((page ?? 1) - 1))
            .limit(perPage ? +perPage : 15)

        const pager = pages?.find(p => p.page == page)
        const from = data?.length ? (page > 1 ? (perPage * (page - 1)) + 1 : 1) : 0;

        return {
            currentPage: +page,
            data,
            firstPageUrl,
            lastPageUrl,
            from,
            to: (from - 1) + data?.length,
            lastPage: totalPages,
            nextPageUrl: pager?.nextPageUrl ?? null,
            prevPageUrl: pager?.prevPageUrl ?? null,
            path,
            perPage: +perPage,
            total
        }

        function setUrl(withQueryString = true) {
            return `${req.protocol}://${req.get('host') + req.path}${withQueryString ? `?${queryString.toString()}` : ''}`
        }
        function isNumeric(v) {
            return Boolean(v) && !isNaN(v)
        }
    }

}