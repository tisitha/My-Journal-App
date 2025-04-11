"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { loginAction, signupAction } from "../actions/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

type Props = {
    type: "login" | "signup";
};

const AuthPage = ({ type }: Props) => {

    const isLogin = type === "login";
    const router = useRouter();
    const [isPending, startTransaction] = useTransition();

    const login = (formData: FormData) => {
        startTransaction(async () => {
            const { error } = await loginAction(formData);
            if (error) {
                toast.error("Email or password is incorrect");
            }
            else {
                router.replace('/');
            }
        });
    }

    const signup = (formData: FormData) => {
        startTransaction(async () => {
            const { error } = await signupAction(formData);
            if (error) {
                toast("Something went wrong!");
            }
            else {
                toast.success("Check your email to confirm your signup");
                router.push('/login');
            }
        });
    }

    return (
        <form >
            <CardContent className="gap-6 p-3">
                <Label htmlFor="email" className="ml-1 mb-1">Email</Label>
                <Input id="email" name="email" type="email" required />
                <Label htmlFor="password" className="mt-6 ml-1 mb-1">Password</Label>
                <Input id="password" name="password" type="password" required />
            </CardContent>
            <div className="ml-3 mt-3">
                <Button className="w-25" formAction={isLogin ? login : signup} disabled={isPending}>
                    {isPending ? <Loader2 className="animated-spin" /> : isLogin ? "Log In" : "Sign Up"}
                </Button>
                <div className="mt-6">
                    {isLogin ? <> Don't have an account? <Link href={"/signup"}>Sign up</Link></>
                        : <>Have an account already? <Link href={"/login"}>Log in</Link></>}
                </div>
                <Link href={"/reset"} className="text-blue-500 text-sm hover:underline">Forgotten password?</Link>
            </div>
        </form>
    )
}

export default AuthPage