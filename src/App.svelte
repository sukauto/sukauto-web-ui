<div class="hero hero-sm bg-dark">
    <div class="hero-body">
        <h1>System services control</h1>
        <p>Create and control system-wide or user-wide services</p>
    </div>
</div>
<div class="container grid-xl">

    <div class="columns">
        <div class="column col-12">
            <CreateService label="new service" active="{showCreateService}"
                           on:done="{completeCreating}"></CreateService>
            <AttachService active="{showAttaching}" on:done="{completeAttaching}"></AttachService>
            <div class="dropdown">
                <a href="#" class="btn btn-link dropdown-toggle" tabindex="0">
                    create <i class="icon icon-plus"></i>
                </a>
  <!-- menu component -->
                <ul class="menu">
                    <li class="nav-item">
                        <a href="#" on:click|preventDefault="{()=>showCreateService=true}">new service</a>
                    </li>
                    <li>
                        <a href="#" on:click|preventDefault="{()=>showAttaching=true}">attach</a>
                    </li>
                </ul>
            </div>
            {#if updating}
                <div class="loading loading-lg"></div>
            {/if}
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
                            <Actions service="{service}" updating="{updating}"
                                     on:begin="{()=> updating = true}"
                                     on:success="{updateServices}"
                                     on:fail="{()=> updating = false}">
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
                            class:disabled="{updating}"
                            on:click="{()=> stop(service)}">
                        <i class="icon icon-stop"></i> stop
                    </button>
                {:else}
                <button class="btn tn-action"
                        class:disabled="{updating}"
                        on:click="{()=>start(service)}">
                    <i class="icon icon-arrow-up"></i> start
                </button>
                {/if}

                </td>
                </tr>
                {/each}
                </tbody>
            </table>
        </div>

    </div>
</div>
<script>
    import CreateService from './CreateService.svelte'
    import AttachService from './AttachService.svelte'
    import Actions from './Actions.svelte'
    import * as API from './api';

    const baseURL = API.baseURL;
    let services = [];
    let updating = false;
    let showCreateService = false;
    let showAttaching = false;

    function updateServices() {
        updating = true;
        API.statuses().then((list) => services = list).finally(() => updating = false);
    }


    function start(srv) {
        updating = true;
        API.start(srv.name).then(() => updateServices()).catch(() => updating = false);
    }

    function stop(srv) {
        updating = true;
        API.stop(srv.name).then(() => updateServices()).catch(() => updating = false);
    }

    function completeCreating(event) {
        if (event.detail) updateServices();
        showCreateService = false;
    }

    function completeAttaching(event) {
        if (event.detail) updateServices();
        showAttaching = false;
    }

    updateServices()

</script>

<style>

</style>