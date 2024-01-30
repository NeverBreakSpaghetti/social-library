export interface PointsCardDto {
    name: string
}

export const isValid = (body: any) => {
    const keys = Object.keys(body)
    return keys.length === 1 && keys.includes('name') && body.name !== ''
}

export const mapToPointsCardDto = (object: any): PointsCardDto => {
    return {name: object.name}
}