import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { contentFileState, contentState, wordCountState } from '../atoms/language';
import styles from '../styles/Home.module.css'
import { Layout } from '../components/layout'
import { WordCounter } from '../components/word-counter/WordCounter';
import { WordCounterFromFile } from '../components/word-counter/WordCounterFromFile';

export default function Home() {

    const [haveText, setHaveText] = useRecoilState(contentState);
    const [wordCount, setWordCount] = useRecoilState(wordCountState);
    const [file, setfile] = useRecoilState(contentFileState);
    const [error, setError] = useState("");
    
    const router = useRouter();
    const disabled = wordCount < 1 && file.length < 1;

    const handleClick = (e: any) => {
        e.preventDefault()
        e.preventDefault();
        if (disabled) {
            setError("You need to provide translation text")
        } else {
            router.push("submit-order");
        }
    }

    const handleBackClick = (e: any) => {
        e.preventDefault()
        router.push("project-brief");
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Translation dashboard</title>
                <meta name="description" content="Other you translation here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <div className='flex flex-col h-screen w-full p-5 justify-items-start space-y-6 md:max-w-lg'>
                    <h2 className='text-3xl font-bold pb-5'>Your Content</h2>

                    {/* <h3 className="text-l font-semibold">
                        Do you have your text prepared?
                    </h3>
                    <div className='flex space-x-2'>
                        <button onClick={() => setHaveText("Yes")}>
                            <div className="w-40 p-1 px-4 border flex rounded-full hover:border-sky-500/100 justify-center" >
                                <p className='p-1'>Yes</p>
                            </div>
                        </button>
                        <button onClick={() => setHaveText("Not yet")}>
                            <div className="w-40 p-1 px-4 border flex rounded-full hover:border-sky-500/100 justify-center" >
                                <p className='p-1'>Not yet</p>
                            </div>
                        </button>
                    </div> */}

                    {
                        haveText == "Yes" && <WordCounterFromFile />
                    }

                    {
                        haveText == "Not yet" && <WordCounter />
                    }
                    
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
            </Layout>
        </div >
    )
}
