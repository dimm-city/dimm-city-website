import { formatDistanceToNow } from 'date-fns';
/**
 * @param {string | number | Date} input
 */
export function formatDate(input) {
	return formatDistanceToNow(new Date(input), { addSuffix: true });
}

/**
 * @param {DC.Character} character
 */
export function formatCharacterSpecialties(character) {
	return character.attributes.specialties?.data?.length > 0
		? character.attributes.specialties?.data?.map((s) => s.attributes?.name).join(', ') ?? 'Unknown'
		: 'Unknown';
}

/**
 * @param {DC.ListItem<any> | DC.BaseEntity} item
 */
export function formatListItemName(item) {
	if (!item) return;

	let output = item.text;
	if (item.item?.data?.attributes?.name) output = item.item.data.attributes.name;
	else if (item.attributes?.name) output = item.attributes.name;
	return output;

	return output;
}
