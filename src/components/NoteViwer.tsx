"use client"
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "./ui/textarea"
import { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { deleteData, updateData } from "@/actions/note";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type Props = {
    id: number,
    title: string,
    description: string,
    refresh: boolean
}

const NoteViwer = ({ id, title, description, refresh }: Props) => {

    const [isPending, starttransaction] = useTransition();

    const handleDeleteData = (idd: number) => {
        starttransaction(async () => {
            const { error } = await deleteData(idd);
            if (error) {
                toast.error("Something went wrong");
            }
            else {
                toast.success("Note successfully deleted");
            }
        });
    }

    const handleUpdateNote = (idd: number, note: string) => {
        starttransaction(
            async () => {
                const { error } = await updateData(idd, note);
                if (error) {
                    toast.error("Something went wrong");
                }
                else {
                    toast.success("Saved!");
                }
            })
    }

    const [note, setNote] = useState<string>("");

    useEffect(() => { setNote(description); },
        [refresh]);

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <br />
                <DialogDescription>
                    <Textarea id="textArea" className="text-neutral-800 dark:text-gray-100 h-[50vh]" value={note} onChange={(e) => { setNote(e.target.value) }} />
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button disabled={isPending} onClick={() => handleDeleteData(id)}>Delete</Button>
                </DialogClose>
                <Button className="w-16" disabled={isPending} onClick={() => handleUpdateNote(id, note)}>{isPending ? <Loader2 className="animated-spin" /> : "Save"}</Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default NoteViwer