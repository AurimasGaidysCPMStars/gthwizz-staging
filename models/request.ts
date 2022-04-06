import { fileData } from "./file-item";

export enum ProjectStatus {
    none = 0,
    new = 1,
}

export interface RequestData {
    id: string;
    name: string;
    companyName?: string;
    email: string;
    phone: string;
    fromLanguage: string;
    ToLanguages: string[];
    projectType: string;
    brief: string;
    fileUrls: fileData[];
    contentFileUrls: fileData[];
    contentTexts: string;
    contentType: string;
    wordCont: number;
    status: ProjectStatus;
    adminNotes: string;
    dateCreated: number;
    dateUpdated: number;
    recurring: boolean;
}