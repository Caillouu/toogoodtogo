import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation, gql } from '@apollo/client';
import { useState } from "react"
import { PasswordInput } from "@/components/ui-custom/password-input"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from 'react-toastify';

const formSchema = z.object({
    email: z.string().min(6, {
        message: "Email must be at least 6 characters.",
    }).email("This is not a valid email."),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    })
})

export const Login = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = async (values) => {
        const { email, password } = values
        try {
            const { data } = await axios.post('/login', { email, password })

            if (data.msgError) {
                toast.error(data.msgError)
            } else {
                toast.success('Login Successfully. Welcome !')
                navigate(0)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h2>Se connecter</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@email.com" {...field} />
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
                                <FormLabel>Mot de passe</FormLabel>
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
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    )
}