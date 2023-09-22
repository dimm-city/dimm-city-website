

/**
 * @typedef {Object} CW.Attribute
 * @property {string} value - The value of the attribute
 * @property {string} trait_type - The type of the trait
 */

/**
 * @typedef {Object} CW.Metadata
 * @property {string} dna - DNA of the token
 * @property {number} date - The date of the token
 * @property {string} name - The name of the token
 * @property {string} image - The image URL of the token
 * @property {string} artist - The artist of the token
 * @property {number} edition - The edition of the token
 * @property {string} release - The release of the token
 * @property {string} compiler - The compiler of the token
 * @property {CW.Attribute[]} attributes - The attributes of the token
 * @property {string} description - The description of the token
 * @property {string} thumbnail_uri - The thumbnail URL of the token
 * @property {string} fullresolution_uri - The full resolution URL of the token
 */

/**
 * @typedef {Object} CW.Contract
 * @property {number} id - The ID of the contract
 * @property {string} name - The name of the contract
 * @property {string} slug - The slug of the contract
 * @property {string} entityType - The entity type of the contract
 * @property {string} address - The address of the contract
 * @property {string} chain - The chain of the contract
 */

/**
 * @typedef {Object} CW.Token
 * @property {number} id - The ID of the token
 * @property {string} tokenId - The token ID
 * @property {CW.Metadata} metadata - The metadata of the token
 * @property {CW.Contract} contract - The contract of the token
 */

/**
 * @typedef {Object} CW.Wallet
 * @property {number} id - The ID of the result
 * @property {string} address - The address of the result
 * @property {string} chain - The chain of the result
 * @property {string|null} name - The name of the result
 * @property {boolean} managed - Whether the result is managed
 * @property {boolean|null} primary - Whether the result is primary
 * @property {CW.Token[]} tokens - The tokens of the result
 */

