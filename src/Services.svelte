<table class="table">
    <thead>
    <tr>
        <th>name</th>
        <th>status</th>
        <th>control</th>
    </tr>
    </thead>
    <tbody>
    {#each services as service, i (service.name)}
        <tr>
            <td>
                <Actions service="{service}">
                </Actions>
                <a href="{baseURL}monitor/log/{service.name}">{service.name}</a>
            </td>
            <td
                    class:text-light="{service.status === 'dead'}"
                    class:text-success="{service.status ==='running'}"
                    class:text-error="{service.status === 'failed' }"
            >
                <span class="p-1" class:bg-dark="{service.status === 'dead'}">{service.status}</span>
            </td>
        <td>
        {#if service.status !== 'dead'}
        <button class="btn tn-action btn-primary"
                class:disabled="{$updating}"
                on:click="{()=> stop(service)}">
            <i class="icon icon-stop"></i> stop
        </button>
    {:else}
    <button class="btn tn-action"
            class:disabled="{$updating}"
            on:click="{()=>start(service)}">
        <i class="icon icon-arrow-up"></i> start
    </button>
    {/if}

    </td>
    </tr>
    {/each}
    </tbody>
</table>

<script>
    import Actions from './Actions.svelte'
    import {createEventDispatcher} from 'svelte';
    import * as API from './api';
    import {updating, shouldUpdateServices} from './stores'

    export let services = [];

    const baseURL = API.baseURL;
    const dispatch = createEventDispatcher();

    function beginUpdating() {
        dispatch('begin')
        updating.set(true);
    }

    function commitUpdating() {
        dispatch('success');
        updating.set(false);
        shouldUpdateServices.update((v) => !v);
    }

    function failedUpdating() {
        dispatch('fail')
        updating.set(false);
    }

    function start(srv) {
        beginUpdating();
        API.start(srv.name).then(() => commitUpdating()).catch(() => failedUpdating());
    }

    function stop(srv) {
        beginUpdating();
        API.stop(srv.name).then(() => commitUpdating()).catch(() => failedUpdating());
    }
</script>