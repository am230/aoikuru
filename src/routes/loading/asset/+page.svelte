<script lang="ts">
    import '@fontsource/rocknroll-one';
    import { ASSET_APP } from '../app.js';
    import AssetApp from './AssetApp.svelte';
    import { AssetPage } from '@omujs/ui';
</script>

<AssetPage asset={ASSET_APP} single let:omu>
    <AssetApp {omu} />
</AssetPage>
