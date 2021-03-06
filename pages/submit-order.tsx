import { ArrowRightIcon } from '@heroicons/react/solid';
import { doc, setDoc } from 'firebase/firestore';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { briefFileState, briefState, companyState, emailState, fromLanguageState, nameState, phoneState, projectTypeState, toLanguageState, wordCountState, industryState, submitState, contentFileState, contentTextState, phoneErrorState, emailErrorState, recurringState, dicIdState } from '../atoms/language';
import { LanguageData } from '../models/languages';
import { ProjectStatus, RequestData } from '../models/request';
import { firestore } from '../services/clientApp';
import styles from '../styles/Home.module.css'
import { Layout } from '../components/layout'
import { useState } from 'react';
import moment from 'moment';
import Script from 'next/script'

export default function Home() {
    const wc = useRecoilValue(wordCountState);
    const pt = useRecoilValue(projectTypeState);


    const [emailError, setEmailError] = useRecoilState(emailErrorState);
    const [phoneError, setPhoneError] = useRecoilState(phoneErrorState);
    const [name, setName] = useRecoilState(nameState);
    const [company, setCompany] = useRecoilState(companyState);
    const [email, setEmail] = useRecoilState(emailState);
    const [phone, setPhone] = useRecoilState(phoneState);
    const [submitted, setSubmitted] = useRecoilState(submitState);
    const [recurring, setRecurring] = useRecoilState(recurringState);
    
    const fl = useRecoilValue(fromLanguageState);
    const tl = useRecoilValue(toLanguageState);
    const brief = useRecoilValue(briefState);
    const briefFiles = useRecoilValue(briefFileState);
    const industry = useRecoilValue(industryState);
    const contentText = useRecoilValue(contentTextState);
    const contentFiles = useRecoilValue(contentFileState);

    // const fromLanguage = useRecoilValue(fromLanguageState);
    // const toLanguage = useRecoilValue(toLanguageState);

    return (
        <div className={styles.container}>
            <Head>
                <title>Translation dashboard</title>
                <meta name="description" content="Other you translation here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=UA-171557064-1"
                    strategy="afterInteractive"
                />

                <div className='h-full w-full p-5 space-y-4  md:max-w-lg'>
                    {/* <p>Summary</p>
                    <div className='flex space-x-4'>

                        <div>
                            <p>From languange</p>
                            <p>{fromLanguage}</p>
                        </div>
                        <div>
                            <p>To languange</p>
                            <p>{toLanguage.join(", ")}</p>
                        </div>
                    </div> */}
                    <h2 className='text-3xl font-bold pb-5 hidden md:flex '>{submitted ? "Request submitted." : "Submit request"}</h2>

                    {submitted && <div>
                        <Script id="google-analytics" strategy="afterInteractive">
                            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-171557064-1');
          var callback = function () {
            console.log('chat initiated');
          };

          gtag('event', 'conversion', {
            'send_to': 'AW-805141531/ecJ7CIKQiecCEJv49f8C',
            'event_callback': callback
        });
        `}
                        </Script>
                        <h3 className="text-l font-bold p-2">
                            Your request have been submitted successfully. Hang in tight we will contact you soon.
                        </h3>
                    </div>}
                    {!submitted && <div>
                        <div className='h-4' />
                        <div className='flex space-x-4'>
                            <div className='w-full'>
                                <h3 className="text-l font-bold p-2">
                                    From language
                                </h3>
                                <h3 className="text-l font-bold p-2">
                                    {fl}
                                </h3>
                            </div>
                            <div className='w-full'>
                                <h3 className="text-l font-bold p-2">
                                    To language
                                </h3>
                                <h3 className="text-l font-bold p-2">
                                    {tl}
                                </h3>
                            </div>
                        </div>
                        
                        <h3 className="text-l font-bold p-2">
                            {industry}
                        </h3>
                       
                        <h3 className="text-l font-bold p-2">
                            {brief}
                        </h3>
                       
                        <h3 className="text-l font-bold p-2">
                            {briefFiles.map(x => x.fileName).join(", ")}
                        </h3>
                        
                        <div className='h-4' />
                        <div className="flex" onClick={() => { setRecurring(!recurring) }}>
                            <input checked={recurring} className=" h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-sky-500/100  checked:border-sky-500/100  focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label inline-block text-gray-800 pb-4">
                                Our company requires ongoing translation services (Get volume discount)
                            </label>
                        </div>

                        <NextButton />
                    </div>}


                </div>
            </Layout>
        </div >
    )
}


const NextButton = () => {
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

    const disabled = (email || "") == "" || (phone || "") == "";


    const [emailError, setEmailError] = useRecoilState(emailErrorState);
    const [phoneError, setPhoneError] = useRecoilState(phoneErrorState);

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
            setSubmitted(true);
        });
    }

    return <button disabled={disabled} onClick={handleClick} className='bg-sky-500/100 p-2 pl-4 pr-2 rounded-full flex space-x-2'>
        <p className="text-white">Submit request</p>
        <ArrowRightIcon className="w-6 h-6 text-white p-1" />
    </button>
}