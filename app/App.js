import React, {PureComponent} from 'react'
import {Button} from 'antd'
import 'antd/dist/antd.css'
import * as tf from '@tensorflow/tfjs'

import {file2img, img2x} from './utils'

const DATA_URL = "http://localhost:8080/"

class App extends PureComponent {

    async componentDidMount() {
        this.model = await tf.loadLayersModel(DATA_URL + '/model.json')
        this.CLASSES = await fetch(DATA_URL+'/classes.json').then(res => res.json())
        // this.model.summary()

    }

    predict = async (file) => {
        const img = await file2img(file)
        const pred = tf.tidy(()=>{
            const x = img2x(img)
            return this.model.predict(x)
        })
        // pred.print()
        const result = pred.arraySync()[0].map((score, i)=> ({score, label:this.CLASSES[i]}))
            .sort((a,b)=> b.score - a.score)
        console.log(result)
    }

    render() {
        return (
            <div>
                {/*<Button type='primary'>点击上传</Button>*/}
                <input type="file" onChange={event => this.predict(event.target.files[0])}/>
            </div>
        )
    }
}

export default App
