import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import React, { Suspense } from 'react'
import Image from 'next/image';
import logo from '../../../public/logo.png';
import PassResetPage from '@/components/PassResetPage';

const reset = () => {
    return (
        <div className="flex w-screen h-screen items-center justify-center">
            <Card className=" w-90 h-100">
                <CardHeader className="mt-8">
                    <CardTitle><div className="flex items-center font-bold gap-2">
                        <Image src={logo} alt={"logo"} width={40} />
                        <div>Find Your Account</div>
                    </div></CardTitle>
                    <CardDescription className="mt-7 mb-3">Please enter your email address to search for your account.</CardDescription>
                    <Suspense fallback={<div>Loading...</div>}>
                        <PassResetPage type='forEmail' />
                    </Suspense>
                </CardHeader>
            </Card>
        </div>
    )
}

export default reset