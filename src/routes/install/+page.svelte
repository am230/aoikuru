<script lang="ts">
    import { Button } from "@omujs/ui";
</script>

<main>
    <p>アプリをインストールするには以下のリンクから提供元を追加してください</p>
    <Button
        onclick={() => {
            window.open(
                "http://localhost:26423/index/install?index_url=https://am230.github.io/aoikuru/apps.json",
            );
        }}
        primary
    >
        提供元を追加
</Button>
</main>

<style lang="scss">
    main {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--color-1);
        font-weight: 700;
        background: var(--color-bg-1);
    }

    p {
        margin-bottom: 1rem;
    }
</style>
