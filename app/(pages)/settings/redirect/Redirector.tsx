"use client"

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Redirector() {
  const [oldUrl, setOldUrl] = useState('');
  const [newUrl, setNewUrl] = useState('');
  // const router = useRouter();

  // const handleRedirect = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   // Perform the client-side redirect
  //   if (router.pathname === oldUrl) {
  //     router.push(newUrl);
  //   } else {
  //     alert(`Navigate to ${oldUrl} to see the redirection to ${newUrl}`);
  //   }
  // };

  return (
    <div className="container mx-auto p-8 max-w-[1000px]">
      <h1 className="text-2xl font-bold mb-6">URL Redirector</h1>

      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor="oldUrl" className="block font-medium text-gray-700">
            Old URL:
          </label>
          <input
            type="text"
            id="oldUrl"
            value={oldUrl}
            onChange={(e) => setOldUrl(e.target.value)}
            placeholder="old-url"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="newUrl" className="block  font-medium text-gray-700">
            New URL:
          </label>
          <input
            type="text"
            id="newUrl"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="new-url"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 "
            required
          />
        </div>
        <button
          // onClick={() =>handleRedirect}
          className=" w-fit flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
        >
          Redirect
        </button>
      </div>

    </div>
  );
}
