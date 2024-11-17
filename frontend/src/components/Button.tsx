import { Children } from "react"
import { Icon } from "lucide-react"

interface ButtonProps{
    children: React.ReactNode
    text: string
    size: 'primary' | 'secondary'
}

const Button:React.FC<ButtonProps> = ({children,text,size}) => {
    const primary = 'bg-red-500 text-lg px-4 text-white font-neue w-fit p-2 rounded-xl m-8'
    const secondary = 'text-red-500  bg-white font-neue w-48 text-center text-lg px-4 p-2 rounded-full m-8'
    
    const ButtonSize = size === 'primary' ? primary : secondary
    return (
        <button className={`${ButtonSize} flex justify-center items-center gap-1`}>
            {children}
            {text}
        </button>
    )
}



export default Button