export interface BookDto {
    title: string;
    author?: string;
    pages?: number;
}

export const isValid = (bookToValidate: any) => {
    const keys = Object.keys(bookToValidate);
    if (keys.length < 1 || keys.length > 3)
        return false
    switch (keys.length) {
        case 1:
            return (keys.includes('title') && bookToValidate.title !== '')
        case 2:
            return keys.includes('title') && (keys.includes('author') || keys.includes('pages')) && bookToValidate.title !== ''
        case 3:
            return keys.includes('title') && keys.includes('author') && keys.includes('pages') && bookToValidate.title !== ''
    }
}