import Link from 'next/link';

export default function Page() {
    return (
        <div className="space-y-6">
            <div className="rounded-2xl border bg-white p-6">
                <div className="text-muted-foreground text-xs font-medium tracking-wide">SHOWCASE</div>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight">Stitch 기반 검토 화면</h1>
                <p className="text-muted-foreground mt-2 text-sm">Stitch 결과를 `@design-system` 컴포넌트로 재조립한 화면들을 확인합니다.</p>
            </div>
            <Link href="/design-system/showcase/user-profile-form" className="block rounded-2xl border bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
                <div className="text-sm font-semibold">user-profile-form</div>
                <div className="text-muted-foreground mt-1 text-xs">views/design-system/showcase/user-profile-form.tsx</div>
            </Link>
        </div>
    );
}
