import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { languagesState } from "../../atoms/language";
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from "../../services/clientApp";
import { LanguageData } from "../../models/languages";

export const LanguageLoader = () => {

    const [languages, setLanguages] = useRecoilState(languagesState);

    const [value, loading, error] = useCollection(
        collection(firestore, 'languages'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    useEffect(() => {
        const compare = (a: LanguageData, b: LanguageData) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        }

        if (!loading) {
            const data = value?.docs.map(x => x.data()) as LanguageData[];
            if (data) {
                data.sort(compare);
                setLanguages(data);
            }
        }
    }, [value])

    return <>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
    </>
}