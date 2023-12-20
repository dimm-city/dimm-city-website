/**
 * @typedef {Object} DC.Config
 * @property {string} version - The version of the application
 * @property {string} env - The environment in which the application is running
 * @property {string} googleKey - The Google API key for the application
 * @property {string} baseUrl - The base URL for the application
 * @property {string} storageBaseUrl - The base URL for the CDN/uploads/assets location
 * @property {string} graphUrl - The GraphQL endpoint URL for the application
 * @property {string} apiBaseUrl - The base API URL for the application
 * @property {string} stripePublicKey - The public key for Stripe
 * @property {Object} itchio - Contains itchio settings
 * @property {string} itchio.client_id - client id for app
 * @property {?Strapi.APIRequestParams} defaultSummaryQuery - The default summary query parameters
 */


/**
 * @typedef {Object} DC.DiceConfig
 * @property {?string} [themeName] - The name of the item.
 * @property {?DC.DiceColorSet} customTheme - A custom theme for the dice.
 */

/**
 * @typedef {Object} DC.DiceColorSet
 * @property {string} name - The name of the item.
 * @property {string} description - The description of the item.
 * @property {string} [category] - The category of the item.
 * @property {string} foreground - The color of the item's foreground.
 * @property {string} background - The color of the item's background.
 * @property {string} [outline] - The outline of the item.
 * @property {string} texture - The texture of the item.
 */
/**
 * @typedef {Object} DC.DiceBoxConfig
 * @property {string} assetPath - The path to the assets.
 * @property {number} [framerate] - The framerate for the dice animation.
 * @property {boolean} [sounds] - Whether or not to play sounds.
 * @property {?number} [volume] - The volume level.
 * @property {?number} [color_spotlight] - The color of the spotlight.
 * @property {?boolean} [shadows] - Whether or not to display shadows.
 * @property {?string} [theme_surface] - The surface theme.
 * @property {?string} [sound_dieMaterial] - The material of the dice sound.
 * @property {?DC.DiceColorSet} [theme_customColorset] - The custom color set for the theme.
 * @property {?string} [theme_colorset] - The color set for the theme.
 * @property {?string} [theme_texture] - The texture for the theme.
 * @property {?string} [theme_material] - The material for the theme.
 * @property {?number} [gravity_multiplier] - The multiplier for gravity.
 * @property {?number} [light_intensity] - The intensity of the light.
 * @property {?number} [baseScale] - The base scale.
 * @property {?number} [strength] - The strength of the toss.
 * @property {?Function} [onRollComplete] - The function to call when the roll is complete.
 */

/**
 * @template T
 * @typedef {Object} DC.ListItem<T>
 * @property {Number} [id]
 * @property {boolean} manual
 * @property {string} text
 * @property {string} description
 * @property {Object} item
 * @property {number[]} item.connect
 * @property {number[]} item.disconnect
 * @property {T} item.data
 */

/**
 * @typedef {Object} DC.BaseEntity
 * @property {number} id - Unique ID of the item
 * @property {Object} attributes - Detailed properties of the item
 * @property {string} attributes.name - The name of the item
 * @property {string} attributes.slug - The slug of the item
 * @property {string} attributes.shortDescription - Short description of the item
 * @property {string} attributes.description - Description of the item
 * @property {string} attributes.createdAt - The timestamp of item creation
 * @property {string} attributes.updatedAt - The timestamp of the last item update
 * @property {string} attributes.publishedAt - The timestamp when the item was published
 * @property {Object} attributes.mainImage - The main image of the item
 * @property {Strapi.Media} attributes.mainImage.data - The data of the main image of the item
 * @property {Object} attributes.mainVideo - The main video of the item
 * @property {Strapi.Media} attributes.mainVideo.data - The data of the main video of the item
 * @property {Object} attributes.mainModel - The main model of the item
 * @property {Strapi.Media} attributes.mainModel.data - The data of the main model of the item
 */

/**
 * @typedef {DC.BaseEntity} DC.Script
 */

/**
 * @typedef DC.SummaryItem
 * @property {number} id
 * @property {Object} attributes
 * @property {string} attributes.name
 * @property {string} attributes.slug
 * @property {?string} attributes.type
 * @property {?string} attributes.shortDescription
 * @property {?Strapi.Media} attributes.mainImage.data
 * @property {?string} attributes.tags
 */

