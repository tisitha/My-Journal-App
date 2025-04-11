import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import logo from '../../../public/logo.png'
import Image from 'next/image';

const emailfound = () => {
    return (
        <div className="flex w-screen h-screen items-center justify-center">
            <Card className=" w-100 h-60">
                <CardHeader className="mt-8">
                    <CardTitle><div className="flex items-center font-bold gap-2">
                        <Image src={logo} alt={"logo"} width={40} />
                        <div>Reset Password</div>
                    </div></CardTitle>
                    <CardDescription className="mt-7 mb-3 text-gray-800 dark:text-zinc-200">We have e-mailed your password reset link.</CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}

export default emailfound