// ~/src/hooks/useDelay.ts
import { useState, useEffect } from 'react'

const useDelay = (isActive: boolean = false, delayMs: number = 500) => {
    const [shouldShow, setShouldShow] = useState(isActive)

    useEffect(() => {
        let timer: NodeJS.Timeout

        if (isActive) {
            setShouldShow(true)
        } else {
            timer = setTimeout(() => {
                setShouldShow(false)
            }, delayMs)
        }

        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [isActive, delayMs])

    return shouldShow
}

export default useDelay