/**
 * @typedef {Object} DC.AbilityAttributes
 * @property {string} name - The name of the ability
 * @property {string} slug - The slug of the ability
 * @property {number} ap - The action points of the ability
 * @property {number} maxAP - The maximum action points of the ability
 * @property {boolean} rollDice - The boolean flag indicating if the ability rolls dice
 * @property {boolean} cybernetic - The boolean flag indicating if the ability is cybernetic
 * @property {string} description - Description of the ability
 * @property {string} shortDescription - Short description of the ability
 * @property {string} createdAt - The timestamp of ability creation
 * @property {string} updatedAt - The timestamp of the last ability update
 * @property {string} publishedAt - The timestamp when the ability was published
 * @property {Object} mainImage - The main image of the ability
 * @property {Strapi.Media} mainImage.data - The data of the main image of the ability
 * @property {number} level - The level of the ability in the matrix
 * @property {number} module - The path of the ability in the matrix
 */

/**
 * @typedef {Object} DC.Ability
 * @property {number} id - Unique ID of the ability
 * @property {DC.AbilityAttributes} attributes - Detailed properties of the ability
 * @property {boolean} selected - The boolean flag indicating if the ability is selected in the UI
 * @property {boolean} unlocked - The boolean flag indicating if the ability is locked
 * @property {boolean} acquired - The boolean flag indicating if the ability has been acquired by the character

 */

/**
 * @typedef {Object} DC.Character
 * @property {number| null} [id] - Unique ID of the character
 * @property {Object} attributes - Detailed properties of the character
 * @property {string} attributes.name - The name of the character
 * @property {string} attributes.tokenId - The token ID of the character
 * @property {number} attributes.hp - The HP of the character
 * @property {number} attributes.ap - The AP of the character
 * @property {number} attributes.height - The height of the character
 * @property {number} attributes.weight - The weight of the character
 * @property {string} attributes.age - The age of the character
 * @property {string} attributes.pronouns - The pronouns of the character
 * @property {string} attributes.eyes - The eye color of the character
 * @property {string} attributes.skin - The skin color of the character
 * @property {string} attributes.hair - The hair description of the character
 * @property {string} attributes.vibe - DEPRECATED The vibe of the character
 * @property {string} attributes.vibes - The vibe of the character
 * @property {string} attributes.noticeableTraits - The noticeable traits of the character
 * @property {string} attributes.backstory - The backstory of the character
 * @property {string} attributes.beliefs - DEPRECATED The beliefs of the character
 * @property {string} attributes.ideal - The beliefs of the character
 * @property {DC.ListItem<DC.Item>[]} attributes.inventory - The list of inventory items
 * @property {string} attributes.flaws - DEPRECATED The flaws of the character
 * @property {string} attributes.flaw - The flaws of the character
 * @property {string} attributes.dreams - The dreams of the character
 * @property {string} attributes.clothing - The clothing of the character
 * @property {string} attributes.movementDescription - The movement description of the character
 * @property {string} attributes.imageUrl - The image URL of the character
 * @property {boolean} attributes.playerUpdated - Indicates whether player updated
 * @property {boolean} attributes.playerCharacter - Indicates whether is player character
 * @property {string} attributes.playerNotes - The player's notes about the character
 * @property {string} attributes.createdAt - The creation timestamp of the character
 * @property {string} attributes.updatedAt - The updated timestamp of the character
 * @property {string} attributes.publishedAt - The published timestamp of the character
 * @property {Object} attributes.race
 * @property {DC.Race} attributes.race.data - The race of the character
 * @property {Object} attributes.originLocation
 * @property {Number[]} attributes.originLocation.set
 * @property {?DC.Location} attributes.originLocation.data - The origin location of the character
 * @property {Object} attributes.currentLocation
 * @property {Number[]} attributes.currentLocation.set
 * @property {DC.Location} attributes.currentLocation.data - The current location of the character
 * @property {Object} attributes.faction
 * @property {DC.Faction} attributes.faction.data - The faction of the character
 * @property {Object} attributes.specialties
 * @property {DC.Specialty[]} attributes.specialties.data - The specialties of the character
 * @property {Object} attributes.selectedAbilities
 * @property {DC.Ability[]} attributes.selectedAbilities.data - The selected abilities of the character
 * @property {DC.ListItem<DC.Cybernetic>[]} attributes.cybernetics
 * @property {DC.ListItem<DC.Script>[]} attributes.scripts - The list of inventory items
 * @property {Object} attributes.mainImage -
 * @property {Strapi.Media} attributes.mainImage.data - Main image of the entity
 * @property {Object} attributes.mainVideo
 * @property {Strapi.Media} attributes.mainVideo.data - Main video of the entity
 * @property {Object} attributes.mainModel
 * @property {Strapi.Media} attributes.mainModel.data - Main model of the entity
 * @property {Object} attributes.token - The token of the character
 */

