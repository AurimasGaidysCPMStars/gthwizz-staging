import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";
import { fileData } from "../models/file-item";
import { LanguageData } from "../models/languages";

// const { persistAtom } = recoilPersist()

export const fromLanguageState = atom<string | undefined>({
    key: 'fromLanguageState',
    default: undefined,
    // effects_UNSTABLE: [persistAtom],
});

export const fromLanguageModalState = atom<boolean>({
    key: 'fromLanguageModalState',
    default: false,
});

export const toLanguageState = atom<string[]>({
    key: 'toLanguageState',
    default: [],
    // effects_UNSTABLE: [persistAtom],
});

export const toLanguageModalState = atom<boolean>({
    key: 'toLanguageModalState',
    default: false,
});


export const languagesState = atom<LanguageData[]>({
    key: 'languagesSate',
    default: [],
});

export const industryModalState = atom<boolean>({
    key: 'industryModalState',
    default: false,
});

export const industryState = atom<string>({
    key: 'industryState',
    default: "",
    // effects_UNSTABLE: [persistAtom],

});

export const briefState = atom<string>({
    key: 'briefState',
    default: "",
    // effects_UNSTABLE: [persistAtom],

});

export const briefFileState = atom<fileData[]>({
    key: 'briefFileState',
    default: [],
    // effects_UNSTABLE: [persistAtom],

});

export const wordCountState = atom<number>({
    key: 'wordCountState',
    default: 0,
});

export const projectTypeState = atom<string>({
    key: 'projectTypeState',
    default: "",
});


export const nameState = atom<string>({
    key: 'nameState',
    default: "",
    // effects_UNSTABLE: [persistAtom],

});

export const companyState = atom<string>({
    key: 'companyState',
    default: "",
    // effects_UNSTABLE: [persistAtom],

});

export const emailState = atom<string>({
    key: 'emailState',
    default: "",
    // effects_UNSTABLE: [persistAtom],

});

export const phoneState = atom<string>({
    key: 'phoneState',
    default: "",
    // effects_UNSTABLE: [persistAtom],

});

export const contentFileState = atom<fileData[]>({
    key: 'contentFileState',
    default: [],
    // effects_UNSTABLE: [persistAtom],

});

export const contentTextState = atom<string>({
    key: 'contentTextState',
    default: "",
    // effects_UNSTABLE: [persistAtom],

});

export const contentState = atom<string>({
    key: 'contentState',
    default: "Yes",
    // effects_UNSTABLE: [persistAtom],

});

export const submitState = atom<boolean>({
    key: 'submitState',
    default: false,
});

export const emailErrorState = atom<boolean>({
    key: 'emailErrorState',
    default: false,
});

export const phoneErrorState = atom<boolean>({
    key: 'phoneErrorState',
    default: false,
});

export const recurringState = atom<boolean>({
    key: 'recurringState',
    default: false,
});

export const dicIdState = atom<string>({
    key: 'dicIdState',
    default: "",
    // effects_UNSTABLE: [persistAtom],

});