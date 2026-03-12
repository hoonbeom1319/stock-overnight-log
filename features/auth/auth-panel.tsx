'use client';

import { FormEvent, useState } from 'react';

import { supabase } from '@/shared/api/supabase/client';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

export function AuthPanel() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const normalizedEmail = email.trim();
    const isPasswordValid = password.length >= 6;
    const canSubmit = Boolean(normalizedEmail && isPasswordValid);

    const validateInput = () => {
        if (!normalizedEmail) {
            setErrorMessage('이메일을 입력해주세요.');
            return false;
        }

        if (!isPasswordValid) {
            setErrorMessage('비밀번호는 6자 이상 입력해주세요.');
            return false;
        }

        return true;
    };

    const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage(null);
        setErrorMessage(null);

        if (!validateInput()) return;

        setIsSubmitting(true);

        const { error } = await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password
        });

        setIsSubmitting(false);

        if (error) {
            setErrorMessage(`로그인 실패: ${error.message}`);
            return;
        }

        setMessage('로그인되었습니다.');
    };

    const handleSignUp = async () => {
        setMessage(null);
        setErrorMessage(null);

        if (!validateInput()) return;

        setIsSubmitting(true);

        const { error } = await supabase.auth.signUp({
            email: normalizedEmail,
            password
        });

        setIsSubmitting(false);

        if (error) {
            setErrorMessage(`회원가입 실패: ${error.message}`);
            return;
        }

        setMessage('회원가입 요청이 완료되었습니다. 이메일 인증 후 로그인하세요.');
    };

    return (
        <Card className="w-full max-w-lg space-y-5">
            <div>
                <h2 className="text-xl font-bold text-slate-100">로그인</h2>
                <p className="mt-1 text-sm text-slate-400">Supabase 이메일 인증으로 본인 매매일지를 안전하게 관리합니다.</p>
            </div>

            <form className="space-y-4" onSubmit={handleSignIn}>
                <div className="space-y-2">
                    <Label htmlFor="auth-email">이메일</Label>
                    <Input
                        id="auth-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="auth-password">비밀번호</Label>
                    <Input
                        id="auth-password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="8자 이상 권장"
                        autoComplete="current-password"
                        minLength={6}
                        required
                    />
                </div>

                <div className="flex flex-wrap gap-3">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? '처리 중...' : '로그인'}
                    </Button>
                    <Button type="button" variant="secondary" onClick={handleSignUp} disabled={isSubmitting || !canSubmit}>
                        회원가입
                    </Button>
                </div>
            </form>

            {message ? <p className="text-sm text-emerald-400">{message}</p> : null}
            {errorMessage ? <p className="text-sm text-rose-400">{errorMessage}</p> : null}
        </Card>
    );
}
