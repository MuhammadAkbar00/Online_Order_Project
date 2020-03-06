import Auth from '../auth.js'
import { useHistory } from "react-router-dom";

export default () => {

    useHistory().push("/")
    Auth.logout()

    return null

}
