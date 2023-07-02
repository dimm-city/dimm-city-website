/**

Location class implementing IArticle interface.

* @type {import("../Shared/Models/IArticle").IArticle | null}
*/
export class Location {
	/*
Creates an instance of Location. */
	constructor() {
		/*
    The name of the location.
    @type {string} */
		this.name = '';
	}

	/**
	 *
	 * The ID of the location.
	 * @type {number | undefined}
	 */
	id;

	/**
	 *
	 * The slug of the location.
	 * @type {string | undefined}
	 */
	slug;

	/**
	 *
	 * The description of the location.
	 * @type {string | undefined}
	 */
	description;

	/**
	 *
	 * The URL of the image for the location.
	 * @type {string | undefined}
	 */
	imageUrl;

	/**
	 *
	 * The URL of the video for the location.
	 * @type {string | undefined}
	 */
	videoUrl;

	/**
	 *
	 * The URL of the thumbnail for the location.
	 * @type {string | undefined}
	 */
	thumbnailUrl;

	/**
	 *
	 * The tags associated with the location.
	 * @type {string | undefined}
	 */
	tags;

	/**
	 *
	 * The type of the location.
	 * @type {string | undefined}
	 */
	type;

	/**
	 *
	 * The author of the location.
	 * @type {string | undefined}
	 */
	author;
}
