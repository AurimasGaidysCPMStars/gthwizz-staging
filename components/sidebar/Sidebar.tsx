import { CheckCircleIcon, CheckIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentFileState, contentState, emailState, fromLanguageState, industryState, phoneState, projectTypeState, toLanguageState, wordCountState } from '../../atoms/language';

export const Sidebar = () => {
    const router = useRouter()

    // lang valid
    const fromLanguage = useRecoilValue(fromLanguageState);
    const toLanguage = useRecoilValue(toLanguageState);
    const haveText = useRecoilValue(contentState);
    const projectType = useRecoilValue(projectTypeState);
    const email = useRecoilValue(emailState);
    const phone = useRecoilValue(phoneState);

    const [wordCount, setWordCount] = useRecoilState(wordCountState);
    const [file, setfile] = useRecoilState(contentFileState);

    const langValid = fromLanguage != "" && toLanguage.length > 0;

    // industry val
    const industry = useRecoilValue(industryState);
    const industryValid = industry != "";

    // VC val
    const wordCountValid = wordCount < 1 && file.length < 1;

    // type val
    const projectTypeValid = projectType != "";


    return <div className='flex md:flex-col md:border-r md:border-sky-500/100 md:h-screen justify-between p-5'>
        <div className='flex flex-col space-y-4'>
            <div className='flex flex-col space-y-4'>
                {/* <img className="w-32 mb-5" src="https://gthtranslation.com/wp-content/uploads/2021/11/GTH-600_208.webp" /> */}
                <h2 className="hidden md:flex text-2xl font-bold pb-5">Hey! Let’s get started</h2>
            </div>
            <div className='flex md:flex-col space-y-0 md:space-y-4 space-x-4 md:space-x-0'>
                <RenderButton title="Contact info" selected={router.asPath == "/contact-info"} completed={true} link="contact-info" />
                <RenderButton title="Language Selection" selected={router.asPath == "/languages"} completed={langValid} link="languages" />
                <RenderButton title="Project Details" selected={router.asPath == "/project-brief"} completed={industryValid} link="project-brief" />
                <RenderButton title="Content Specifics" selected={router.asPath == "/content"} completed={!wordCountValid} link="content" />
                {/* <RenderButton title="Quotes" selected={router.asPath == "/project-quote"} completed={projectTypeValid} link="project-quote" /> */}
                <RenderButton title="Submission" selected={router.asPath == "/submit-order"} completed={false} link="submit-order" />
            </div>
            <div className='flex md:hidden flex-col text-center text-xl'>
                {router.asPath == "/languages" && <p>Language Selection</p>}
                {router.asPath == "/project-brief" && <p>Project Details</p>}
                {router.asPath == "/content" && <p>Content Specifics</p>}
                {/* {router.asPath == "/project-quote" && <p>Quotes</p>} */}
                {router.asPath == "/submit-order" && <p>Submission</p>}

                {/* <p className="text-l font-bold">GTH translation</p>
            <p className="text-l font-bold">All rights reserved </p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p> */}
            </div>
        </div>

    </div>
}

interface ButtonProps {
    selected: boolean;
    completed: boolean;
    title: string;
    link: string;
}


const RenderButton = ({ title, selected, completed, link }: ButtonProps) => {
    const router = useRouter()

    const handleClick = (e: any) => {
        e.preventDefault()
        router.push(link);
    }

    let selectedStyles = "rounded-full border-2";
    let completedStyles = "text-white";

    let selectedTextStyles = "hidden md:flex"

    if (selected) {
        selectedStyles = "rounded-full border-4 rounded-full";
        selectedTextStyles = `text-sky-500/100 ${selectedTextStyles}`;
    }


    if (completed) {
        completedStyles = "text-sky-500/100"
    }

    return <button onClick={handleClick} className='flex flex-col md:flex-row items-center space-x-2 hover:text-blue-900 hover:font-bold cursor-pointer'>
        <CheckIcon className={`h-8 w-8 p-1 ${completedStyles} ${selectedStyles}`} />
        <p className={selectedTextStyles}>{title}</p>
    </button>
}