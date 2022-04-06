import { useCallback, useEffect, useState } from "react";
import { PickerInline } from 'filestack-react';
import { WordCounterer } from "./WordCounter";
import wordsCount from 'words-count';
import { useRecoilState } from "recoil";
import { contentFileState, contentTextState, wordCountState } from "../../atoms/language";
import { TrashIcon } from "@heroicons/react/solid";
import { fileData } from "../../models/file-item";
import { ImagePicker } from "../file-picker/file-picker";

export const WordCounterFromFile = () => {

    const [wordCount, setWordCount] = useRecoilState(wordCountState);
    const [showPicker, setShowPicker] = useState(true);
    const YOUR_API_KEY = "AgUBOMHlHTpSOaj67wZhKz";
    const [file, setfile] = useRecoilState(contentFileState);
    const [brief, setBrief] = useRecoilState(contentTextState);

    useEffect(() => {
        if (brief != "") {
            verify(brief, (number: number) => { setWordCount(number) });
        }
    }, [brief])

    const verify = useCallback(
        debounce((name: string, fun: Function) => {
            fun(wordsCount(name));
        }, 500),
        []
    );

    return <div className="flex flex-col w-full">
        <div className="flex border justify-between items-center">
            <button onClick={() => setShowPicker(true)} className="px-4 py-2">Upload your file</button>
            <p className="text-l font-semibold">OR</p>
            <button onClick={() => setShowPicker(false)} className="px-4 py-2">Paste your text here</button>
        </div>

        <ImagePicker show={showPicker} onChange={(res) => { setShowPicker(false); setfile([...file, ...res]) }} value={""} />
        {/* {
            showPicker && <PickerInline
            
                apikey={YOUR_API_KEY} 
                on
                onSuccess={(res: any) => { setfile([...file, ...res?.filesUploaded.map((x: any) => { console.log(x); const data: fileData = { fileName: x.filename, fileUrl: x.url }; return data; }) || []]) }}
                onUploadDone={(res: any) => { setfile([...file, ...res?.filesUploaded.map((x: any) => { console.log(x); const data: fileData = { fileName: x.filename, fileUrl: x.url }; return data; }) || []]) }}

            />
        } */}
        {showPicker && file.map((x, i) => <div key={i + x.fileName}><FileCell name={x.fileName} /></div>)}
        {
            !showPicker && <div className="p-2 space-y-2">
                <textarea
                    rows={9}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="Type in or paste your text"
                    className="w-full h-xl p-2 border hover:border-sky-500/100" />
                <WordCounterer />
            </div>
        }

    </div>
}

export const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

interface FileCellProps {
    name: string
}

const FileCell = ({ name }: FileCellProps) => {

    const [file, setfile] = useRecoilState(contentFileState);

    return <div className="flex pl-4 pr-2 justify-between border-b border-solid border-blueGray-200 content-center w-full" style={{ alignItems: "center" }}>
        <p className="text-center">{name}</p>
        <button onClick={() => { setfile(file.filter(x => x.fileName != name)); }} className="px-2 rounded-full text-sky-500/100 hover:font-bold cursor-pointer">
            <TrashIcon className={`m-2 mr-2 h-8 w-8 p-1 text-gray-400 z-50`} />
        </button>
    </div>
}