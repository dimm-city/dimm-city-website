/**
 * @typedef {Object} Strapi.ImageFormat
 * @property {string} ext - The extension of the image
 * @property {string} url - The URL of the image
 * @property {string} hash - The hash of the image
 * @property {string} mime - The mime type of the image
 * @property {string} name - The name of the image
 * @property {?string} path - The path of the image
 * @property {number} size - The size of the image
 * @property {number} width - The width of the image
 * @property {number} height - The height of the image
 */

/**
 * @typedef {Object} Strapi.ImageFormats
 * @property {Strapi.ImageFormat} large - Large format of the image
 * @property {Strapi.ImageFormat} small - Small format of the image
 * @property {Strapi.ImageFormat} medium - Medium format of the image
 * @property {Strapi.ImageFormat} thumbnail - Thumbnail format of the image
 */

/**
 * @typedef {Object} Strapi.Media
 * @property {number} id - Unique ID of the image media
 * @property {Object} attributes - Detailed properties of the image media
 * @property {string} attributes.name - The name of the image media
 * @property {?string} attributes.alternativeText - The alternative text of the image media
 * @property {?string} attributes.caption - The caption of the image media
 * @property {number} attributes.width - The width of the image media
 * @property {number} attributes.height - The height of the image media
 * @property {?Strapi.ImageFormats} attributes.formats - Different formats of the image media
 * @property {string} attributes.hash - The hash of the image media
 * @property {string} attributes.ext - The extension of the image media
 * @property {string} attributes.mime - The mime type of the image media
 * @property {number} attributes.size - The size of the image media
 * @property {string} attributes.url - The URL of the image media
 * @property {?string} attributes.previewUrl - The preview URL of the image media
 * @property {string} attributes.provider - The provider of the image media storage
 * @property {?Object} attributes.provider_metadata - The metadata provided by the storage provider
 * @property {string} attributes.createdAt - The timestamp of image media creation
 * @property {string} attributes.updatedAt - The timestamp of the last image media update
 */



/**
 * @typedef {Object} Strapi.Pagination
 * @property {number} page - The current page number
 * @property {number} pageSize - The number of items per page
 * @property {?number} pageCount - The total number of pages
 * @property {?number} total - The total number of items
 */

/**
 * @typedef {Object} Strapi.APIRequestParams
 * @property {Array<string>} sort - Array of strings defining the sorting order
 * @property {any} filters - Filters to apply
 * @property {string} populate - Field to populate
 * @property {Array<string>} fields - Array of strings defining the fields to be fetched
 * @property {Strapi.Pagination} pagination - Pagination parameters
 * @property {string} publicationState - Publication state filter
 * @property {Array<string>} locale - Array of strings defining the locale
 */


/**
 * @template T
 * @typedef {Object} Strapi.APIResponse<T>
 * @property {Array<T>[]} results - The results of the response
 * @property {Strapi.Pagination} pagination - The pagination info of the response
 */