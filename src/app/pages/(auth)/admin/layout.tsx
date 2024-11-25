import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quizz App - Admin-Page" // this only shows in pre-render in server side
}


export default function AdminLayout (
    {
        children
    }: { children: React.ReactNode }
) {
    
    return(
       <div>
        {children}
       </div>
    )
}


