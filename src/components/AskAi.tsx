"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useState, useTransition } from "react"
import main from "@/gemini/main"
import { Loader2 } from "lucide-react"

const AskAi = () => {

    const [text, setText] = useState<string>("");
    const [answer, setAnswer] = useState<string>();
    const [isLoading, startTransaction] = useTransition();

    const getAnswer = () => {
        startTransaction(async () => {
            if (text.trim() != "") {
                const ans = await main(text);
                setAnswer(ans);
                setText("");
            }
        }
        )
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild><Button>ask AI</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="p-4 h-auto text-justify">{answer}</DialogTitle>
                        <DialogDescription>
                            <Textarea id="textArea" className="text-neutral-800 dark:text-gray-100" placeholder="ask AI" value={text} onChange={(e) => setText(e.target.value)} />
                        </DialogDescription>
                        <div className="flex justify-end gap-2">
                            <Button onClick={() => setText("")}>New Chat</Button>
                            <Button className="w-20" disabled={isLoading} onClick={() => getAnswer()}>{isLoading ? <Loader2 className="animated-spin" /> : "Ask"}</Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AskAi