export type where = {
    key: string, 
    paramName: string, 
    type: string, 
    operator: string, 
    condition: boolean
}

export type set = {
    key: string,
    paramName: string,
}

export type insert = {
    value: unknown
}