"use client"
import React, { useTransition } from 'react'
import { CardContent } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import Link from 'next/link'
import { resetPassAction, updatePassAction } from '@/actions/actions'
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'

type Props = {
    type: "forEmail" | "forNewPass";
}

const PassResetPage = ({ type }: Props) => {

    const isForEmail = type === "forEmail";
    const router = useRouter();
    const [isPending, startTransaction] = useTransition();

    const searchParams = useSearchParams();

    const search = (formData: FormData) => {
        startTransaction(async () => {
            const { error } = await resetPassAction(formData);
            if (error) {
                toast.error("Email is not-found");
            }
            else {
                toast.success("found your email");
                router.replace('/emailfound')
            }
        })
    }

    const update = (formData: FormData) => {
        startTransaction(async () => {
            const value = searchParams.get('code');
            const { error } = await updatePassAction(formData, value || "");
            if (error) {
                toast.error(error.message);
            }
            else {
                toast.success("Password Changed!");
                router.replace('/')
            }
        })
    }

    return (
        <form>
            {isForEmail ? <CardContent className="gap-6 p-3">
                <Label htmlFor='email' className="ml-1 mb-1">Email</Label>
                <Input id="email" name="email" type="email" required />
            </CardContent> : <CardContent className="gap-6 p-3">
                <Label htmlFor='password' className="ml-1 mb-1">New Password</Label>
                <Input id="password" name="password" type="password" required />
            </CardContent>}
            <div className="flex mr-3 mt-6 justify-end gap-2">
                <Link href={"/login"}><Button>Cancel</Button></Link>
                {isForEmail ? <Button disabled={isPending} formAction={search}>Search</Button> : <Button disabled={isPending} formAction={update}>Submit</Button>}
            </div>
        </form>
    )
}

export default PassResetPage