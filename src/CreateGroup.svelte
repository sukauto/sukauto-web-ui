<div class="modal" class:active>
    <a class="modal-overlay" aria-label="Close" on:click="{close}"></a>
    <div class="modal-container">
        <div class="modal-header">
            <a class="btn btn-clear float-right" aria-label="Close" on:click="{close}"></a>
            <div class="modal-title h5">New group</div>
        </div>
        <div class="modal-body">
            <div class="content">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="form-label" for="newName">Group name</label>
                        <input class="form-input" type="text" id="newName" bind:value="{name}"
                               placeholder="Group name">
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
    import {simpleWrapperAPI} from "./utils";
    import {shouldUpdateGroups} from './stores'
    import * as API from './api';

    export let active = false;

    const baseURL = process.env.BASE_URL;
    const dispatch = createEventDispatcher();
    let name = '';
    let creating = false;

    function create() {
        creating = true;
        API.createGroup(name).then(() => {
            shouldUpdateGroups.update((v) => !v);
            close();
        }).finally(() => creating = false)

    }

    function close() {
        dispatch('done', false);
    }


</script>