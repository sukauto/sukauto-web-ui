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
    import {simpleWrapperAPI} from "./utils";
    import * as API from './api';

    const dispatch = createEventDispatcher();

    export let service = {};
    export let updating = false;

    const restart = simpleWrapperAPI(() => API.restart(service.name), dispatch);
    const forget = simpleWrapperAPI(() => API.forget(service.name), dispatch);
    const update = simpleWrapperAPI(() => API.update(service.name), dispatch);
</script>