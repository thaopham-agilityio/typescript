/**
 * Convert data format "yyyy-mm-ddTHH:MM:ss.milZ" to "yyyy-mm-dd"
 * @param {string} date
 * @return {string} new date with new format
 */
export const formatDate = (date: Date): string => new Date(date).toISOString().substring(0, 10);