/**
 * @typedef {Object} DC.CharacterRelease
 * @property {number} id
 * @property {Object} attributes
 * @property {string} attributes.name
 * @property {string} attributes.slug
 * @property {string} attributes.icon
 * @property {string} attributes.description
 * @property {Object} attributes.metadata
 * @property {string} attributes.tags
 * @property {string} attributes.createdAt
 * @property {string} attributes.updatedAt
 * @property {string} attributes.publishedAt
 * @property {{data: Strapi.Media}} attributes.mainImage
 * @property {{data: Strapi.Media}} attributes.mainVideo
 * @property {{data: Array<DC.Race>}} attributes.races
 * @property {{data: ChainWallets.Contract}} attributes.contract
 */

/**
 * @typedef {Object} DC.Cybernetic
 * @property {number} id - Unique ID of the item
 * @property {Object} attributes - Detailed properties of the item
 * @property {string} attributes.name - The name of the item
 * @property {string} attributes.slug - The slug of the item
 * @property {string} attributes.type - The type of the item
 * @property {string} attributes.shortDescription - Short description of the item
 * @property {string} attributes.description - Description of the item
 * @property {string} attributes.createdAt - The timestamp of item creation
 * @property {string} attributes.updatedAt - The timestamp of the last item update
 * @property {string} attributes.publishedAt - The timestamp when the item was published
 * @property {Object} attributes.mainImage - The main image of the item
 * @property {Strapi.Media} attributes.mainImage.data - The data of the main image of the item
 * @property {Object} attributes.mainVideo - The main video of the item
 * @property {Strapi.Media} attributes.mainVideo.data - The data of the main video of the item
 * @property {Object} attributes.mainModel - The main model of the item
 * @property {Strapi.Media} attributes.mainModel.data - The data of the main model of the item
 * @property {Object} meta - The metadata of the item
 */

/**
 * @typedef {Object} DC.Faction
 * @property {number} id - Unique ID of the faction
 * @property {Object} attributes - Detailed properties of the faction
 * @property {string} attributes.name - The name of the faction
 * @property {string} attributes.shortDescription - The short description of the faction
 * @property {string} attributes.description - The long description of the faction
 * @property {string} attributes.slug - The slug of the faction
 * @property {string} attributes.createdAt - The timestamp of faction creation
 * @property {string} attributes.updatedAt - The timestamp of the last faction update
 * @property {string} attributes.publishedAt - The timestamp of when the faction was published
 * @property {Object} attributes.mainImage
 * @property {Strapi.Media} attributes.mainImage.data - Main image of the faction
 * @property {Object} attributes.mainVideo
 * @property {Strapi.Media} attributes.mainVideo.data - Detailed data of the main video
 * @property {Object} attributes.members
 * @property {Array<Object>} attributes.members.data - Members of the faction
 * @property {Object} attributes.leaders
 * @property {Array<Object>} attributes.leaders.data - Leaders of the faction
 * @property {Object} attributes.location
 * @property {DC.Location} attributes.location.data - Location of the faction
 */

/**
 * @typedef {Object} DC.GalleryItemAttributes
 * @property {string} name - The name of the gallery item.
 * @property {?string} caption - The caption of the gallery item, can be in rich text format and has a maximum length of 500 characters.
 * @property {?string} height - The height description of the gallery item.
 * @property {?string} width - The width description of the gallery item.
 * @property {?{data: Strapi.Media}} mainVideo - The main video media associated with the gallery item. Only allows video types.
 * @property {?{data: Strapi.Media}} mainImage - The main image media associated with the gallery item. Only allows image types.
 * @property {string} slug - Unique identifier generated from the 'name' of the gallery item.
 */

/**
 * @typedef {Object} DC.GalleryItem
 * @property {number} id - The unique ID of the gallery item.
 * @property {DC.GalleryItemAttributes} attributes - Detailed properties of the gallery item.
 * @property {string} createdAt - The timestamp of the gallery item creation.
 * @property {string} updatedAt - The timestamp of the last gallery item update.
 * @property {?boolean} published_at - The timestamp when the gallery item was published. Only present if 'draftAndPublish' is enabled.
 */

