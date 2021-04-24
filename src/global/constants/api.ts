const API = (() => {
    if (process.env.NODE_ENV !== 'production') {
        return 'http://127.0.0.1:5000'
    } else {
        return 'https://dummywinesbackend.herokuapp.com'
    }
})()

export default API