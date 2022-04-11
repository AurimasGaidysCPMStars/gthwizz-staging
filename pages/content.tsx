import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import { Layout } from '../components/layout'
import { WordCounter } from '../components/word-counter/WordCounter';
import { WordCounterFromFile } from '../components/word-counter/WordCounterFromFile';
import { doc, setDoc } from 'firebase/firestore';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentState, briefFileState, briefState, companyState, emailState, fromLanguageState, nameState, phoneState, projectTypeState, toLanguageState, wordCountState, industryState, submitState, contentFileState, contentTextState, phoneErrorState, emailErrorState, recurringState, dicIdState } from '../atoms/language';
import { LanguageData } from '../models/languages';
import { ProjectStatus, RequestData } from '../models/request';
import moment from 'moment';
import Script from 'next/script'
import { firestore } from '../services/clientApp';
export default function Home() {

    const [haveText, setHaveText] = useRecoilState(contentState);
    const [wordCount, setWordCount] = useRecoilState(wordCountState);
    const [file, setfile] = useRecoilState(contentFileState);
    const [error, setError] = useState("");

    const email = useRecoilValue(emailState);
    const phone = useRecoilValue(phoneState);
    const name = useRecoilValue(nameState);
    const company = useRecoilValue(companyState);
    const fl = useRecoilValue(fromLanguageState);
    const tl = useRecoilValue(toLanguageState);
    const brief = useRecoilValue(briefState);
    const briefFiles = useRecoilValue(briefFileState);
    const industry = useRecoilValue(industryState);
    const [submitted, setSubmitted] = useRecoilState(submitState);
    const contentText = useRecoilValue(contentTextState);
    const contentFiles = useRecoilValue(contentFileState);
    const pt = useRecoilValue(projectTypeState);
    const wc = useRecoilValue(wordCountState);
    const recurring = useRecoilValue(wordCountState);
    const [docsId, setDocId] = useRecoilState(dicIdState);


    const [emailError, setEmailError] = useRecoilState(emailErrorState);
    const [phoneError, setPhoneError] = useRecoilState(phoneErrorState);
    const router = useRouter();
    const disabled = wordCount < 1 && file.length < 1;

    const handleClick = (e: any) => {
        e.preventDefault();
        if (disabled) {
            setError("You need to provide translation text")
        } else {
            router.push("submit-order");
        }


        const validateEmail = (email: string) => {
            const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,19}[\.][a-z]{2,15}/g;
            const result = pattern.test(email);
            setEmailError(!result);
            return result;
        }

        const validatePhone = (email: string) => {
            const pattern = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
            const result = pattern.test(email);
            setPhoneError(!result);
            return result;
        }

        const handleClick = (e: any) => {
            const docId = docsId == "" ? email + "-" + +moment() : docsId;
            e.preventDefault()



            const valid = validateEmail(email) && validatePhone(phone)

            if (!valid) {
                return;
            } else {
                console.log("valid")
            }

            const docRef = doc(firestore, 'requests', docId)
            const OrderDoc: RequestData = {
                id: docId,

                name: name,
                companyName: company,
                phone: phone,
                email: email,

                fromLanguage: fl || "error",
                ToLanguages: tl,

                projectType: industry,
                brief: brief,
                fileUrls: briefFiles,

                contentTexts: contentText,
                contentFileUrls: contentFiles,
                contentType: pt,
                wordCont: wc,
                status: ProjectStatus.new,
                dateCreated: +moment(),
                dateUpdated: +moment(),
                adminNotes: "",
                recurring: false
            };

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(OrderDoc)
            };

            setDoc(docRef, OrderDoc).then(() => {
                router.push("submit-order");
            });
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
                        <p>Step 4 of 5</p>
                        <button onClick={handleClick} className='bg-sky-500/100 p-2 pl-4 pr-2 rounded-full flex space-x-2'>
                            <p className="text-white">Get Quote</p>
                            <ArrowRightIcon className="w-6 h-6 text-white p-1" />
                        </button>
                    </div>
                </div>
            </Layout>
        </div >
    )
}