/**
 * @typedef DC.HistoricalEvent
 * @type {object}
 * @property {number} id - The event ID.
 * @property {object} attributes - The event attributes.
 * @property {string} attributes.name - The name of the event.
 * @property {string} attributes.slug - The slug of the event.
 * @property {string} attributes.date - The date of the event.
 * @property {string} attributes.shortDescription - The short description of the event.
 * @property {string} attributes.description - The description of the event.
 * @property {string} attributes.createdAt - The creation date of the event.
 * @property {string} attributes.updatedAt - The update date of the event.
 * @property {?string} attributes.publishedAt - The publication date of the event.
 * @property {{data: Strapi.Media}} attributes.mainImage - The main image of the event.
 * @property {{data: Strapi.Media}} attributes.mainVideo - The main video of the event.
 * @property {{data: Strapi.Media}} attributes.location - The location of the event.
 * @property {{data: Array.<DC.Character>}} attributes.characters - The characters involved in the event.
 */




/**
 * @typedef {Object} DC.Item
 * @property {number} id - Unique ID of the item
 * @property {Object} attributes - Detailed properties of the item
 * @property {string} attributes.name - The name of the item
 * @property {string} attributes.slug - The slug of the item
 * @property {string} attributes.type - The type of the item
 * @property {string} attributes.shortDescription - Short description of the item
 * @property {string} attributes.description - Description of the item
 * @property {string} attributes.createdAt - The timestamp of item creation
 * @property {string} attributes.updatedAt - The timestamp of the last item update
 * @property {string} attributes.publishedAt - The timestamp when the item was published
 * @property {Object} attributes.mainImage - The main image of the item
 * @property {Strapi.Media} attributes.mainImage.data - The data of the main image of the item
 * @property {Object} attributes.mainVideo - The main video of the item
 * @property {Strapi.Media} attributes.mainVideo.data - The data of the main video of the item
 * @property {Object} attributes.mainModel - The main model of the item
 * @property {Strapi.Media} attributes.mainModel.data - The data of the main model of the item
 * @property {Object} meta - The metadata of the item
 */

/**
 * @typedef {Object} DC.JournalEntry
 * @property {number} id - Unique identifier.
 * @property {Object} attributes - Journal attributes.
 * @property {string} attributes.name - Name of the journal.
 * @property {string} attributes.slug - Slug of the journal.
 * @property {string} attributes.type - Type of the journal.
 * @property {string} attributes.recordedAt - Date when the journal was recorded.
 * @property {string} attributes.shortDescription - Short description of the journal.
 * @property {string} attributes.description - Long description of the journal.
 * @property {string} attributes.tags - Tags of the journal.
 * @property {null} attributes.metadata - Metadata of the journal.
 * @property {string} attributes.createdAt - Date when the journal was created.
 * @property {string} attributes.updatedAt - Date when the journal was updated.
 * @property {string} attributes.publishedAt - Date when the journal was published.
 * @property {Object} attributes.mainImage -
 * @property {Strapi.Media} attributes.mainImage.data - Main image of the entity
 * @property {Object} attributes.mainVideo
 * @property {Strapi.Media} attributes.mainVideo.data - Main video of the entity
 * @property {Object} attributes.mainModel
 * @property {Strapi.Media} attributes.mainModel.data - Main model of the entity
 * @property {Object} attributes.mainAudio
 * @property {Strapi.Media} attributes.mainAudio.data - Main audio of the journal.
 */

/**
 * @typedef {DC.BaseEntity} DC.Location
 * @property {Array<DC.Race>} attributes.races.data - Information about races in the location
 * @property {Array<DC.Location>} attributes.regions.data - Information about regions in the location
 * @property {DC.Location} attributes.region.data - Information about a region in the location
 * @property {DC.World} attributes.world.data - Information about the world in which the location is
 * @property {Array<DC.Faction>} attributes.factions.data - Information about factions in the location
 * @property {Strapi.Media} attributes.mainAudio.data - Main audio of the location
 */

/**
 * @typedef {Object} DC.Race
 * @property {number} id - Unique ID of the race
 * @property {Object} attributes - Detailed properties of the race
 * @property {?string} attributes.shortDescription - A short description of the race
 * @property {?string} attributes.description - A long description of the race
 * @property {boolean} attributes.playable - If the race is playable
 * @property {number} attributes.hp - The HP of the race
 * @property {number} attributes.atk - The ATK of the race
 * @property {string} attributes.size - The size of the race
 * @property {?string} attributes.occupations - Occupations of the race
 * @property {?string} attributes.appearance - Appearance of the race
 * @property {?string} attributes.ideals - Ideals of the race
 * @property {?string} attributes.flaws - Flaws of the race
 * @property {?string} attributes.desires - Desires of the race
 * @property {?string} attributes.problems - Problems of the race
 * @property {string} attributes.name - The name of the race
 * @property {string} attributes.slug - The slug of the race
 * @property {string} attributes.tags - The slug of the race
 * @property {string} attributes.createdAt - The timestamp of race creation
 * @property {string} attributes.updatedAt - The timestamp of the last race update
 * @property {string} attributes.publishedAt - The timestamp of the race publication
 * @property {Object} attributes.mainImage
 * @property {Strapi.Media} attributes.mainImage.data - Main image of the entity
 * @property {Object} attributes.mainVideo
 * @property {Strapi.Media} attributes.mainVideo.data - Main video of the entity
 * @property {{data: DC.Location[]}} attributes.locations
 * @property {{data: DC.Race[]}} attributes.enemies
 * @property {{data: DC.Race[]}} attributes.allies
 * @property {{data: DC.Ability[]}} attributes.abilities
 */
