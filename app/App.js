import React, {PureComponent} from 'react'
import {Button} from 'antd'
import 'antd/dist/antd.css'
import * as tf from '@tensorflow/tfjs'

const DATA_URL = "http://localhost:8080/"

class App extends PureComponent {

    async componentDidMount() {
        this.model = await tf.loadLayersModel(DATA_URL+'/model.json')
        this.model.summary()
    }

    render() {
        return (
            <div>
                <Button type='primary'>点击上传</Button>
            </div>
        )
    }
}

export default App
