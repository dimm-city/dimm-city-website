/**
 * Specialty class implementing IArticle interface.
 * @interface
 */
export class Specialty {
	/**
	 * Creates an instance of Specialty.
	 */
	constructor() {
	  /**
	   * The name of the specialty.
	   * @type {string}
	   */
	  this.name = "";
	}
  
	/**
	 * The ID of the specialty.
	 * @type {number | undefined}
	 */
	id;
	
	/**
	 * The slug of the specialty.
	 * @type {string | undefined}
	 */
	slug;
  
	/**
	 * The description of the specialty.
	 * @type {string | undefined}
	 */
	description;
  
	/**
	 * The URL of the image for the specialty.
	 * @type {string | undefined}
	 */
	imageUrl;
  
	/**
	 * The URL of the video for the specialty.
	 * @type {string | undefined}
	 */
	videoUrl;
  
	/**
	 * The URL of the thumbnail for the specialty.
	 * @type {string | undefined}
	 */
	thumbnailUrl;
  
	/**
	 * The tags associated with the specialty.
	 * @type {string | undefined}
	 */
	tags;
  
	/**
	 * The type of the specialty.
	 * @type {string | undefined}
	 */
	type;
  
	/**
	 * The author of the specialty.
	 * @type {string | undefined}
	 */
	author;
  }
  
  