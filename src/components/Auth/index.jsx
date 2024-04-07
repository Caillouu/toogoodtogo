import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Login } from "./Login"
import { Register } from "./Register"

export const Auth = () => {
    return (
        <>
            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="account">Se connecter</TabsTrigger>
                    <TabsTrigger value="password">Créer un compte</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Login />
                </TabsContent>
                <TabsContent value="password">
                    <Register />
                </TabsContent>
            </Tabs>
        </>
    )
}