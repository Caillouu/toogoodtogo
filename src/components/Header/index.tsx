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

export const Header = () => {
    return (
        <Menubar>
            <MenubarMenu>
                <Link to="/">Home</Link>
                <Sheet>
                    <SheetTrigger>Mon compte</SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px]">
                        Component se connecter
                    </SheetContent>
                </Sheet>
                <Link to="/account">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Link>
            </MenubarMenu>
        </Menubar>
    )
}