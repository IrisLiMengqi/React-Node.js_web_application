import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Select } from 'antd';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios'
import {base} from './config'
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class Main extends Component {
    constructor() {
        super();
        this.state = {
            option: {}
        }
    }

    componentDidMount(){
        axios.get(`${base}/api/main`).then(
          ({data}) => {
            if(data.code === 200){
    
              this.setState({
                option: {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:['bill', 'savings']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : data.data.time
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                
                        {
                            name:'bill',
                            type:'bar',
                            itemStyle: {
                                normal: {color: '#4f97d5'}
                            },
                            stack: 'item',
                            data:data.data.bill
                        },
                        {
                            name:'savings',
                            type:'bar',
                            stack: 'item',
                            data:data.data.savings
                        }
                    ]
                }
              })
            }
    
          }
        )
      }
    render() {
        return (
            <div >
                <Tabs defaultActiveKey="2" onChange={(e) => this.change(e)}>
                    <TabPane tab="kwh" key="1"></TabPane>
                    <TabPane tab="Bill-Savings" key="2"></TabPane>
                </Tabs>
                {/* <div>
                    <span>请选择时间:</span>
                    <Select defaultValue="lucy" style={{ width: 120 }} >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </div> */}
                <div>
                    <ReactEcharts option={this.state.option} />
                </div>
            </div>
        );
    }
    change(e) {
        this.props.history.push('/')
    }
}
export default withRouter(Main)
