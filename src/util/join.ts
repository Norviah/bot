/**
 * Converts the given array into a string, having the items separated via a
 * comma and having the last element, if there's more than one, separated with
 * the given word.
 *
 * @examples
 * join(['you', 'me']) => 'you and me'
 * join(['you', 'me'], 'or') => 'you or me'
 *
 * @param  array The array to convert to a string.
 * @param  word  The word to append before the last element in the string.
 * @return       A string representing the elements of the array.
 */
export function join(array: any[], word: string = 'and'): string {
  return array.join(', ').replace(/, ?([^,]*)$/, ` ${word} $1`);
}
