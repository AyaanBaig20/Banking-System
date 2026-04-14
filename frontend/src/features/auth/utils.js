import {toast} from "react-toastify"

export function handlesuccess(msg) {
    toast.success(msg,{
        position:"top-center"
    })
}
export function handlefaliure(msg) {
    toast.error(msg,{
        position:"top-center"
    })
}