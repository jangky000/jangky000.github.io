export const removeSpace = (utf8:string) => utf8.replace(/\s+/g, '');
export const encodeURL = (utf8:string) => encodeURIComponent(utf8.replace(/\s+/g, ''));
