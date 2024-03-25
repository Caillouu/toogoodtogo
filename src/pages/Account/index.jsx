import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { MyFriends } from "../../components/Account/Friends"
import { Infos } from "../../components/Account/Infos"
// import { Organizers } from "./organizers"

export const Account = () => {
    return (
        <div>
            <h1>Mon compte</h1>
            <Tabs defaultValue="infos" className="w-[100%]">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="organizers">Mes Organisateurs</TabsTrigger>
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                    <TabsTrigger value="friends">Mes Amis</TabsTrigger>
                    <TabsTrigger value="infos">Mes Infos</TabsTrigger>
                </TabsList>
                <TabsContent value="organizers">
                    {/* <Organizers /> */}
                </TabsContent>
                <TabsContent value="dashboard">
                </TabsContent>
                <TabsContent value="friends">
                    <MyFriends />
                </TabsContent>
                <TabsContent value="infos">
                    <Infos />
                </TabsContent>
            </Tabs>
        </div>
    )
}