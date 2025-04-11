'use server'

import { createClient } from '@/utils/supabase/server';
import { DateRange } from 'react-day-picker';

export async function sendData(note: Object) {
    const supabase = await createClient();
    return await supabase.from("data").insert(note);
}

export async function getDataForAI() {
    const supabase = await createClient();
    return await supabase.from("data").select("*");
}

export async function getData(uid: string, searchTerm: string, dateRange: DateRange | undefined) {

    if (dateRange == undefined) {
        dateRange = {
            from: new Date(1980, 1, 1),
            to: (new Date())
        }
    }
    if (dateRange.from == undefined) {
        dateRange.from = dateRange.to;
    }
    if (dateRange.to == undefined) {
        dateRange.to = dateRange.from;
    }
    const date1 = dateRange.from?.toLocaleDateString("en-CA");
    const date2 = dateRange.to?.toLocaleDateString("en-CA");
    const supabase = await createClient();
    return await supabase.from("data").select("*").eq("owner", uid).gte("date", date1).lte("date", date2).ilike("note", "%" + searchTerm + "%").order('date', { ascending: false });;
}

export async function deleteData(id: number) {
    const supabase = await createClient();
    return await supabase.from("data").delete().eq('id', id);
}

export async function updateData(id: number, noteData: String) {
    const supabase = await createClient();
    return await supabase.from("data").update({ note: noteData }).eq('id', id);
}