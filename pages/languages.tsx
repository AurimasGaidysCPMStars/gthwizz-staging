import Head from 'next/head'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ArrowRightIcon } from '@heroicons/react/solid'
import { LanguagePickerFrom } from '../components/language-picker/LanguagePickerFrom'
import { LanguagePickerTo } from '../components/language-picker/LanguagePickerTo'
import { Layout } from '../components/layout'
import { useRecoilState, useRecoilValue } from 'recoil'
import { fromLanguageState, languagesState, toLanguageState } from '../atoms/language'
import { LanguageLoader } from '../components/language-picker/LanguageDataLoader'


export default function Home() {
    const [error, setError] = useState("");

    return (
        <div className={""}>
            <Head>
                <title>Translation dashboard</title>
                <meta name="description" content="Other you translation here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <div className='flex flex-col h-screen w-full p-5 justify-items-start space-y-6 md:max-w-lg'>
                    <h2 className='text-3xl font-bold pb-5 hidden md:flex '>Tell us about your project</h2>
                    <LanguagePickerFrom />
                    <LanguagePickerTo />
                    <p className='text-red-600'>{error}</p>
                    <div className='flex justify-between p-5 align-middle'>
                        <p>Step 1 of 5</p>
                        <LanguageLoader />
                        <NextButton setError={setError} />
                    </div>
                </div>
            </Layout>
        </div >
    )
}

interface Props {
    setError: Dispatch<SetStateAction<string>>
}

const NextButton = ({ setError }: Props) => {
    const language = useRecoilValue(toLanguageState);
    const languageFrom = useRecoilValue(fromLanguageState);

    const disabled = (languageFrom || "") == "" || language.length == 0;
    const router = useRouter()

    useEffect(() => {
        setError("")
    }, [language, languageFrom])
    

    const handleClick = (e: any) => {
        e.preventDefault();
        if (disabled) {
            setError("You need select languages")
        } else {
            router.push("project-brief");
        }

    }

    return <button onClick={handleClick} className='bg-sky-500/100 p-2 pl-4 pr-2 rounded-full flex space-x-2'>
        <p className="text-white">Next</p>
        <ArrowRightIcon className="w-6 h-6 text-white p-1" />
    </button>
}