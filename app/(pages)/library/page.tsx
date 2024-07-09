"use client"
import React, { useState, useEffect, Suspense, useCallback } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Heading from '@/app/components/Heading';
import UploadBtn from './UploadBtn';
import Container from '@/app/components/Container';
import ImageGrid from '@/app/components/sekeletons/ImageGrid';
import { Dialog } from '@headlessui/react';
import { FaEllipsisV, FaRegCopy } from 'react-icons/fa';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import DownMenu from './Menu';
import toast from 'react-hot-toast';
import MyTable from './MyTable';



type ImageType = {
    public_id: string;
    secure_url: string;
    bytes: number;

};

const MediaPage: React.FC = () => {
    const [images, setImages] = useState<ImageType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [showModel, setSShowModel] = useState<boolean>(isModalOpen);
    const [nextCursor, setNextCursor] = useState<string | null>(null);


    const fetchImages = useCallback(async (cursor: string | null = null) => {
        try {
            const response = await axios.get(`/api/getImages`, {
                params: { nextCursor: cursor },
            });
            setImages((prevImages) => [...prevImages, ...response.data.resources]);
            setNextCursor(response.data.next_cursor);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch images');
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        fetchImages();
    }, [])

    const handleImageClick = (image: ImageType) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Image URL copied successfully");
    };

    const handleDownload = (url: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop() || 'image';
        link.click();
    };

    const handleDelete = async (public_id: string) => {
        try {
            await axios.delete(`/api/deleteImage`, { data: { public_id } });
            setImages(images.filter((image) => image.public_id !== public_id));
            alert('Image deleted successfully');
        } catch (error) {
            alert('Failed to delete image');
        }
    };

    useEffect(() => {
        setSShowModel(isModalOpen)
    }, [isModalOpen])


    // if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <Container>
            <div className="container mx-auto p-4">
                <div className=' flex justify-between items-center w-full mb-12'>
                    <Heading
                        title='Library'
                    />
                    <div>
                        <UploadBtn />
                    </div>
                </div>
                {loading ? <ImageGrid /> :
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {images.map((image) => (
                            <div

                                key={image.public_id}
                                className="relative w-full h-60 cursor-pointer group hover:opacity-70 
                                            overflow-hidden duration-300">
                                <Image
                                    onClick={() => handleImageClick(image)}
                                    src={image.secure_url}
                                    alt={image.public_id}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg shadow-md group-hover:scale-105 transition-all duration-300"
                                />
                                <div className="absolute top-2 right-2 flex space-x-2">
                                    <button
                                        className="bg-green-500 text-white p-1 rounded shadow-md hover:bg-green-600"
                                        onClick={() => copyToClipboard(image.secure_url)}
                                    >
                                        <FaRegCopy />
                                    </button>
                                    {/* <DownMenu /> */}
                                    {/* <Menu as="div" className="relative inline-block text-left">
                                        <Menu.Button className="bg-gray-500 text-white p-1 rounded shadow-md hover:bg-gray-600">
                                            <FaEllipsisV />
                                        </Menu.Button>
                                        <Menu.Items className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active ? 'bg-gray-100' : ''
                                                            } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                                                        onClick={() => copyToClipboard(image.secure_url)}
                                                    >
                                                        Copy URL
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active ? 'bg-gray-100' : ''
                                                            } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                                                        onClick={() => handleDownload(image.secure_url)}
                                                    >
                                                        Download
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active ? 'bg-gray-100' : ''
                                                            } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                                                        onClick={() => handleDelete(image.public_id)}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active ? 'bg-gray-100' : ''
                                                            } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                                                        onClick={() => handleImageClick(image)}
                                                    >
                                                        Details
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Menu> */}
                                </div>

                            </div>
                        ))}
                    </div>}

                {nextCursor && (
                    <div className="text-center mt-8">
                        <button
                            className=" bg-indigo-50 border border-indigo-700 text-black px-6 py-3 rounded-md 
                                        transition-all hover:bg-indigo-100 mt-4"
                            onClick={() => fetchImages(nextCursor)}
                        >
                            Show More Images
                        </button>
                    </div>
                )}

                <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className={"transition-all duration-500 ease-in-out"}>
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-500 ease-in-out">
                        <div className=
                            {`
                                ${showModel ? " scale-[100%] opacity-100" : "scale-[90%] opacity-0"}
                                bg-white 
                                overflow-hidden 
                                rounded-xl
                                shadow-lg 
                                relative 
                                transition-all 
                                duration-200 
                                ease-in-out`}
                        >
                            {selectedImage && (
                                <div className=' flex-col flex justify-start items-start gap-4 p-4'>
                                    <div
                                        className="relative w-[480px] h-[280px]">
                                        <Image
                                            src={selectedImage.secure_url}
                                            alt={selectedImage.public_id}
                                            fill priority={false}
                                            className=" object-cover rounded-xl"
                                        />
                                    </div>
                                    <div className='w-full flex flex-col gap-1 p-4'>
                                        <h2 className="text-xl font-medium mb-2">Image Details</h2>
                                        <p className=' max-w-[450px] overflow-hidden'><strong>File Name:</strong> {selectedImage.public_id}</p>
                                        <p><strong>Size:</strong> {(selectedImage.bytes / 1024).toFixed(2)} KB</p>

                                        <div className='w-full flex justify-between items-center gap-3'>
                                            <button
                                                className=" w-full bg-rose-500 text-white px-4 py-3 rounded-md 
                                                 text-center hover:bg-rose-600 mt-4 flex items-center transition-all"
                                                onClick={() => copyToClipboard(selectedImage.secure_url)}
                                            >
                                                <FaRegCopy className="mr-2" /> Copy URL
                                            </button>
                                            <button
                                                className="w-full bg-indigo-50 border border-indigo-700 text-black px-4 py-3 rounded-md 
                                                transition-all hover:bg-indigo-100 mt-4"
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Dialog>
            </div>
        </Container >
    );
};

export default MediaPage;
