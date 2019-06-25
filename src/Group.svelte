<h3 class="m-1">
    {group}
</h3>
{#if updating}
    <div class="loading"></div>
{/if}
<Controls disabled="{updating}"
          on:delete="{removeGroup}"
          on:stop="{stop}"
          on:start="{start}"
          on:restart="{restart}"
          on:update="{update}"
></Controls>
<GroupManagement group="{group}" members="{groupServices}" on:created="{loadMembers}"></GroupManagement>
<table class="table">
    {#each groupServices as service, id(service)}
        <tr>
            <td>{service}</td>
            <td>
                <button class="btn btn-action" on:click="{() => leave(service)}">
                    <i class="icon icon-delete"></i>
                </button>
            </td>
        </tr>
    {/each}
</table>
<script>
    import Controls from './lib/Controls.svelte'
    import Services from './Services.svelte'
    import GroupManagement from './GroupManagment.svelte'
    import * as API from './api'
    import {shouldUpdateGroups, shouldUpdateServices} from './stores'

    export let group = '';
    let updating = false;
    let groupServices = [];

    function loadMembers() {
        API.members(group).then((data) => {
            groupServices = data;
        })
    }

    function removeGroup() {
        updating = true;
        API.removeGroup(group).then(() => {
            shouldUpdateGroups.update((v) => !v)
        }).finally(() => updating = false)
    }

    function stop() {
        updating = true;
        Promise.all(groupServices.map((member) => {
            return API.stop(member)
        })).then(() => {
            shouldUpdateServices.update((v) => !v)
        }).finally(() => updating = false)
    }

    function start() {
        updating = true;
        Promise.all(groupServices.map((member) => {
            return API.start(member)
        })).then(() => {
            shouldUpdateServices.update((v) => !v)
        }).finally(() => updating = false)
    }

    function restart() {
        updating = true;
        Promise.all(groupServices.map((member) => {
            return API.restart(member)
        })).then(() => {
            shouldUpdateServices.update((v) => !v)
        }).finally(() => updating = false)
    }

    function update() {
        updating = true;
        Promise.all(groupServices.map((member) => {
            return API.update(member)
        })).then(() => {
            shouldUpdateServices.update((v) => !v)
        }).finally(() => updating = false)
    }

    function leave(name) {
        updating = true;
        API.leave(group, name).then(() => {
            loadMembers()
        }).finally(() => updating = false)
    }

    loadMembers()
</script>