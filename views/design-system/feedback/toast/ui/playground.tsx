'use client';

import { useEffect, useRef, useState } from 'react';

import { Icon } from '@/design-system/display/icon';
import {
    Toast,
    ToastAction,
    ToastCloseButton,
    ToastContent,
    ToastDescription,
    ToastIcon,
    ToastProvider,
    ToastTitle,
    ToastViewport,
    toastVariants
} from '@/design-system/feedback/toast';
import { Button } from '@/design-system/input/button';

type ToastVariant = keyof typeof toastVariants;

const variantMessages: Record<ToastVariant, { title: string; description: string; icon: 'CheckCircledIcon' | 'InfoCircledIcon' | 'ExclamationTriangleIcon' }> =
    {
        success: {
            title: 'Upload complete',
            description: 'Your files have been successfully synced to the cloud.',
            icon: 'CheckCircledIcon'
        },
        info: {
            title: 'New version available',
            description: 'Restart the application to apply the latest updates.',
            icon: 'InfoCircledIcon'
        },
        error: {
            title: 'Connection failed',
            description: 'Unable to reach the server. Please check your internet.',
            icon: 'ExclamationTriangleIcon'
        }
    };

export const Playground = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [variant, setVariant] = useState<ToastVariant>('info');
    const [triggerTimeText, setTriggerTimeText] = useState('');
    const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (openTimerRef.current) {
                clearTimeout(openTimerRef.current);
            }
        };
    }, []);

    const handleOpenToast = (nextVariant: ToastVariant) => {
        setVariant(nextVariant);
        setTriggerTimeText(new Date().toLocaleTimeString('ko-KR'));

        if (openTimerRef.current) {
            clearTimeout(openTimerRef.current);
        }

        if (isOpen) {
            setIsOpen(false);
            openTimerRef.current = setTimeout(() => setIsOpen(true), 90);
            return;
        }

        setIsOpen(true);
    };

    const message = variantMessages[variant];

    return (
        <ToastProvider>
            <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="primary" onClick={() => handleOpenToast('success')}>
                        Success Toast
                    </Button>
                    <Button variant="outline" onClick={() => handleOpenToast('info')}>
                        Info Toast
                    </Button>
                    <Button variant="secondary" onClick={() => handleOpenToast('error')}>
                        Error Toast
                    </Button>
                </div>
                <div className="text-xs text-slate-500">버튼을 클릭하면 좌측 하단에서 토스트가 나타납니다.</div>
            </div>

            <Toast variant={variant} open={isOpen} onOpenChange={setIsOpen} duration={5000}>
                <ToastIcon variant={variant}>
                    <Icon name={message.icon} />
                </ToastIcon>
                <ToastContent>
                    <ToastTitle>{message.title}</ToastTitle>
                    <ToastDescription>
                        {message.description}
                        {triggerTimeText && <span className="mt-1 block text-[10px] text-slate-500">Triggered at {triggerTimeText}</span>}
                    </ToastDescription>
                </ToastContent>
                <div className="flex items-center gap-2">
                    {variant === 'error' && <ToastAction altText="네트워크 요청 재시도">Retry</ToastAction>}
                    <ToastCloseButton>
                        <Icon name="Cross2Icon" size={14} />
                    </ToastCloseButton>
                </div>
            </Toast>

            <ToastViewport hotkey={['Escape']}/>
        </ToastProvider>
    );
};
