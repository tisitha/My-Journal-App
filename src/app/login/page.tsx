import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image';
import logo from '../../../public/logo.png';
import AuthPage from "@/components/AuthPage";

const login = () => {
    return (
        <div className="flex w-screen h-screen items-center justify-center">
            <Card className="w-90 h-120">
                <CardHeader className="mt-8">
                    <CardTitle><div className="flex items-center font-bold gap-2">
                        <Image src={logo} alt={"logo"} width={40} />
                        <div>My Journal</div>
                    </div></CardTitle>
                    <CardDescription className="mt-7 mb-3">Log in to your account</CardDescription>
                    <AuthPage type="login" />
                </CardHeader>
            </Card>
        </div>
    )
}

export default login