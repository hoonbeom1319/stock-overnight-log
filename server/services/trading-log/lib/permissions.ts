import 'server-only';

const DEFAULT_ADMIN_EMAILS = ['hoonbeom1319@gmail.com'];

function normalizeEmail(email: string) {
    return email.trim().toLowerCase();
}

function resolveAdminEmails() {
    const configured = process.env.TRADING_LOG_ADMIN_EMAILS;
    if (!configured) {
        return DEFAULT_ADMIN_EMAILS.map(normalizeEmail);
    }

    const emails = configured
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
        .map(normalizeEmail);

    return emails.length ? emails : DEFAULT_ADMIN_EMAILS.map(normalizeEmail);
}

export function isTradingLogAdmin(email?: string | null) {
    if (!email) return false;

    const normalized = normalizeEmail(email);
    return resolveAdminEmails().includes(normalized);
}
