const Logger = {
    info: (message: string, data?: any) => {
        console.log(`INFO - ${message}\n Data - ${data}`)
    },
    error: (message: string, data?: any) => {
        console.log(`ERROR - ${message}\n Data - ${data}`)
    }
}

export default Logger;