import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import React from 'react'
import logo from '../../../public/logo.png'
import Image from 'next/image';
import PassResetPage from '@/components/PassResetPage'

const updatepass = () => {
    return (
        <div className="flex w-screen h-screen items-center justify-center">
            <Card className=" w-90 h-100">
                <CardHeader className="mt-8">
                    <CardTitle><div className="flex items-center font-bold gap-2">
                        <Image src={logo} alt={"logo"} width={40} />
                        <div>Reset Password</div>
                    </div></CardTitle>
                    <CardDescription className="mt-7 mb-3">Please enter your new password.</CardDescription>
                    <PassResetPage type='forNewPass' />
                </CardHeader>
            </Card>
        </div>
    )
}

export default updatepass