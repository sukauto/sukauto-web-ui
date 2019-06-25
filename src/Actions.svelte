<div class="dropdown">
    <a class="btn btn-link btn-action dropdown-toggle" class:disabled="{updating}" tabindex="0">
        <i class="icon icon-menu"></i>
    </a>
    <ul class="menu">
        <li class="nav-item">
            <a href="#" on:click|preventDefault="{restart}">
                <i class="icon icon-refresh"></i> restart
            </a>
        </li>
        <li>
            <a href="#" on:click|preventDefault="{update}">
                <i class="icon icon-upload"></i> update
            </a>
        </li>
        <li>
            <a href="#" on:click|preventDefault="{forget}">
                <i class="icon icon-delete"></i> remove
            </a>
        </li>
    </ul>
</div>
<script>
    import {createEventDispatcher} from 'svelte';
    import * as API from './api';
    import {shouldUpdateServices} from './stores'

    const dispatch = createEventDispatcher();

    export let service = {};
    let updating = false;

    function restart() {
        updating = true;
        API.restart(service.name).then(() => shouldUpdateServices.update((v) => !v)).finally(() => updating = false)
    }

    function forget() {
        updating = true;
        API.forget(service.name).then(() => shouldUpdateServices.update((v) => !v)).finally(() => updating = false)
    }

    function update() {
        updating = true;
        API.update(service.name).then(() => shouldUpdateServices.update((v) => !v)).finally(() => updating = false)
    }
</script>