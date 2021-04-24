const API = (() => {
    if (process.env.NODE_ENV !== 'production') {
        return 'http://127.0.0.1:5000'
    } else {
        return 'https://winesource.us-west-1.elasticbeanstalk.com'
    }
})()

export default API