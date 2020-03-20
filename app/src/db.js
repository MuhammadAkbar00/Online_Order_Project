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
        const { _links, ...data } = json
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
        console.log('getByQuery', role, json)

        // admin query results need reformating
        return role !== 'admin' ? json : await this.reformatAll(json)
    }

    getAll = async () => {
        const response = await Auth.fetch(`/${this.table}`)
        const json = await response.json()
        console.log('getAll', json)
        return await this.reformatAll(json)
    }

    getOne = async (id) => {
        const response = await Auth.fetch(`/${this.table}/${id}`)
        const json = await response.json()
        console.log('getOne', json)
        return await this.reformatOne(this.table.substring(0, this.table.length - 1), json)

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

    deleteById = async (id) => {
        const response = await Auth.fetch(
            `/${this.table}/${id}`,
            {
                method: 'DELETE'
            }
        )
        if (response.ok) {
            console.log("Record deleted")
        }
    }
}

export default {
    users: new Table("users"),
    branches: new Table("branches"),
    courses: new Table("courses"),
    registrations: new Table("registrations")

}
