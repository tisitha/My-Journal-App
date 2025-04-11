'use server'

import { createClient } from '@/utils/supabase/server'

export async function loginAction(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    return await supabase.auth.signInWithPassword(data);

}

export async function signupAction(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    return await supabase.auth.signUp(data)
}

export async function logoutAction() {
    const supabase = await createClient()

    return await supabase.auth.signOut();
}

export async function getUserId() {
    const supabase = await createClient();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }

    return user?.id;
}

export async function resetPassAction(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
    }

    return await supabase.auth.resetPasswordForEmail(data.email, { redirectTo: `${process.env.FRONTEND_URL!}/updatepass` })

}

export async function updatePassAction(formData: FormData, code: string) {
    const supabase = await createClient()

    await supabase.auth.exchangeCodeForSession(code);

    const data = {
        password: formData.get('password') as string,
    }

    return await supabase.auth.updateUser({ password: data.password });

}