export function simpleWrapperAPI(apiMethod, dispatcher) {
    return () => {
        dispatcher('begin');
        return apiMethod().then(() => dispatcher('success')).catch((e) => dispatcher('fail', e)).finally(() => dispatcher('done'))
    }
}