import * as tf from '@tensorflow/tfjs'

export const file2img = async (file) => {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            const img = document.createElement('img')
            img.src = e.target.result
            img.width = 224
            img.height = 224
            img.onload = () => resolve(img)
        }
    })
}

export const img2x = (imgEl) => {
    return tf.tidy(()=>{
        return tf.browser.fromPixels(imgEl)
            .toFloat()
            .sub(255/2)
            .div(255/2)
            .reshape([1,224,224,3])
    })
}