<div class="dropdown">
    <a href="#" class="btn btn-link btn-action dropdown-toggle" class:disabled="{updating}" tabindex="0">
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

    const dispatch = createEventDispatcher();

    export let service = {};
    export let updating = false;
    const baseURL = process.env.BASE_URL;

    function restart() {
        dispatch("begin", true);
        fetch(baseURL + "monitor/restart/" + encodeURIComponent(service.name) + "?nocache=" + Date.now(), {
            method: "GET",
            credentials: 'include'
        }).then((data) => {
            if (!data.ok) {
                return;
            }
            dispatch("success");
        }).catch(() => {
            dispatch("fail", false);
        })
    }

    function forget() {
        dispatch("begin", true);
        fetch(baseURL + "monitor/forget/" + encodeURIComponent(service.name) + "?nocache=" + Date.now(), {
            method: "GET",
            credentials: 'include'
        }).then((data) => {
            if (!data.ok) {
                return;
            }
            dispatch("success");
        }).catch(() => {
            dispatch("fail", false);
        })
    }

    function update() {
        dispatch("begin", true);
        fetch(baseURL + "monitor/update/" + encodeURIComponent(service.name) + "?nocache=" + Date.now(), {
            method: "GET",
            credentials: 'include'
        }).then((data) => {
            if (!data.ok) {
                return;
            }
            dispatch("success");
        }).catch(() => {
            dispatch("fail", false);
        })
    }
</script>