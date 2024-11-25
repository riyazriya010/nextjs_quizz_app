import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        absolute: "Quizz - User"
    }
}

export default function UserLayout (
    {
        children
    }: { children: React.ReactNode }
) {
    return(
        <div>
            {
                children
            }
        </div>
    )
}
