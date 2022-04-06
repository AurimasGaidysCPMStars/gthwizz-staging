import { useRecoilState } from "recoil";
import { wordCountState } from "../../atoms/language";

export const WordCounter = () => {
    return <div className="max-w-sm space-y-8">
        <h3 className="text-l font-bold">
            No problem, just give us a rough estimation of what you believe your total word count to be.
        </h3>
        <WordCounterer />
    </div>
}

export const WordCounterer = () => {

    const [wordCount, setWordCount] = useRecoilState(wordCountState);

    return <div className="flex flex-col">
        {/* <button onClick={() => setWordCount(wordCount > 100 ? wordCount - 100 : 0)} className="w-16 h-16 border">
            -
        </button> */}
        <p className="text-lg p-4">Word count</p>
        <input value={wordCount} onChange={(e) => {
            setWordCount(parseInt(e.target.value))
        }} className="w-full border text-center text-lg" />
        {/* <button onClick={() => setWordCount(wordCount + 100)} className="w-16 h-16 border ">
            +
        </button> */}
    </div>
}