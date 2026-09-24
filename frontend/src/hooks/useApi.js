import { useState } from "react"

const API_URL = "http://localhost:8000/api"

export function useApi() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = async (endpoint, options={}) => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                }
            })

            if(!response.ok) {
                throw new Error(`API error: ${response.status}`)
            }

            return await response.json()
        } catch(error) {
            setError(error.message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {
        request,
        loading,
        error
    }
}