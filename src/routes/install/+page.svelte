<script lang="ts">
    import { onMount } from "svelte";
    import { getUrl } from "../constants";

    onMount(() => {
        fetch("http://localhost:26423/index_install", {
            method: "POST",
            body: JSON.stringify({
                index: getUrl(`${location.origin}/apps.json`),
                id: "io.github.am230:aoikuru",
            }),
        });
    });
</script>
