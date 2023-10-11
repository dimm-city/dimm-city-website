/**
 * 
 * @param {string} userId 
 * @returns 
 */
export const userOwnsTokenFilter = (userId) => {
	return {
		token: {
			wallet: {
				user: {
					id: userId
				}
			}
		}
	};
};
