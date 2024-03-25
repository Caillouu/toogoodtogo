import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { CardXS } from "../../../../../eventProject/src/components/cardxs";
import { SearchBasic } from "../../../../../eventProject/src/components/searchBasic";

const response = await fetch('https://jsonplaceholder.typicode.com/users');
const friends = await response.json();

export const MyFriends = () => {
    return (
        <>
            <h1>Mes amis</h1>
            <Tabs defaultValue="requests" className="w-[100%]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="requests">Requests</TabsTrigger>
                    <TabsTrigger value="friends">My friends</TabsTrigger>
                </TabsList>
                <TabsContent value="requests">
                    <h2>Friends requests</h2>
                    <div className="grid grid-cols-3 gap-3">
                        <CardXS />
                        <CardXS />
                        <CardXS />
                        <CardXS />
                    </div>
                    <h2>Suggestions</h2>
                    <div className="grid grid-cols-3 gap-3">
                        <CardXS />
                        <CardXS />
                        <CardXS />
                        <CardXS />
                    </div>
                </TabsContent>
                <TabsContent value="friends">
                    <h2>My friends</h2>
                    <SearchBasic data={friends} />
                </TabsContent>
            </Tabs>
        </>
    )
}