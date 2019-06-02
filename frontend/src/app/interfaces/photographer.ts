export interface Photographer {
    id: number;
    firstName: string;
    lastName: string;
    birthday: Date;
    notes?: string;
}

export interface NewPhotographer {
    firstName: string;
    lastName: string;
    birthday: Date;
    notes?: string;
}
