<div class="hero hero-sm bg-dark">
    <div class="hero-body">
        <h1>System services control</h1>
        <p>Create and control system-wide or user-wide services</p>
    </div>
</div>
<div class="container grid-xl">

<div class="columns">
<div class="column col-12">
    <CreateService label="new service" active="{showCreateService}" on:done="{completeCreating}"></CreateService>
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
    {#each services as service}
    <tr>
        <td>
            <a href="{baseURL}monitor/log/{service.name}">{service.name}</a>
        </td>
        <td>{service.status}</td>
    <td>
        {#if service.status !== 'dead'}
    <button class="btn tn-action btn-primary"
            class:loading="{stoppingService[service.name]}"
            on:click="{()=>stop(service.name)}">
        <i class="icon icon-stop"></i> stop
    </button>
{:else}
<button class="btn tn-action"
        class:loading="{startingService[service.name]}"
        on:click="{()=>start(service.name)}">
        <i class="icon icon-arrow-up"></i> start
    </button>
    {/if}
        <button class="btn tn-action"
                class:loading="{restartingService[service.name]}"
                on:click="{()=>restart(service.name)}">
            <i class="icon icon-refresh"></i> restart
        </button>
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

    const baseURL = process.env.BASE_URL;

    let services = [];
    let startingService = {};
    let stoppingService = {};
    let restartingService = {};
    let updating = false;
    let showCreateService = false;
    let showAttaching = false;


    function updateServices() {
        updating = true;
        fetch(baseURL + "monitor/status?nocache=" + Date.now(), {
            method: "GET",
            credentials: 'include',
        }).then((data) => {
            if (!data.ok) {
                return {services: []};
            }
            return data.json()
        }).then((info) => {
            services = info.services;
        }).finally(() => {
            updating = false;
        })
    }

    function restart(name) {
        restartingService[name] = true;
        fetch(baseURL + "monitor/restart/" + encodeURIComponent(name) + "?nocache=" + Date.now(), {
            method: "GET",
            credentials: 'include'
        }).then((data) => {
            if (!data.ok) {
                return;
            }
            return updateServices();
        }).finally(() => {
            restartingService[name] = false;
        })
    }

    function start(name) {
        startingService[name] = true;
        fetch(baseURL + "monitor/run/" + encodeURIComponent(name) + "?nocache=" + Date.now(), {
            method: "GET",
            credentials: 'include'
        }).then((data) => {
            if (!data.ok) {
                return;
            }
            return updateServices();
        }).finally(() => {
            startingService[name] = false;
        })
    }

    function stop(name) {
        stoppingService[name] = true;

        fetch(baseURL + "monitor/stop/" + encodeURIComponent(name) + "?nocache=" + Date.now(), {
            method: "GET",
            credentials: 'include'
        }).then((data) => {
            if (!data.ok) {
                return;
            }
            return updateServices();
        }).finally(() => {
            stoppingService[name] = false;
        })
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