import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



export const CardXS = ({ name = "John Doe", noBtn = false, btn1 = "Ajouter", btn2 = "Supprimer" }) => {
    return (
        <Card>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardHeader>
                <CardTitle>{name}</CardTitle>
            </CardHeader>
            <CardContent>
            </CardContent>
            {!noBtn &&
                <CardFooter className="flex justify-between">
                    <Button>{btn1}</Button>
                    <Button variant="outline">{btn2}</Button>
                </CardFooter>
            }
        </Card>
    )
}