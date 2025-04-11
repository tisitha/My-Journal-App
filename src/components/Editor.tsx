"use client"
import { useState, useTransition } from "react";
import { Button } from "./ui/button"
import { DatePicker } from "./ui/DatePicker"
import { Textarea } from "./ui/textarea"
import { getUserId } from "@/actions/actions";
import { sendData } from "@/actions/note";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Editor = () => {

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [note, setNote] = useState<string>("");
    const [isLoading, startTransaction] = useTransition();

    const clearTextArea = () => {
        setNote("");
    }

    const getSelectedDate = (newSelectedDate: Date | undefined) => {
        setSelectedDate(newSelectedDate);
    }

    const sendNoteData = () => {
        if (note.trim() != "") {
            startTransaction(async () => {
                const uid = await getUserId();
                const newdate = selectedDate?.toLocaleDateString("en-CA");
                const noteData = { owner: uid, date: newdate, note: note };
                const { error } = await sendData(noteData);
                if (error) {
                    toast.error("error");
                }
                else {
                    toast.success("saved");
                    setNote("");
                }
            })
        }
        else {
            toast.warning("You can not pass a empty message");
        }
    }

    return (
        <div className="p-5 flex flex-col gap-5 h-full">
            <DatePicker value={selectedDate} onChangeDate={getSelectedDate} />
            <Textarea id="noteArea" className="h-[70%]" value={note} onChange={(e) => { setNote(e.target.value) }} />
            <div className="flex gap-4 items-center mb-5">
                <Button onClick={clearTextArea}>New note</Button>
                <Button onClick={sendNoteData} disabled={isLoading} className="w-17">{isLoading ? <Loader2 className="animated-spin" /> : "Save"}</Button>
            </div>
        </div>
    )
}

export default Editor