/**
 * @typedef DC.SkillTree
 * @property {number} id
 * @property {string | undefined} pageImage
 * @property {number} maxRows
 * @property {number} maxColumns
 * @property {Object} attributes
 * @property {string} attributes.name
 * @property {string} attributes.slug
 * @property {string} attributes.shortDescription
 * @property {?string} attributes.customCss
 * @property {string} attributes.description
 * @property {string} attributes.createdAt
 * @property {string} attributes.updatedAt
 * @property {?string} attributes.publishedAt
 * @property {{data:?DC.Specialty}} attributes.specialty
 * @property {{data: Strapi.Media}} attributes.mainImage
 * @property {{data: Strapi.Media}} attributes.mainVideo
 * @property {{data: DC.Ability[]}} attributes.abilities
 */

/**
 * @typedef {Object} DC.Specialty
 * @property {number} id
 * @property {Object} attributes
 * @property {string} attributes.name
 * @property {string} attributes.slug
 * @property {string} attributes.shortDescription
 * @property {string} attributes.description
 * @property {string} attributes.createdAt
 * @property {string} attributes.updatedAt
 * @property {string} attributes.publishedAt
 * @property {Object} attributes.skillTrees
 * @property {DC.SkillTree[]} attributes.skillTrees.data - List of skill trees for the specialty
 * @property {Object} attributes.mainImage
 * @property {Strapi.Media} attributes.mainImage.data - Main image of the entity
 * @property {Object} attributes.mainVideo
 * @property {Strapi.Media} attributes.mainVideo.data - Main video of the entity
 * @property {Object} attributes.mainModel
 * @property {Strapi.Media} attributes.mainModel.data - Main model of the entity
 * @property {Object} attributes.mainAudio
 * @property {Strapi.Media} attributes.mainAudio.data - Main audio of the entity
 * @property {Object} attributes.characters
 * @property {DC.Character[]} attributes.characters.data
 */

/**
 * @typedef DC.Spore
 * @property {number} id
 * @property {Object} attributes
 * @property {string} attributes.name
 * @property {string} attributes.slug
 * @property {string} attributes.description
 * @property {string} attributes.introduction
 * @property {string} attributes.thumbnailUrl
 * @property {string} attributes.imageUrl
 * @property {string} attributes.subtitle
 * @property {?string} attributes.customCss
 * @property {string} attributes.createdAt
 * @property {string} attributes.updatedAt
 * @property {string} attributes.publishedAt
 * @property {string} attributes.locale
 * @property {Array<{id: number, value: string}>} attributes.villains
 * @property {Array<{id: number, value: string}>} attributes.plots
 * @property {Array<{id: number, value: string}>} attributes.goals
 * @property {Array<{id: number, value: string}>} attributes.twists
 * @property {Array<*>} attributes.localizations
 */

/**
 * @typedef {Object} DC.World
 * @property {number} id - Unique ID of the world
 * @property {Object} attributes - Detailed properties of the world
 * @property {string} attributes.name - The name of the world
 * @property {string} attributes.description - A description of the world
 * @property {string} attributes.slug - The slug of the world
 * @property {string} attributes.createdAt - The timestamp of world creation
 * @property {string} attributes.updatedAt - The timestamp of the last world update
 * @property {string} attributes.publishedAt - The timestamp of the world publication
 * @property {Object} attributes.mainImage
 * @property {Strapi.Media} attributes.mainImage.data - Main image of the entity
 * @property {Object} attributes.mainVideo
 * @property {Strapi.Media} attributes.mainVideo.data - Main video of the entity
 * @property {Object} attributes.mainModel
 * @property {Strapi.Media} attributes.mainModel.data - Main model of the entity
 * @property {Object} attributes.mainAudio
 * @property {Strapi.Media} attributes.mainAudio.data - Main audio of the entity
 */
