import { ModeToggle } from "./ui/ModeToggle";
import Image from 'next/image';
import logo from '../../public/logo.png';
import { SidebarTrigger } from "./ui/sidebar";
import LogoutButton from "./LogoutButton";
import AskAi from "./AskAi";


const Header = async () => {

    return (
        <div className="flex w-full h-30 items-center justify-around bg-gray-200 shadow-gray-500 dark:bg-gray-900">
            <SidebarTrigger />
            <div className="flex items-center font-bold gap-2">
                <Image src={logo} alt={"logo"} width={40} />
                <div>My Journal</div>
            </div>

            <div className="flex items-center gap-4">
                <AskAi />
                < ModeToggle />
            </div>
            <LogoutButton />
        </div>
    )
}

export default Header