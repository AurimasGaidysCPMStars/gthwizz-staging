import { CheckIcon, SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { fromLanguageModalState, languagesState, fromLanguageState, industryState, industryModalState } from "../../atoms/language";
import { LanguageData } from "../../models/languages";

export const ProjectTypePicker = () => {

    const industry = useRecoilValue(industryState);
    const [showModal, setShowModal] = useRecoilState(industryModalState);

    return <div className='flex flex-col'>
        <p className="text-l font-bold">Industry</p>
        <button
            onClick={() => setShowModal(true)}
            className="w-full flex justify-between align-middle mt-5 border rounded-md p-2 pl-4 hover:border-sky-500/100" >
            <p className="text-l"> {industry == "" ? "Select industry" : industry}</p>
            <svg className="w-6 h-6" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
            </svg>
        </button>
        {showModal ? (
            <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-5xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-l font-semibold">
                                    Industry
                                </h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className=" text-black hover:text-sky-500/100 h-6 w-6 text-2xl leading-4">
                                        ×
                                    </span>
                                </button>
                            </div>
                            <div className="flex flex-col items-start justify-self-start p-5 space-y-4">
                                <div className="flex flex-col text-left">{
                                    [
                                        "Not selected",
                                        "Ad-words / Banners",
                                        "Automate / Aerospace",
                                        "Certificates Translation",
                                        "Finance",
                                        "Forex / Crypto",
                                        "Gaming / Video games",
                                        "General",
                                        "Legal",
                                        "Marketing / Consumer / Media",
                                        "Medical",
                                        "Mobile application",
                                        "Resume",
                                        "Scientific / Academic",
                                        "Software / IT",
                                        "Technical / Engineering",
                                        "Tourism",
                                        "Training / Employee handbooks",
                                        "Other"
                                    ].map(x => <div key={x}><RenderButton name={x} /></div>)
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        ) : null}
    </div>
}

interface ButtonProps {
    name: string;
}

const RenderButton = ({ name }: ButtonProps) => {
    const [industry, setIndustry] = useRecoilState(industryState);
    const [showModal, setShowModal] = useRecoilState(industryModalState);

    return <button onClick={() => { setIndustry(name); setShowModal(false) }} className="px-2  rounded-full text-grey-500/100 hover:font-bold cursor-pointer text-left">
        {name}
    </button>
}

