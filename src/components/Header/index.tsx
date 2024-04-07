import {
    Menubar,
    MenubarMenu
} from "@/components/ui/menubar"
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom"
// @ts-ignore
import { Auth } from "../Auth"
import { useContext } from "react"
import { UserContext } from "@/context/userContext"

export const Header = () => {
    const { user }: any = useContext(UserContext)

    // console.log(user)

    return (
        <Menubar className="p-5 h-auto">
            <MenubarMenu>
                <div className="flex justify-between items-center w-full">
                    <div className="">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="">
                        {!user ? (
                            <Sheet>
                                <SheetTrigger>Se connecter/S'inscrire</SheetTrigger>
                                <SheetContent className="w-[400px] sm:w-[540px]">
                                    <Auth />
                                </SheetContent>
                            </Sheet>
                        ) : (
                            <Link to="/account">
                                <div className="flex justify-between items-center w-full">
                                    <div className="mr-2">Bonjour, {user.name}</div>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                            </Link>
                        )
                        }
                    </div>
                </div>
            </MenubarMenu>
        </Menubar>
    )
}