import AuthPage from "@/components/AuthPage"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import logo from '../../../public/logo.png';

const signup = () => {
    return (
        <div className="flex w-screen h-screen items-center justify-center">
            <Card className="w-90 h-120">
                <CardHeader className="mt-8">
                    <CardTitle><div className="flex items-center font-bold gap-2">
                        <Image src={logo} alt={"logo"} width={40} />
                        <div>My Journal</div>
                    </div></CardTitle>
                    <CardDescription className="mt-7 mb-3">Create a new account</CardDescription>
                    <AuthPage type="signup" />
                </CardHeader>
            </Card>
        </div>
    )
}

export default signup