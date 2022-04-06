import Image from 'next/image'

export const ImageSidebar = () => {
    return <div className='hidden flex-col md:flex'>
        <img className="w-128 mb-5" src="https://gthtranslation.com/wp-content/uploads/2022/02/Group-24.webp" />
        {/* <Image
            className="w-64 mb-5"
            src="https://gthtranslation.com/wp-content/uploads/2022/02/Group-24.webp"
            alt="Landscape picture"
            width={500}
            height={500}
        /> */}
    </div>
}