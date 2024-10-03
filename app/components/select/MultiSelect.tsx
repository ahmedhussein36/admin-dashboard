import { useState, useRef, useEffect } from 'react';

interface MultiSelectProps {
    options: { id: string; title: string }[];
    onSelect: (selectedItems: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelection = (id: string) => {
        setSelectedItems((prev) => {
            if (prev.includes(id)) {
                return prev.filter((item) => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    // useEffect(() => {
    //     onSelect(selectedItems);
    // }, [selectedItems, onSelect]);

    // const handleClickOutside = (event: MouseEvent) => {
    //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
    //         setIsOpen(false);
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener('mousedown', handleClickOutside);
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="border border-gray-300 rounded px-3 py-2 cursor-pointer"
                // onClick={toggleDropdown}
            >
                {selectedItems.length === 0 ? 'Select options' : `${selectedItems.length} selected`}
            </div>
            {isOpen && (
                <div className="absolute mt-2 w-full flex flex-col gap-1 p-4 bg-white border border-gray-300 rounded z-10">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`flex items-center px-4 py-2 duration-200 rounded-md
                                cursor-pointer hover:bg-gray-200 ${selectedItems.includes(option.id) ? 'bg-gray-100' : ''
                                }`}
                            onClick={() => handleSelection(option.id)}
                        >
                            <div
                                className={`w-5 h-5 border border-gray-300 rounded-md flex items-center justify-center mr-2 ${selectedItems.includes(option.id) ? 'bg-indigo-600' : 'bg-white'
                                    }`}
                            >
                                {selectedItems.includes(option.id) && (
                                    <svg
                                        className="w-3 h-3 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                )}
                            </div>
                            <label className="text-sm text-gray-900">{option.title}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
