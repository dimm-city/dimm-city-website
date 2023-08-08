/**
 * @typedef {Object} BiggerPicture.MediaSource
 * @property {string} src - The URL or path to the media source.
 * @property {?string} type - The MIME type of the media. Optional, but recommended for compatibility.
 */

/**
 * @typedef {Object} BiggerPicture.TextTrack
 * @property {string} label - Label for the text track (e.g., "English").
 * @property {string} kind - Kind of text track (e.g., "captions").
 * @property {string} srclang - Language code for the text track (e.g., "en").
 * @property {string} src - The URL or path to the text track source.
 * @property {?boolean} default - Whether the track should be default. Optional.
 */

/**
 * @typedef {Object} BiggerPicture.Item
 * @property {(number|string)} [width=1920] - Largest possible width of media item in pixels. Not required for HTML.
 * @property {(number|string)} [height=1080] - Largest possible height of media item in pixels. Not required for HTML.
 * @property {string} thumb - URL or path to image used for thumbnail displayed before media loads.
 * @property {(Array<BiggerPicture.MediaSource>|string)} sources - Array of media sources or a JSON parsable string.
 * @property {?string} alt - Image alternative text.
 * @property {?string} title - Title attribute for iframes.
 * @property {?HTMLElement} [element] - Node element on the page for default open/close animation.
 * @property {?string} caption - Text to be displayed using built-in caption.
 * @property {(Array<BiggerPicture.TextTrack>|string)} [tracks] - Array of text track data or a JSON parsable string.
 * @property {?(string|Array<string>)} img - URL or path to full image. Can be a `srcset` value.
 * @property {?string} sizes - Sets the sizes attribute if using `srcset`.
 * @optional {?number} maxZoom - Restricts an image's maximum zoom.
 * @optional {?string} html - HTML that will be rendered in the container.
 * @optional {?string} iframe - URL or path to iframe source.
 */
