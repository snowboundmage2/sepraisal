export enum ROUTE {
  HOME = '/',
  ANALYSE = '/analyse',
  BROWSE = '/browse',
  COMPARE = '/compare',
  INFO = '/info',
}

export enum PROVIDER {
    STEAM = 'steam',
    LOCAL = 'upload',
    MODIO = 'modio',
}

export enum BROWSE_PARTS {
    SEARCH = 'search',
    AUTHOR = 'author',
    COLLECTION = 'collection',
    FILTER = 'filter',
    SORT = 'sort',
}

// TODO: Validate.
export const API_URL = process.env.API!
export const SERVICE_DESK_EMAIL = process.env.SERVICE_DESK_EMAIL!
export const MATOMO_PARAMS = {
    // TODO: Do not hardcode this.
    siteId: Number(process.env.MATAMO_SITE_ID!),
    url: process.env.MATAMO_URL!,
} as const