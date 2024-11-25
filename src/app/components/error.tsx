"use client"

import { useEffect } from "react"

export default function ErrorPage({error}: {error: Error}){
    useEffect(() => {
        console.log(`${error}`)
    },[error])

    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                <h2 className="text-xl font-semibold">Something went wrong</h2>
                <p className="mt-4">{error?.message || "An unexpected error occurred."}</p>
            </div>
        </div>
    )
}