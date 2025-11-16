import { dev } from "$app/environment";
import type { AppMetadata } from "@omujs/omu";
import type { LocalizedText } from '@omujs/omu/localization';

export const NAMESPACE = 'io.github.am230'

export const ORIGIN = dev ? 'http://localhost:5137' : `http://${NAMESPACE}`;
export const APP_INDEX = ORIGIN + '/apps.json';

export function getUrl(path: string): string {
    const url = new URL(path, ORIGIN);
    return url.href;
}

export function buildMetadata(metadata: AppMetadata): AppMetadata {
    if (metadata.icon) {
        metadata.icon = mapLocalized(metadata.icon, (value) => value.startsWith('ti-') ? value : getUrl(value));
    }
    if (metadata.image) {
        metadata.image = mapLocalized(metadata.image, getUrl);
    }
    return metadata;
}

function mapLocalized(value: LocalizedText, fn: (value: string, locale?: string) => string): LocalizedText {
    if (typeof value === 'string') {
        return fn(value);
    }
    return Object.fromEntries(Object.entries(value).map(([key, value]) => [key, fn(value, key)]));
}