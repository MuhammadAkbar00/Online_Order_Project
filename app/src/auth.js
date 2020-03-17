class Auth {

    constructor() {
        this.user = null
    }

    init = setFn => {
        this.setFn = setFn
    }

    authenticate = async (type, username, password) => {
        const response = await fetch(
            `${type.toLowerCase()}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password
                })
            }
        )
        if (response.ok) {
            this.user = await response.json()
            this.setFn(this.isLoggedIn())
            console.log('user', this.user)
        } else {
            console.log('response not ok', response)
        }
    }

    logout = () => {
        this.user = null
        this.setFn(this.isLoggedIn())
    }

    isLoggedIn = () => this.user !== null

    isUser = () => this.user && this.user.role === "ROLE_USER"
    isAdmin = () => this.user && this.user.role === "ROLE_ADMIN"
    isMarketing = () => this.user && this.user.role === "ROLE_MARKETING"

    getUserRole = () => this.user.role

    fetch = (url, options) => {
        if (this.user) {
            options = options || {}
            options.headers = options.headers || {}
            options.headers.Authorization = `Bearer ${this.user.token}`
        } else {
            console.log('Error: calling Auth fetch but not logged in', this.user.token)
        }
        return fetch(url, options) // real fetch
    }

}

export default new Auth()