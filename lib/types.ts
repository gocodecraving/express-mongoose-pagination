export { Request } from "express"
export type StringNull = string | null
export interface IPaginateObject {
    currentPage: number,
    data: Array<any>,
    firstPageUrl: StringNull,
    lastPageUrl: StringNull,
    lastPage: number,
    nextPageUrl: StringNull,
    prevPageUrl: StringNull,
    path: string,
    perPage: number,
    total: number
}
export interface IPages { page: number, nextPageUrl: StringNull, prevPageUrl: StringNull }
export interface IOptions { withQueryString?: boolean, _sno?: boolean }