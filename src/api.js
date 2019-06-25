export const baseURL = process.env.BASE_URL;

export function attach(name) {
    return fetch(baseURL + "monitor/attach", {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({name: name}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((data) => {
        if (!data.ok) {
            throw new Error(data.statusText);
        }
    })

}

export function update(name) {
    return fetch(baseURL + "monitor/update/" + encodeURIComponent(name) + "?nocache=" + Date.now(), {
        method: "GET",
        credentials: 'include'
    }).then((data) => {
        if (!data.ok) {
            throw new Error(data.statusText);
        }
    })
}

export function forget(name) {
    return fetch(baseURL + "monitor/forget/" + encodeURIComponent(name) + "?nocache=" + Date.now(), {
        method: "GET",
        credentials: 'include'
    }).then((data) => {
        if (!data.ok) {
            throw new Error(data.statusText);
        }
    })
}

export function restart(name) {
    return fetch(baseURL + "monitor/restart/" + encodeURIComponent(name) + "?nocache=" + Date.now(), {
        method: "GET",
        credentials: 'include'
    }).then((data) => {
        if (!data.ok) {
            throw new Error(data.statusText);
        }
    })
}

export function create(newService) {
    return fetch(baseURL + "monitor/create", {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(newService),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((data) => {
        if (!data.ok) {
            throw new Error(data.statusText)
        }
    });
}

export function start(name) {
    return fetch(baseURL + "monitor/run/" + encodeURIComponent(name) + "?nocache=" + Date.now(), {
        method: "GET",
        credentials: 'include'
    }).then((data) => {
        if (!data.ok) {
            throw new Error(data.statusText)
        }
    })
}

export function stop(name) {
    return fetch(baseURL + "monitor/stop/" + encodeURIComponent(name) + "?nocache=" + Date.now(), {
        method: "GET",
        credentials: 'include'
    }).then((data) => {
        if (!data.ok) {
            throw new Error(data.statusText)
        }
    })
}

export function statuses() {
    return fetch(baseURL + "monitor/status?nocache=" + Date.now(), {
        method: "GET",
        credentials: 'include',
    }).then((data) => {
        if (!data.ok) {
            return new Error(data.statusText);
        }
        return data.json()
    }).then((info) => {
        return info.services || [];
    })
}


// -------- groups

export function groups() {
    return fetch(baseURL + "monitor/group/?nocache=" + Date.now(), {
        method: "GET",
        credentials: 'include',
    }).then((data) => {
        if (!data.ok) {
            return new Error(data.statusText);
        }
        return data.json()
    }).then((info) => {
        return info || [];
    })
}

export function members(group) {
    return fetch(baseURL + "monitor/group/" + encodeURIComponent(group) + "?nocache=" + Date.now(), {
        method: "GET",
        credentials: 'include',
    }).then((data) => {
        if (!data.ok) {
            return new Error(data.statusText);
        }
        return data.json()
    }).then((info) => {
        return info || [];
    })
}

export function createGroup(groupName) {
    return fetch(baseURL + "monitor/group/" + encodeURIComponent(groupName), {
        method: "POST",
        credentials: 'include',
    }).then((data) => {
        if (!data.ok) {
            throw new Error(data.statusText)
        }
    });
}

export function join(groupName, serviceName) {
    return fetch(baseURL + "monitor/group/" + encodeURIComponent(groupName) + "/" + encodeURIComponent(serviceName), {
        method: "POST",
        credentials: 'include',
    }).then((data) => {
        if (!data.ok) {
            throw new Error(data.statusText)
        }
    });
}

export function leave(groupName, serviceName) {
    return fetch(baseURL + "monitor/group/" + encodeURIComponent(groupName) + "/" + encodeURIComponent(serviceName), {
        method: "DELETE",
        credentials: 'include',
    }).then((data) => {
        if (!data.ok) {
            throw new Error(data.statusText)
        }
    });
}

export function removeGroup(groupName) {
    return fetch(baseURL + "monitor/group/" + encodeURIComponent(groupName), {
        method: "DELETE",
        credentials: 'include',
    }).then((data) => {
        if (!data.ok) {
            throw new Error(data.statusText)
        }
    });
}