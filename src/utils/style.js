import { DESIGN_HEIGHT, DESIGN_WIDTH, SCALE_MIN_WIDTH } from '@/constants'

/**
 * 判断屏幕高度是否小于设计稿高度，是的话，position 改为 fixed
 */
export const dynamicPosition = () => {
    return window.innerHeight < DESIGN_HEIGHT
        ? { position: 'fixed' }
        : { position: 'absolute' }
}

export const getScaleRatio = () => {
    return {
        ratio: (window.innerWidth / DESIGN_WIDTH) < (SCALE_MIN_WIDTH / DESIGN_WIDTH) ? SCALE_MIN_WIDTH / DESIGN_WIDTH : window.innerWidth / DESIGN_WIDTH,
        width: window.innerWidth,
        height: window.innerHeight,
        actualRadio: window.innerWidth / DESIGN_WIDTH
    }
}

export const bodyScale = () => {
    return {
        width: `${DESIGN_WIDTH}px`,
        height: `${DESIGN_HEIGHT}px`,
        transform: `scale(${getScaleRatio()})`
    }
}

export const mapScale = () => {
    const ratio = getScaleRatio()

    return {
        width: `${DESIGN_WIDTH * ratio}px`,
        height: `${DESIGN_HEIGHT * ratio}px`,
        transform: `scale(${(1 / ratio)})`
    }
}
