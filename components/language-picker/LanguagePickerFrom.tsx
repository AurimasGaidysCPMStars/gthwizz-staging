import { CheckIcon, SearchIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { fromLanguageModalState, languagesState, fromLanguageState } from "../../atoms/language";
import { LanguageData } from "../../models/languages";

export const LanguagePickerFrom = () => {

    const languages = useRecoilValue(languagesState);
    const language = useRecoilValue(fromLanguageState);
    const [filter, setFilter] = useState("");
    const [showModal, setShowModal] = useRecoilState(fromLanguageModalState);

    return <div className='flex flex-col'>
        <p className="text-l font-bold">Translate from</p>
        <button
            onClick={() => setShowModal(true)}
            className="w-full flex justify-between align-middle mt-5 border rounded-md p-2 pl-4 hover:border-sky-500/100" >
            <p className="text-l"> {language || "Select language"}</p>
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
                                    What languages are we dealing with?
                                </h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className=" text-black hover:text-sky-500/100 h-6 w-6 text-2xl leading-4">
                                        ×
                                    </span>
                                </button>
                            </div>
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t w-full">
                                <div className="flex w-full">
                                    <SearchIcon className={`m-2 -mr-10  h-8 w-8 p-1 text-gray-400 z-50`} />
                                    <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder=" Translate from" className="w-full p-2 pl-10 border" />
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-self-start p-5 space-y-4">
                                <h3 className="text-l font-semibold">
                                    Top 12 languages
                                </h3>
                                <div className="flex flex-wrap">{
                                    languages?.filter(x => x.top).map(x => <div key={x.id}><RenderTopButton langData={x} /></div>)
                                }
                                </div>
                                <h3 className="text-l font-semibold">
                                    All languages
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 text-left">{
                                    languages?.filter(x => x.name.toLowerCase().includes(filter.toLowerCase())).map(x => <div key={x.id}><RenderButton langData={x} /></div>)
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
    langData: LanguageData;
}

const RenderButton = ({ langData }: ButtonProps) => {
    const [language, setLanguage] = useRecoilState(fromLanguageState);
    const [showModal, setShowModal] = useRecoilState(fromLanguageModalState);

    return <button onClick={() => { setLanguage(langData.name); setShowModal(false) }} className="px-2  rounded-full text-grey-500/100 hover:font-bold cursor-pointer text-left">
        {langData.name}
    </button>
}


const RenderTopButton = ({ langData }: ButtonProps) => {
    const [language, setLanguage] = useRecoilState(fromLanguageState);
    const [showModal, setShowModal] = useRecoilState(fromLanguageModalState);

    return <button onClick={() => { setLanguage(langData.name); setShowModal(false) }} className="px-2 rounded-full text-sky-500/100 hover:font-bold cursor-pointer">
        {langData.name}
    </button>
}