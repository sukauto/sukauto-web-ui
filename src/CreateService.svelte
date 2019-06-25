<div class="modal" class:active>
    <a class="modal-overlay" aria-label="Close" on:click="{close}"></a>
    <div class="modal-container">
        <div class="modal-header">
            <a class="btn btn-clear float-right" aria-label="Close" on:click="{close}"></a>
            <div class="modal-title h5">New service</div>
        </div>
        <div class="modal-body">
            <div class="content">
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
                        <label class="form-label">Environment</label>
                        <table class="table">
                            {#each environment as env}
                                <tr>
                                    <td>{env.key}</td>
                                    <td>{env.value}</td>
                                    <td>
                                        <button type="button" class="btn btn-action"
                                                on:click="{()=> delEnv(env.key)}">
                                            <i class="icon icon-delete"></i></button>
                                    </td>
                                </tr>
                            {/each}
                            <tr>
                                <td>
                                    <input class="form-input" type="text" bind:value="{envKey}" placeholder="Key">
                                </td>
                                <td>
                                    <input class="form-input" type="text" bind:value="{envValue}"
                                           placeholder="Value">
                                </td>
                                <td>
                                    <button type="button" class="btn btn-action" on:click="{addEnv}">
                                        <i class="icon icon-plus"></i>
                                    </button>
                                </td>
                            </tr>
                        </table>

                    </div>


                </form>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn tn-action"
                    type="button"
                    class:loading="{creating}"
                    on:click="{()=>create()}">
                <i class="icon icon-plus"></i> create
            </button>
        </div>
    </div>
</div>

<script>
    import {createEventDispatcher} from 'svelte';
    import * as API from './api';
    import {shouldUpdateServices} from "./stores";

    const dispatch = createEventDispatcher();

    export let label = "create";
    export let active = false;
    let newService = {
        name: '',
        command: '',
        environment: {}
    };
    let envKey = '';
    let envValue = '';
    let environment = [];
    let creating = false;

    function delEnv(key) {
        environment = environment.filter((e) => e.key !== key);
    }

    function addEnv() {
        environment.push({key: envKey, value: envValue});
        environment = environment;
        envValue = '';
        envKey = '';
    }

    function create() {
        creating = true;
        let env = {};
        environment.forEach((e) => {
            env[e.key] = e.value;
        });
        newService.environment = env;
        API.create(newService).then(() => {
            shouldUpdateServices.update((v) => !v);
            close()
        }).catch((e) => dispatch('done', false)).finally(() => {
            newService.command = '';
            newService.name = '';
            newService.environment = {};
            environment = [];
            creating = false;
        });
    }

    function close() {
        dispatch('done', false);
    }

</script>