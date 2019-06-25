import {writable} from 'svelte/store'


export const updating = writable(false);
export const groups = writable([]);
export const services = writable([]);
export const shouldUpdateServices = writable(false);
export const shouldUpdateGroups = writable(false);
