import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { LOADING_APP } from '../loading/app';
import { App } from '@omujs/omu';

export const prerender = true;

const apps = [LOADING_APP];

export const GET: RequestHandler = () => {
    return json({
        id: 'io.github.am230:aoikuru',
        meta: {
            name: 'あおいくる',
            note: 'あおいくる専用アプリ'
        },
        apps: Object.fromEntries(apps.map((app) => [app.id.key(), App.serialize(app)])),
    });
};
