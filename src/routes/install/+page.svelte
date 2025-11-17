<script lang="ts">
    import { Button } from "@omujs/ui";
    import { onMount } from "svelte";
    import { getUrl } from "../constants";

    let installState:
        | {
              type: "loading";
          }
        | {
              type: "installing";
              hostname: string;
          }
        | {
              type: "installed";
          }
        | {
              type: "failed";
              message: string;
          } = $state({ type: "loading" });

    async function install() {
        installState = { type: "installing", hostname: location.hostname };
        try {
            const resp = await fetch("http://localhost:26423/index_install", {
                method: "POST",
                body: JSON.stringify({
                    index: getUrl(`/aoikuru/apps.json`),
                    id: "io.github.am230:aoikuru",
                }),
            });
            if (!resp.ok) {
                installState = { type: "failed", message: resp.statusText };
            } else {
                installState = { type: "installed" };
            }
        } catch (e) {
            installState = {
                type: "failed",
                message: "起動していない可能性があります",
            };
        }
    }

    onMount(install);
</script>

<main>
    <div class="card">
        {#if installState.type === "installing"}
            <h2>管理画面から提供元を追加してください</h2>
            <small>
                {installState.hostname}
                からの提供であることを確認してください
            </small>
        {:else if installState.type === "failed"}
            <h2>追加に失敗しました</h2>
            <small>メッセージ: {installState.message}</small>
            <Button primary onclick={install}>もう一度試す</Button>
        {:else if installState.type === "installed"}
            <h2>追加が完了しました！</h2>
            <small>このタブを閉じる事ができます</small>
        {/if}
    </div>
</main>

<style lang="scss">
    main {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: var(--color-1);
        font-weight: 700;
        background: var(--color-bg-1);
    }

    h2 {
        font-size: 1.5rem;
        border-bottom: 2px solid var(--color-1);
    }

    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background: var(--color-bg-2);
        padding: 4rem 6rem;
    }

    small {
        font-size: 1rem;
        color: var(--color-text);
    }
</style>
