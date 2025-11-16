import { App, Identifier } from '@omujs/omu';
import thumbnail from './thumbnail.png';
import { buildMetadata, getUrl, NAMESPACE } from '../constants';

export const APP_ID = new Identifier(NAMESPACE, 'loading');

export const LOADING_APP = new App(APP_ID, {
    url: getUrl('/aoikuru/loading'),
    metadata: buildMetadata({
        locale: 'ja',
        name: {
            ja: 'あおいくる様用待機画面',
            en: 'Aoikuru Fries Waiting Screen',
        },
        description: {
            ja: 'ポテトをあげよう',
            en: 'Let\'s raise potatoes',
        },
        icon: 'ti-photo',
        image: thumbnail,
        tags: ['asset'],
    }),
});
export const ASSET_APP = new App(APP_ID.join('asset'), {
    url: getUrl('/aoikuru/loading/asset'),
    parentId: LOADING_APP,
    metadata: buildMetadata({
        locale: 'ja',
        name: {
            ja: 'あおいくる様用待機画面表示用アセット',
            en: 'Aoikuru Fries Waiting Screen Display Asset',
        },
        description: {
            ja: 'あおいくる様用待機画面アプリで使用する表示用アセットです',
            en: 'This is a display asset used in the Aoikuru Fries Waiting Screen app',
        },
        icon: 'ti-photo',
    }),
});
