export interface BookDto {
    title: string;
}

export const isValid = (bookToValidate: any) => {
    const keys = Object.keys(bookToValidate);
    if (keys.length!=1)
        return false
    return keys.includes('title')
}