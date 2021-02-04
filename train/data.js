const fs = require('fs')
const tf = require('@tensorflow/tfjs-node')


const img2x = (imgPath) => {
    // console.log('图片路径 ',imgPath)
    buffer = fs.readFileSync(imgPath)

    // 清除中间变量，节省内存
    return tf.tidy(() => {
        // 张量
        const imgTs = tf.node.decodeImage(new Uint8Array(buffer));

        // 图片resize
        const imgTsResized = tf.image.resizeBilinear(imgTs, [224, 224])

        // 归一化到[-1, 1]之间
        // 224 * 224 * RGB * 1张
        return imgTsResized
            .toFloat()
            .sub(255 / 2)
            .div(255 / 2)
            .reshape([1, 224, 224, 3])
    })
}

const batchReadData = async (data) => {
    const ds = tf.data.generator(function* () {
        const count = data.length
        const batchSize = 32

        for (let start = 0; start < count; start += batchSize) {
            const end = Math.min(start + batchSize, count)
            // console.log('当前批次 ',start)

            yield tf.tidy(() => {
                // 存放图片
                const inputs = [];
                // 存放label
                const labels = [];

                for (let j = start; j < end; j++) {
                    const {imgPath, dirIndex} = data[j]

                    // 输入张量
                    const x = img2x(imgPath)
                    inputs.push(x)
                    labels.push(dirIndex)
                }
                // 将inputs/labels数组转为tensor
                const xs = tf.concat(inputs);
                const ys = tf.tensor(labels);
                return {xs, ys}
            })
        }
    })
    return ds
}

// 加载数据
const getData = async (trainDir, outputDir) => {
    const classes = fs.readdirSync(trainDir).filter(n => !n.includes('.'))

    // 保存类别到文件
    fs.writeFileSync(`${outputDir}/classes.json`, JSON.stringify(classes))

    const data = []
    classes.forEach((dir, dirIndex) => {
        fs.readdirSync(`${trainDir}/${dir}`)
            .filter(n => n.match(/jpg$/))
            // .slice(0, 1000)
            .forEach(filename => {
                // 图片相对路径
                const imgPath = `${trainDir}/${dir}/${filename}`

                data.push({imgPath, dirIndex})
            })
    })

    // 打乱数据
    tf.util.shuffle(data)

    // 分批次读取数据
    const ds = await batchReadData(data)

    return {
        ds,
        classes,
    }
}
module.exports = getData