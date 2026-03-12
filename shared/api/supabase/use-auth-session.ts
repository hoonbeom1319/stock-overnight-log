'use client';

import { useEffect, useState } from 'react';

import { type Session } from '@supabase/supabase-js';

import { supabase } from '@/shared/api/supabase/client';

export function useAuthSession() {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const initializeSession = async () => {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error('세션 조회 실패:', error.message);
            }

            if (!isMounted) return;
            setSession(data.session ?? null);
            setIsLoading(false);
        };

        const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
            setSession(nextSession);
            setIsLoading(false);
        });

        void initializeSession();

        return () => {
            isMounted = false;
            subscription.subscription.unsubscribe();
        };
    }, []);

    return {
        user: session?.user ?? null,
        session,
        isLoading
    };
}
