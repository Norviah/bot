/**
 * Ensures that the given string ends in a punctuation mark.
 * @param  string The string to check.
 * @param  mark   The mark to ensure the string ends in.
 * @return        The string ending in a punctuation mark.
 */
export function punctuate(string: string, mark: string = '.'): string {
  return /[.?!]$/.test(string) ? string : `${string}${mark}`;
}
