import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import * as React from 'react';
import { FileDrop } from 'react-file-drop';
import { fileData } from '../../models/file-item';
import { storage } from '../../services/clientApp';

export interface BarTimeEditorProps {
    value: string;
    onChange: (data: fileData[]) => void;
    show: boolean;
}



export const ImagePicker = (p: BarTimeEditorProps) => {
    const [progress, setProgress] = React.useState(0);
    const [isUploading, setIsUploading] = React.useState(false);
    const [image, setImage] = React.useState<File | undefined>(undefined);

    const handleChange = (e: any) => {
        if (e.target.files[0]) {
            const target = e.target as HTMLInputElement;
            const image = target.files?.[0];
            setImage(image);
        }
    };

    React.useEffect(() => {
        if (image) {
            console.log(JSON.stringify(image))
            setIsUploading(true);
            handleUpload();
        }
    }, [image])

    const handleUpload = async () => {
        if (image == null) {
            alert("Image is not selected");
            return;
        }

        const metadata = {
            contentType: image.type
        };

        const nameParts = image.name.split(".")
        const ending = nameParts[nameParts.length - 1]

        const makeid = (length: number) => {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return result;
        }

        const storageRef = ref(storage, "wizard/" + makeid(5) + "." + ending);
        const url = await uploadBytes(storageRef, image, metadata).then(uploadResult => { return getDownloadURL(uploadResult.ref) });

        const files: fileData = {
            fileName: image.name || "document",
            fileUrl: url
        }

        setIsUploading(false);
        p.onChange([files]);
    };

    const fileInputRef = React.useRef(null);

    if (!p.show) {
        return <div />
    }

    return (
        <div>
            {isUploading
                ?
                <p className="text-gray-700">Uploading...</p>
                :
                <>
                    <div className="flex flex-col flex-grow mb-3">
                        <div x-data="{ files: null }" id="FileUpload" className="block w-full py-2 px-3 relative bg-white appearance-none border-2 border-gray-300 border-solid rounded-md hover:shadow-outline-gray">
                            <input type="file"
                                className="absolute inset-0 z-50 m-0 p-0 w-full h-full outline-none opacity-0"
                                onChange={handleChange}
                                ref={fileInputRef}
                            />
                            <FileDrop
                                onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
                                onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
                                onFrameDrop={(event) => console.log('onFrameDrop', event)}
                                onDragOver={(event) => console.log('onDragOver', event)}
                                onDragLeave={(event) => console.log('onDragLeave', event)}
                                onDrop={(files, event) => { console.log('onDrop!', files, event); setImage(files?.[0]) }}
                            >
                                {<div className="flex flex-col space-y-2 items-center justify-center">
                                    <i className="fas fa-cloud-upload-alt fa-3x text-currentColor"></i>
                                    <p className="text-gray-700">Drag your files here or click in this area.</p>
                                    <a className="flex items-center mx-auto py-2 px-4 text-white text-center font-medium border border-transparent rounded-md outline-none bg-sky-500/100">Select a file</a>
                                </div>}
                            </FileDrop>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

