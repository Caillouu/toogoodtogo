import './filterMap.scss'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { number, z } from "zod"
import { cn } from "@/lib/utils"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { addDays, format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Filter } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"
import { gql, useQuery } from '@apollo/client'

const GET_CATEGORY = gql`
    query Category {
        categories {
            _id
            icon
            name
        }
    }
`;

const FormSchema = z.object({
    categories: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one category.",
    })
})

export const FilterMap = ({ submitValues }) => {
    const { data: { categories } = {} } = useQuery(GET_CATEGORY);

    const dateOptions = {
        from: new Date(),
        to: addDays(new Date(), 7),
    }
    const defaultValues = {
        categories: [],
        dob: dateOptions
    }
    const [date, setDate] = useState(dateOptions)

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues
    })

    const onSubmit = (data) => {
        submitValues({ ...data, dob: date })
    }

    const onReset = () => {
        form.reset(defaultValues)
        setDate(dateOptions)
        submitValues({ categories: [], dob: dateOptions })
    }

    return (
        <Collapsible>
            <CollapsibleTrigger>Filtrer <Filter className="mr-2 h-4 w-4" /></CollapsibleTrigger>
            <CollapsibleContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="form-filter-map">
                        <FormField
                            control={form.control}
                            name="categories"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Rechercher un élément en particulier</FormLabel>
                                    </div>
                                    {categories.map((category) => (
                                        <FormField
                                            key={category._id}
                                            control={form.control}
                                            name="categories"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={category._id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(category._id)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, category._id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== category._id
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            <img src={`/src/assets/images/icons/${category.icon}.svg`} alt="" />{category.name}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date de l'événèment</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                id="date"
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[300px] justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date?.from ? (
                                                    date.to ? (
                                                        <>
                                                            {format(date.from, "dd/MM/yyyy")} -{" "}
                                                            {format(date.to, "dd/MM/yyyy")}
                                                        </>
                                                    ) : (
                                                        format(date.from, "dd/MM/yyyy")
                                                    )
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={date?.from}
                                                selected={date}
                                                onSelect={setDate}
                                                numberOfMonths={2}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Rafraichir les filtres</Button>
                        <Button type="button" variant="secondary" onClick={() => onReset()}>Supprimer les filtres</Button>
                    </form>
                </Form>
            </CollapsibleContent>
        </Collapsible>
    )
}