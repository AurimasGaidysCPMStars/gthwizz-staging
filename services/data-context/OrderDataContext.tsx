import { useRecoilValue } from "recoil";
import { briefFileState, fromLanguageState, toLanguageState } from "../../atoms/language";

export const OrderDataContext = () => {

    // const languagef = useRecoilValue(fromLanguageState);
    // const languaget = useRecoilValue(toLanguageState);

    // const briefFile = useRecoilValue(briefFileState);
    // const clientCredentials = {
    //     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    //     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    //     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    //     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    //     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    //     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    // };

    return <div>
        {/* <p>{languaget.join(", ")}</p>
        <p>{briefFile.join(", ")}</p> */}
    </div>
}