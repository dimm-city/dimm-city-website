<!-- Create a svelte component that allows a user to select a skill tree from a list. Once the skill tree
is selected, the user should be able to edit the skill tree using the SkillTree.svelte component.render
The list of skill trees should be loaded from the server when the component is mounted.  Add be filtered
by the character's specialties.

Below is an example of the JSON response from the server when the character has the Etherlock specialty.:
{
    "data": [
        {
            "id": 7,
            "attributes": {
                "name": "The Fifth Profession",
                "slug": "the-fifth-profession",
                "shortDescription": "*Being a bodyguard is more than just keeping your client alive. You gotta know when to be low key and when to bomb the shot.*\n",
                "description": "The Fifth Profession learning path: \nSpit Flame, Bodycover, Blitz, Strategic \nWithdrawal, and Executive Protection.",
                "createdAt": "2023-09-25T12:29:09.554Z",
                "updatedAt": "2023-11-16T03:35:41.272Z",
                "publishedAt": "2023-11-09T06:28:17.524Z",
                "specialty": {
                    "data": {
                        "id": 3,
                        "attributes": {
                            "name": "Etherlock",
                            "slug": "etherlock",
                            "tags": null,
                            "shortDescription": "Etherlocks are great for those players that wish to wield magic in moments of weal and woe for your own survival or the success of the mission.",
                            "description": "Dimm City is rife with raw energy that creeps in through weak points in the fabric of reality. Etherlocks can see and have been trained to weave this pervasive power into effects both offensive and defensive. From lobbing crackling spheres of flame to repelling hostile incantations, this master of the arcane is an all-around ranged powerhouse.\n\nEtherlocks are great for those players that wish to wield magic in moments of weal and woe for your own survival or the success of the mission. These magus holds immense possibilities in the palms of their hands. If you want to play a wizards apprentice, a haggard wage mage, or a researcher looking to blend the art into cybertech, this class is what you’re looking for.",
                            "createdAt": "2022-04-03T04:07:00.661Z",
                            "updatedAt": "2023-09-25T10:13:47.154Z",
                            "publishedAt": "2022-04-03T04:07:16.306Z"
                        }
                    }
                },
                "mainImage": {
                    "data": null
                },
                "mainVideo": {
                    "data": null
                },
                "abilities": {
                    "data": [
                        {
                            "id": 199,
                            "attributes": {
                                "name": "All Eyes on You",
                                "slug": "ability-176",
                                "ap": 0,
                                "maxAP": 0,
                                "rollDice": true,
                                "cybernetic": false,
                                "external": true,
                                "description": "ROLL A DIE! 3 AP. You use a mirror, puddle of water, or polished blade to see (but not hear) a creature you know fairly well anywhere in the Monoverse. Once you find them, you can watch them for a quickwhile and can discern from their surroundings where they generally are in existance, who surrounds them, and what their immediate area looks like. If you roll a 20, you can hear the target too! If you roll a 1, they can see you but you can't see them!!!!\n\nTechnoenhancement:\nROLL A DIE! 2 AP. Through botnet-hacking unsecure and secure surveillance systems,  you scour all available data using facial recognition to pinpoint your target. Their every movement over the last fullwhile or so may become known to you, all depending on how well your program works and if they're on to you or not... \n\n20: You know what they were up to for a long fullwhile, along with a plethora of metadata to go along with it. \n\n11-19: You know their whereabouts for the last day and know pretty well their activities. You might of missed something, but your creation gathered a good amount of info. \n\n6-10: You have a good idea what they were up to, but they were in two places at once?.. You really should get to debugging this thing.  \n\n1-5: Your botnet army has drawn a bit of heat up on you. Close this oppo before things go sideways. No info for you! ",
                                "shortDescription": "*Hack into surveillance systems or reality itself to track your target's recent activities, uncovering a wealth of data with varying degrees of accuracy.*",
                                "createdAt": "2023-10-16T07:21:53.575Z",
                                "updatedAt": "2023-11-16T03:38:49.882Z",
                                "publishedAt": "2023-11-16T03:38:49.824Z",
                                "level": 5,
                                "module": 2
                            }
                        }
                    ]
                }
            }
        },
        ]
    }


    Reference src/lib/Builder/CharacterSelector.svelte for how to use the StrapiClient to load the data from the API.

-->