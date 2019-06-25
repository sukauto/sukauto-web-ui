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
                           on:done="{()=>showCreateService = false}"></CreateService>
            <AttachService active="{showAttaching}" on:done="{()=> showAttaching = false}"></AttachService>
            <CreateGroup active="{showCreateGroup}" on:done="{()=> showCreateGroup = false}"></CreateGroup>
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
                    <li>
                        <a href="#" on:click|preventDefault="{()=>showCreateGroup=true}">new group</a>
                    </li>
                </ul>
            </div>
            {#if $updating}
                <div class="loading loading-lg"></div>
            {/if}
            <Services services="{$services}"></Services>
        </div>

    </div>
    {#each $groups as group}

        <div class="columns">
            <div class="column col-12">
                <Group group="{group}"></Group>
            </div>
        </div>
    {/each}
</div>
<script>
    import CreateService from './CreateService.svelte'
    import AttachService from './AttachService.svelte'
    import CreateGroup from './CreateGroup.svelte'
    import Actions from './Actions.svelte'
    import Services from './Services.svelte'
    import Controls from './lib/Controls.svelte'
    import Group from './Group.svelte'
    import * as API from './api';
    import {shouldUpdateServices, shouldUpdateGroups, groups, services, updating} from './stores'

    const baseURL = API.baseURL;
    let groupServices = {};
    let showCreateService = false;
    let showCreateGroup = false;
    let showAttaching = false;

    function updateServices() {
        updating.set(true);
        API.statuses().then((list) => services.set(list)).finally(() => updating.set(false))
    }

    function updateGroups() {
        updating.set(true);
        API.groups().then((list) => groups.set(list)).finally(() => updating.set(false));
    }

    shouldUpdateServices.subscribe(() => {
        updateServices()
    });

    shouldUpdateGroups.subscribe(() => {
        updateGroups();
    });

    updateServices();
    updateGroups()

</script>

<style>

</style>