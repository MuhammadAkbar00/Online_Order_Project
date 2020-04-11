import Auth from './auth'

class Table {

    constructor(table) {
        this.table = table
    }

    reformatAll = async json => {
        //console.log('json', json)
        const embedded = json._embedded
        //console.log('embedded', embedded)
        const data = embedded[this.table]
        //console.log('data', data)
        return await Promise.all(
            data.map(item =>
                this.reformatOne(this.table.substring(0, this.table.length - 1), item)
            )
        )
    }

    reformatOne = async (table, json) => {
        // delete one field from an object
        const {_links, ...data} = json
        //console.log('new data', data)
        //console.log('_links', _links)
        data.id = 1 * _links.self.href.split(`${table}s/`)[1]
        //console.log('id', data)

        // find out if related records exist (FK?)
        const self = _links.self
        delete _links.self
        delete _links[table]
        //console.log('_links after', _links)

        // loop through object properties, fetching each FK

        for (const key of Object.keys(_links)) {
            const response = await Auth.fetch(
                _links[key].href.split('localhost:8080')[1]
            )
            const json = await response.json()
            //console.log('for await json', json)
            data[key] = await this.reformatOne(key, json)
        }
        data.self = self.href
        //console.log('final data', data)
        return data
    }

    getUser = query => this.getByQuery('user', query)
    getMarketing = query => this.getByQuery('marketing', query)
    getPublic = query => this.getByQuery('public', query)
    getAdmin = query => this.getByQuery('admin', query)

    getByQuery = async (role, query) => {
        // public queries use regular fetch (is attached to window object)
        const fetch = role === 'public' ? window.fetch : Auth.fetch

        // all queries except admin use custom controller based on role
        const response = await fetch(`/${role !== 'admin' ? role + '/' : ''}${this.table}/${query}`)
        const json = await response.json()
        // admin query results need reformating
        return role !== 'admin' ? json : await this.reformatAll(json)
    }

    getByQueryNoFormat = async (role, query) => {
        // public queries use regular fetch (is attached to window object)
        const fetch = role === 'public' ? window.fetch : Auth.fetch

        // all queries except admin use custom controller based on role
        const response = await fetch(`/${role !== 'admin' ? role + '/' : ''}${this.table}/${query}`)
        const json = await response.json()
        return json
    }

    getByQueryRaw = async (role, query) => {
        // public queries use regular fetch (is attached to window object)
        const fetch = role === 'public' ? window.fetch : Auth.fetch

        // all queries except admin use custom controller based on role
        const response = await fetch(`/${role !== 'admin' ? role + '/' : ''}${this.table}/${query}`)
        return response
    }

    getAll = async () => {
        const response = await Auth.fetch(`/${this.table}s`)
        const json = await response.json()
        return await this.reformatAll(json)
    }

    getOne = async (id) => {
        const response = await Auth.fetch(`/${this.table}/${id}`)
        const json = await response.json()
        return await this.reformatOne(this.table.substring(0, this.table.length - 1), json)

    }

    savePublic = async (role, data) => {
        const response = await window.fetch(
            `/${role}/${this.table}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
        const json = await response.json()
        console.log('save', json)
    }

    save = async (data) => {
        const response = await Auth.fetch(
            `/${this.table}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
        const json = await response.json()
        console.log('save', json)
        return await this.reformatOne(this.table.substring(0, this.table.length - 1), json)
    }

    saveNoFormat = async (role, data) => {
        console.log("data: ", data)
        const response = await Auth.fetch(
            `/${role + '/'}${this.table}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
        const json = await response.json()
        console.log('save', json)
        return json
    }

    deleteById = async (role, id) => {
        const response = await Auth.fetch(
            `${role}/${this.table}/${id}`,
            {
                method: 'DELETE'
            }
        )
        console.log("delete response",response)
        if (response.ok) {
            console.log("Record deleted")
        }
    }
    saveFaq = async (data) => {
        const response = await Auth.fetch(
            `/${this.table}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
        const json = await response.json()
        console.log('save', json)
        return await json
    }
}

export default {
    users: new Table("users"),
    branches: new Table("branches"),
    courses: new Table("courses"),
    menu: new Table("menu"),
    review: new Table("review"),

    orders: new Table("orders"),
    order_items: new Table("order_item"),
    products: new Table("products"),
    normal: new Table("normal"),
    analytics: new Table("analytic"),
    coupons: new Table("coupons"),
    parts: new Table("parts"),
    customs: new Table("customs"),
    custom_parts: new Table("customparts"),
    faqs: new Table("faqs"),
    adverts: new Table("adverts"),
    advertisers: new Table("advertisers")
}
