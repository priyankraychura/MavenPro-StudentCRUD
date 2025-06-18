const localstorageService = {
    setItem: (key, value) => {
        const newValue = JSON.stringify(value)
        localStorage.setItem(key, newValue)
    },

    getItem: (key) => {
         let data = localStorage.getItem(key)
         return data ? JSON.parse(data) : []
    }
}

export default localstorageService;