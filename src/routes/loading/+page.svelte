<script lang="ts">
    import { OBSPermissions, OBSPlugin } from "@omujs/obs";
    import { Omu, OmuPermissions } from "@omujs/omu";
    import { AppHeader, AssetButton, Button, setGlobal } from "@omujs/ui";
    import { LOADING_APP, ASSET_APP } from "./app.js";
    import { FriesApp } from "./fries-app.js";
    import board from "./img/board.png";
    import hint from "./img/hint.png";
    import { browser } from "$app/environment";
    import { ChatPermissions } from "@omujs/chat";

    const omu = new Omu(LOADING_APP);
    const obs = OBSPlugin.create(omu);
    setGlobal({ omu, obs });
    const friesApp = new FriesApp(omu);
    const { testSignal, config, state } = friesApp;

    testSignal.listen((v: null) => {
        console.log("testSignal", v);
    });

    if (browser) {
        omu.permissions.require(
            OmuPermissions.REGISTRY_PERMISSION_ID,
            OmuPermissions.GENERATE_TOKEN_PERMISSION_ID,
            OmuPermissions.I18N_GET_LOCALES_PERMISSION_ID,
            OBSPermissions.OBS_SOURCE_CREATE_PERMISSION_ID,
            ChatPermissions.CHAT_PERMISSION_ID,
        );
        omu.start();
    }
</script>

<AppHeader app={LOADING_APP} />
<main>
    <section class="asset">
        <AssetButton
            asset={ASSET_APP}
            multiple={false}
            permissions={[
                ChatPermissions.CHAT_PERMISSION_ID,
                OmuPermissions.TABLE_PERMISSION_ID,
            ]}
        />
    </section>
    <h3>試しに投げてみる</h3>
    <section>
        <Button primary onclick={() => friesApp.test()}>
            投げる
            <i class="ti ti-arrow-up-right"></i>
        </Button>
    </section>
    <h3>看板</h3>
    <section>
        <textarea bind:value={$config.text} class="text"></textarea>
        <hr />
        <img src={board} alt="" />
    </section>
    <h3>ヒント</h3>
    <section>
        <textarea bind:value={$config.hint} class="hint"></textarea>
        <hr />
        <img src={hint} alt="" />
    </section>
    <section>
        <div>
            <h3>
                状態
                <Button
                    primary
                    onclick={() => {
                        $state = { type: "idle", start: Date.now() };
                    }}
                >
                    状態をリセット
                    <i class="ti ti-reload"></i>
                </Button>
            </h3>
            <code>
                {{
                    idle: "待機中",
                    catching: "キャッチ中",
                }[$state.type]}
            </code>
        </div>
    </section>
</main>

<style lang="scss">
    main {
        margin: 4rem 2rem;
    }

    section {
        display: flex;
        flex-direction: row;
        align-items: start;
        justify-content: space-between;
        width: 50rem;
        max-width: 100%;
        margin-bottom: 1rem;

        hr {
            width: 100%;
            height: 1px;
            margin: 0 1rem;
            margin-top: 2rem;
            margin-left: 2.5rem;
            background: var(--color-1);
            border: none;
            transform: rotate(1deg);
        }

        img {
            width: 12rem;
            margin-top: 0;
            object-fit: contain;
            transform: rotate(-1.5deg);
        }
    }

    h3 {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        margin-bottom: 0.5rem;
        color: var(--color-1);
    }

    textarea {
        margin-top: 0.5rem;
        width: 50rem;
        height: 5rem;
        background: var(--color-bg-2);
        border: 1px solid var(--color-outline);
        padding: 0.5rem;

        &:focus,
        &:hover {
            border-color: var(--color-1);
        }

        &:focus {
            outline: none;
        }
    }

    code {
        display: block;
        width: fit-content;
        margin-top: 0.5rem;
        padding: 0.5rem 0.75rem;
        color: var(--color-1);
        font-size: 0.9rem;
        border-left: 2px solid var(--color-1);
    }
</style>
