export type T_Document =  {
    id: number,
    name: string,
    description: string,
    prod_period: number,
    replace_period?: number,
    number_length: number,
    image: string,
    status: number,
    comment?: number
    new_document_number?: string
}

export type T_Request = {
    id: string | null
    status: E_RequestStatus
    date_complete: string
    date_created: string
    date_formation: string
    owner: string
    moderator: string
    documents: T_Document[]
    reason: string
    new_document_number: string
}

export enum E_RequestStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}

export type T_User = {
    id: number
    username: string
    is_authenticated: boolean
}

export type T_RequestsFilters = {
    date_formation_start: string
    date_formation_end: string
    status: E_RequestStatus
}

export type T_RequestCart = {
    draft_request_id: number,
    documents_count: number
}

export type T_LoginCredentials = {
    username: string
    password: string
}

export type T_RegisterCredentials = {
    name: string
    email: string
    password: string
}