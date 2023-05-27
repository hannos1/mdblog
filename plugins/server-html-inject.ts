export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            htmlInject:(html: string) => {
                return html
            }
        }
    }
})