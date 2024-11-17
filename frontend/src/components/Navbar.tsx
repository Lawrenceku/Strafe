import Button from "./Button"
import {Profile} from 'lucide-react'
import button from "./Button"

const Navbar = () => {  
    return(
        <div className="flex justify-around items-center z-40 text-white">
            <span className="text-4xl font-bold text-white font-neue">Strafe</span>
             <ul className="flex gap-8">
                <li>Home</li>
                <li>About</li>
                <li>Item</li>
             </ul>
             <Button text='Sign up' size='secondary'></Button>
        </div>
    )
}

export default Navbar