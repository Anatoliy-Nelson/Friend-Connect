import axios from 'axios'
import { Dispatch } from 'redux'
import { setError } from 'redux/appReducer'

export const helpersError = (e: unknown, dispatch: Dispatch) => {
    let errorMessage = 'Some error occurred'

    if (axios.isAxiosError(e)) {
        errorMessage = e.response?.data?.message || e?.message || errorMessage
    } else if (e instanceof Error) {
        errorMessage = `Native error: ${e.message}`
    } else {
        errorMessage = JSON.stringify(e)
    }
    dispatch(setError(errorMessage))
    console.log(errorMessage)
}