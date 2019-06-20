<div class="hero hero-sm bg-dark">
    <div class="hero-body">
        <h1>System services control</h1>
        <p>Create and control system-wide or user-wide services</p>
    </div>
</div>
<div class="container grid-xl">

<div class="columns">
    <div class="column col-4 col-lg-12">
        <form class="form-horizontal">
            <div class="form-group">
                <label class="form-label" for="newName">Service name</label>
                <input class="form-input" type="text" id="newName" bind:value="{newService.name}"
                       placeholder="Service name">
            </div>
            <div class="form-group">
                <label class="form-label" for="newCommand">Command</label>
                <input class="form-input" type="text" id="newCommand" bind:value="{newService.command}"
                       placeholder="Command">
            </div>
            <div class="form-group">
                <h3>Environment</h3>
                <table class="table">
                    {#each environment as env}
                        <tr>
                            <td>{env.key}</td>
                            <td>{env.value}</td>
                            <td>
                                <button type="button" class="btn btn-action" on:click="{()=> delEnv(env.key)}"><i
                                        class="icon icon-delete"></i></button>
                            </td>
                        </tr>
                    {/each}
                    <tr>
                        <td><input class="form-input" type="text" bind:value="{envKey}" placeholder="Key"></td>
                        <td><input class="form-input" type="text" bind:value="{envValue}" placeholder="Value"></td>
                        <td>
                            <button type="button" class="btn btn-action" on:click="{addEnv}"><i
                                    class="icon icon-plus"></i></button>
                        </td>
                    </tr>
                </table>
            </div>

            <button class="btn tn-action"
                    type="button"
                    class:loading="{creating}"
                    on:click="{()=>create()}">
                <i class="icon icon-plus"></i> create
            </button>
        </form>
    </div>
<div class="column col-8 col-lg-12">
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
    let baseURL = BASE_URL;
    let services = [];
    let startingService = {};
    let stoppingService = {};
    let restartingService = {};
    let updating = false;
    let creating = false;
    let envKey = '';
    let envValue = '';
    let newService = {
        name: '',
        command: '',
        environment: {}
    };
    let environment = [];

    function delEnv(key) {
        environment = environment.filter((e) => e.key !== key);
    }

    function addEnv() {
        environment.push({key: envKey, value: envValue});
        environment = environment;
        envValue = '';
        envKey = '';
    }

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

    function create() {
        creating = true;
        let env = {};
        environment.forEach((e) => {
            env[e.key] = e.value;
        })
        newService.environment = env;
        fetch(baseURL + "monitor/create", {
            method: "POST",
            credentials: 'include',
            body: JSON.stringify(newService),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => {
            return updateServices()
        }).finally(() => {
            newService.command = '';
            newService.name = '';
            newService.environment = {};
            environment = [];
            creating = false;
        })
    }

    updateServices()

</script>

<style>

</style>