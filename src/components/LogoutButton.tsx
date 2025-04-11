"use client"

import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { logoutAction } from "../actions/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutButton = () => {

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const logout = async () => {
        setLoading(true);
        const { error } = await logoutAction();
        if (error) {
            toast.success("Something went wrong!");
        }
        else {
            router.push('/login');
        }
        setLoading(false);

    };
    return (
        <Button
            className="w-20"
            onClick={logout}
            disabled={loading}
        >
            {loading ? <Loader2 className="animated-spin" /> : "Log Out"}
        </Button>
    )
}

export default LogoutButton