<script lang="ts">
    import "../app.scss";
    import '@tabler/icons-webfont/dist/tabler-icons.scss';
    import favicon from "$lib/assets/favicon.svg";
    import { Theme } from "@omujs/ui";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<Theme />
{@render children()}
