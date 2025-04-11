"use client"
import { DeleteIcon, SearchIcon } from "lucide-react";
import { DatePickerWithRange } from "./ui/DatePickerWithRange";
import { SidebarContent, SidebarGroup } from "./ui/sidebar"
import { Input } from "./ui/input";
import { deleteData, getData } from "@/actions/note";
import { getUserId } from "@/actions/actions";
import { useEffect, useState, useTransition } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import NoteViwer from "./NoteViwer";

const SidebarContentPanel = () => {

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [data, setData] = useState<{ id: number, owner: string, date: string, note: string }[]>();
    const [isDeleting, starttransaction] = useTransition();
    const [refresh, setRefresh] = useState<boolean>(false);

    const changeRefresh = () => {
        setRefresh((prev) => (!prev));
        handleGetData();
    }

    const handleGetData = async () => {
        const uid: any = await getUserId();
        const { data, error } = await getData(uid, searchTerm, dateRange);
        if (error) {
            toast.error("something went wrong");
        }
        else {
            setData(data);
        }
    }

    const handleDeleteData = (id: number) => {
        starttransaction(async () => {
            const { error } = await deleteData(id);
            if (error) {
                toast.error("Something went wrong");
            }
            else {
                setData(data?.filter((d) => d.id != id));
                toast.success("Note successfully deleted");
            }
        });

    }

    const handleOnChangeDateRange = (newDateRange: DateRange | undefined) => {
        setDateRange(newDateRange);
    }

    useEffect(() => { handleGetData() },
        [searchTerm, dateRange]);

    return (
        <>
            <SidebarContent onMouseEnter={handleGetData} className="pl-3 pr-3">
                <div className="relative flex items-center">
                    <SearchIcon className="absolute size-4 left-2" />
                    <Input id="searchBar" className="bg-muted pl-8"
                        placeholder="Search your note..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <DatePickerWithRange value={dateRange} onChangeDateRange={handleOnChangeDateRange} />
                {data?.map((d, i) => (
                    <div key={i} className="flex hover:bg-gray-300 dark:hover:bg-black p-2 rounded-md">
                        <Dialog onOpenChange={changeRefresh}>
                            <DialogTrigger asChild>
                                <div className="w-[80%] hover:cursor-pointer" >
                                    {d.date}<br />{d.note.length >= 16 ? d.note.slice(0, 16) + "...." : d.note}
                                </div>
                            </DialogTrigger>
                            <NoteViwer id={d.id} title={d.date} description={d.note} refresh={refresh} />
                        </Dialog>
                        <div className="flex w-[20%] items-center justify-center">
                            {!isDeleting && <DeleteIcon onClick={() => handleDeleteData(d.id)} className="hover:cursor-pointer" />}
                        </div>
                    </div >
                ))}
            </SidebarContent>
        </>
    )
}

export default SidebarContentPanel