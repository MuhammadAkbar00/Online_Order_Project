import db from "../db";

export default class pageRecord {
    constructor(pagename,pid,username) {
        this.pagename = pagename
        this.productId = pid
        this.date = ""
        this.time = ""
        this.username = username
        this.saveRecord()
    }

    saveRecord = async () => {
        this.date = "2020/2/2"
        this.time = 1200
        await db.analytics.save({ id: "", pagename: this.pagename, product_id: this.productId, date: this.date, time: this.time, username: this.username })
        console.log("SAVEDDDDDDDD")
    }
}