module.exports = schema => {
    schema.query.paginate = async function (req, options = { withQueryString: false }) {
        let nextPageUrl = prevPageUrl = firstPageUrl = lastPageUrl = null
        let params = { ...req.query }
        const { perPage = 15, page = 1 } = params
        const url = req.protocol + '://' + req.get('host') + req.path
        const total = await this.model.countDocuments()
        const totalPages = Math.ceil(total / perPage)
        !options.withQueryString && (params = { page, perPage })
        const queryString = new URLSearchParams(params)

        const pages = Array(totalPages).fill().map((_, index) => {

            const page = index + 1

            if (page + 1 <= totalPages) {
                queryString.set('page', page + 1)
                nextPageUrl = setUrl()
            }

            if (page - 1 >= 1) {
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

        const currentUrl = `${url}?${new URLSearchParams(params).toString()}`
        const data = await this.model.find(this.getQuery(), this.projection() ?? { _: 0 })
            .sort(this.options?.sort ?? {})
            .skip((perPage ? +perPage : 15) * ((page ?? 1) - 1))
            .limit(perPage ? +perPage : 15)

        return { totalPages, data, total, page: +page, nextPageUrl, prevPageUrl, ...pages.find(p => p.page == page), perPage: +perPage, url, currentUrl, firstPageUrl, lastPageUrl }

        function setUrl() {
            return `${url}?${queryString.toString()}`
        }
    }
}