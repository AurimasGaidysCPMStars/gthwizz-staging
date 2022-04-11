import ArrowRightIcon from '@heroicons/react/solid/ArrowRightIcon'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { Layout } from '../components/layout'
import { ProjectTypePicker } from '../components/project-type-picker/ProjectTypePicker'
import { PickerOverlay } from 'filestack-react';
import { ArrowLeftIcon, CloudUploadIcon, TrashIcon } from '@heroicons/react/solid'
import { useRecoilState, useRecoilValue } from 'recoil'
import { briefFileState, briefState, industryState } from '../atoms/language'
import { fileData } from '../models/file-item'
import { ImagePicker } from '../components/file-picker/file-picker'

export default function Home() {
    const router = useRouter();
    const YOUR_API_KEY = "AgUBOMHlHTpSOaj67wZhKz";

    const [brief, setBrief] = useRecoilState(briefState);
    const [briefFile, setBriefFile] = useRecoilState(briefFileState);


    const industry = useRecoilValue(industryState);
    const disabled = industry == "";
    const [showPicker, setShowPicker] = useState(false);
    const [error, setError] = useState("");


    const handleClick = (e: any) => {
        e.preventDefault();
        if (disabled) {
            setError("You need select Industry")
        } else {
            router.push("content");
        }
    }

    const handleBackClick = (e: any) => {
        e.preventDefault()
        router.push("languages");
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Translation dashboard</title>
                <meta name="description" content="Other you translation here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <div className='flex flex-col h-screen p-5 justify-items-start space-y-6 md:max-w-lg'>
                    <h2 className='text-3xl font-bold pb-5 hidden md:flex '>Got it! Let’s talk details. </h2>
                    <ProjectTypePicker />
                    <h3 className="text-l font-bold">
                        This is where you write down the specifics of your project.
                        Anything related to brand guidelines, specific
                        words/sentences, and formatting goes here.
                    </h3>
                    <textarea
                        value={brief}
                        rows={8}
                        onChange={(e) => setBrief(e.target.value)}
                        placeholder=" For example: I want to translate my company’s 5-page website to Spanish. It’s important that the brand vibe stays the same by using casual, everyday Spanish language. Match the format of the original doc."
                        className="w-full p-2 border hover:border-sky-500/100 min-h-128" />
                    <h3 className="text-l font-bold">
                        Any additional documents you want to upload?
                    </h3>
                    <ImagePicker show={showPicker} onChange={(res) => { setShowPicker(false); setBriefFile([...briefFile, ...res]) }} value={""} />
                    <button onClick={() => setShowPicker(!showPicker)}>
                        <div className="w-40 p-1 px-4 border flex rounded-full hover:border-sky-500/100" >
                            <CloudUploadIcon className="w-8 h-8 p-1" />
                            <p className='p-1'>Add Brief</p>
                        </div>
                    </button>
                    {briefFile.length > 0 && <div className='flex flex-col'>{briefFile.map((x, i) => <div key={i + ". " + x.fileName}><FileCell name={x.fileName} /></div>)}</div>}

                    <p className='text-red-600'>{error}</p>
                    <div className='flex justify-between p-5 items-center'>
                        <button onClick={handleBackClick}>
                            <div className="border p-2 pl-4 pr-4 rounded-full flex space-x-2l hover:border-sky-500/100" >
                                <ArrowLeftIcon className="w-6 h-6 p-1" />
                                <p>Back</p>
                            </div>
                        </button>
                        <p>Step 3 of 5</p>
                        <button onClick={handleClick} className='bg-sky-500/100 p-2 pl-4 pr-2 rounded-full flex space-x-2'>
                            <p className="text-white">Next</p>
                            <ArrowRightIcon className="w-6 h-6 text-white p-1" />
                        </button>
                    </div>
                </div>
            </Layout >
        </div >
    )
}
interface FileCellProps {
    name: string
}
const FileCell = ({ name }: FileCellProps) => {

    const [briefFile, setBriefFile] = useRecoilState(briefFileState);

    return <div key={name} className="flex pl-4 pr-2 justify-between border-b border-solid border-blueGray-200 content-center w-full" style={{ alignItems: "center" }}>
        <p className="text-center">{name}</p>
        <button onClick={() => { setBriefFile(briefFile.filter(x => x.fileName != name)); }} className="px-2 rounded-full text-sky-500/100 hover:font-bold cursor-pointer">
            <TrashIcon className={`m-2 mr-2 h-8 w-8 p-1 text-gray-400 z-50`} />
        </button>
    </div>
}