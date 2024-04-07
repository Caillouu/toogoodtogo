import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui-custom/password-input"
import { useContext, useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { ChevronsDownUp } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { isValidPhoneNumber } from "react-phone-number-input";
import { PhoneInput } from "@/components/ui-custom/phone-input";
import { Progress } from "@/components/ui/progress"
import { gql, useQuery } from "@apollo/client"
import { UserContext } from "@/context/userContext"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"



const formSchema = z.object({
    name: z.string().refine((value) => value.length > 0, {
        message: "Name is required"
    }),
    email: z.string().email({
        message: "Invalid email"
    }),
    file: z
        .any()
        .refine((file) => file?.length == 1, 'File is required.')
        .refine((file) => file[0]?.size <= 3000000, `Max file size is 3MB.`),
    adress: z.string().refine((value) => value.length > 0, {
        message: "Adresse is required"
    }),
    phone: z.string().refine(isValidPhoneNumber, {
        message: "Invalid phone number"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters."
    }).optional().or(z.literal('')),
    confirmPassword: z.string().min(6, {
        message: "Password must be at least 6 characters."
    }).optional().or(z.literal(''))
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
})


const GET_USER = gql`
    query UserById($userByIdId: String) {
        userById(id: $userByIdId) {
        name
        email
        adress
        phone
        createdAt
        }
    }
`;

export const Infos = () => {
    const navigate = useNavigate()
    const [percent, setPercent] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [currentPassword, setCurrentPassword] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const { user } = useContext(UserContext)
    const { data } = useQuery(GET_USER, {
        variables: {
            userByIdId: user?.id
        }
    });

    const { reset, ...form } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            file: undefined,
            adress: "",
            phone: "",
            password: "",
            confirmPassword: ""
        },
    })

    useEffect(() => {
        reset({
            name: data?.userById.name,
            email: data?.userById.email,
            file: undefined,
            adress: data?.userById.adress || "",
            phone: data?.userById.phone || "",
            password: "",
            confirmPassword: ""
        })
    }, [data])

    useEffect(() => {
        setPercent(0)
        const obj = form.formState.defaultValues
        // delete confirmPassword and Password to profil percent
        const cloneObj = (({ confirmPassword, password, ...o }) => o)(obj)
        Object.values(cloneObj).forEach((value) => {
            if (value !== "") {
                setPercent((prevState) => {
                    return prevState + 1 / Object.values(cloneObj).length * 100
                })
            }
        })
    }, [form.formState.defaultValues])

    const onSubmit = async (values) => {
        const { name, email, adress, phone, confirmPassword, password } = values
        const id = user.id
        if (currentPassword !== "" || password !== "") {
            try {
                const { data } = await axios.post('/updateProfile', { id, name, email, adress, phone, currentPassword, confirmPassword, password })
                if (data.msgError) {
                    toast.error(data.msgError)
                } else {
                    toast.success('Modifications et mot de passe enregistrées !')
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const { data } = await axios.post('/updateProfile', { id, name, email, adress, phone })
                if (data.msgError) {
                    toast.error(data.msgError)
                } else {
                    toast.success('Modifications enregistrées !')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const logout = async () => {
        try {
            const { data } = await axios.post('/logout')
            if (data.msgError) {
                toast.error(data.msgError)
            } else {
                navigate(0)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="flex justify-end">
                <Button onClick={() => logout()}>Se déconnecter</Button>
            </div>
            <h2>Mon profil est renseigné à {percent} % :</h2>
            <span>Membre depuis le {new Date(parseInt(data?.userById.createdAt)).toLocaleDateString("fr-FR")}</span>
            <Progress value={percent} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input disabled {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input disabled {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="adress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        defaultCountry="FR"
                        render={({ field }) => (
                            <FormItem className="flex flex-col items-start">
                                <FormLabel className="text-left">Phone Number</FormLabel>
                                <FormControl className="w-full">
                                    <PhoneInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator />
                    <Collapsible
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        className="w-[350px] space-y-2"
                    >
                        <div className="flex items-center justify-between space-x-4 px-4">
                            <h4 className="text-sm font-semibold">
                                Changer de mot de passe
                            </h4>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <ChevronsDownUp className="h-4 w-4" />
                                    <span className="sr-only">Toggle</span>
                                </Button>
                            </CollapsibleTrigger>
                        </div>
                        <CollapsibleContent className="space-y-2">
                            <FormField
                                control={form.control}
                                name="current_password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current password</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                id="current_password"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                autoComplete="password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New password</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                autoComplete="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm new password</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                autoComplete="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CollapsibleContent>
                    </Collapsible>
                    <Button type="submit">Valider mes modifications</Button>
                </form>
            </Form>
        </>
    )
}