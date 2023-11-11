export interface BookDto {
    title: string;
    author?: string;
    pages?: number;
}

export interface BookWithIdDto extends BookDto {
    id: string;
}

export const isValid = (bookToValidate: any) => {
    const keys = Object.keys(bookToValidate);
    if (keys.length < 1 || keys.length > 3)
        return false
    switch (keys.length) {
        case 1:
            return keys.includes('title')
        case 2:
            return keys.includes('title') && (keys.includes('author') || keys.includes('pages'))
        case 3:
            return keys.includes('title') && keys.includes('author') && keys.includes('pages')
    }
}