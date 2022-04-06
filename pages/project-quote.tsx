import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { wordCountState, projectTypeState } from '../atoms/language'
import styles from '../styles/Home.module.css'
import { Layout } from '../components/layout'
import { useState } from 'react'

interface Option {
    title: string;
    subtitle: string[];
    price: number;
    days: number;
}

const data: Option[] = [
    {
        title: "Junior",
        subtitle: ["Standard translation"],
        days: 1,
        price: 0.10
    },
    {
        title: "Expert",
        subtitle: ["Expert translation"],
        days: 1,
        price: 0.12
    },
    {
        title: "Industry pro",
        subtitle: ["Expert translation", "Professional editing"],
        days: 1,
        price: 0.14
    }
]

export default function Home() {
    const router = useRouter();
    const [pt, stPT] = useRecoilState(projectTypeState);
    const [error, setError] = useState("");
    const [wc, setWC] = useRecoilState(wordCountState);

    const handleClick = (e: any) => {
        e.preventDefault();
        if (pt == "") {
            setError("You need select project type")
        } else {
            router.push("submit-order");
        }
    }

    const handleBackClick = (e: any) => {
        e.preventDefault()
        router.push("content");
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Translation dashboard</title>
                <meta name="description" content="Other you translation here" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <div className='h-full p-5'>
                    <h2 className='text-3xl font-bold pb-5 hidden md:flex '>We’ve got a few great options for you:</h2>
                    {(0.1 * wc) < 20 && <h3 className="text-l font-bold p-2 px-5 rounded-full bg-sky-500/100 text-white mb-4 justify-center ">
                        The minimum order is €20.
                    </h3>}

                    <div className='h-8' />
                    <div className='flex flex-col md:flex-row md:space-x-4'>
                        {data.map(x => <div key={x.title}><OfferCell data={x} /></div>)}
                    </div>
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
                            <p className="text-white">Next</p>
                            <ArrowRightIcon className="w-6 h-6 text-white p-1" />
                        </button>
                    </div>
                </div>
            </Layout>
        </div >
    )
}

interface OCProps {
    data: Option
}

const OfferCell = ({ data }: OCProps) => {

    const [wc, setWC] = useRecoilState(wordCountState);
    const [pt, stPT] = useRecoilState(projectTypeState);

    return <div key={data.title} onClick={() => { stPT(data.title) }} className='flex flex-col my-2 p-5 border space w-full hover:border-sky-500/100 rounded-xl'>
        <h2 className='text-2xl text-center p-5 font-bold'>{data.title}</h2>
        <div className='text-l text-center h-4'>{data.subtitle.map(x => <p key={x}>{x}</p>)}</div>
        <div className='h-16' />
        <p className='text-s text-center text-gray-400'>Translation price</p>
        <p className='text-xl text-center p-2'>from €{data.price.toFixed(2)}/word</p>
        <p className='text-s text-center text-gray-400'>€{(data.price * wc).toFixed(2)} total</p>
        {pt == data.title ?
            <button onClick={() => console.log("Yes")}>
                <div className=" p-1 px-4 border flex rounded-full justify-center m-4 bg-sky-500/100 text-white" >
                    <p className='p-1'>Selected</p>
                </div>
            </button>
            :
            <button onClick={() => console.log("Yes")}>
                <div className=" p-1 px-4 border flex rounded-full justify-center m-4" >
                    <p className='p-1'>Select</p>
                </div>
            </button>
        }
        <p className='text-l text-center  p-4'>1-2 business days</p>
    </div>
}



// 1500 - bd
