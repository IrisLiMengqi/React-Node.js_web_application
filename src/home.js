import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs } from 'antd';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios'
import {base} from './config'

const TabPane = Tabs.TabPane;

class Home extends Component {

  constructor(){
    super();
    this.state = {
      option:{}
    }
  }

  componentDidMount(){
    axios.get(`${base}/api/electricity`).then(
      ({data}) => {
        if(data.code === 200){

          this.setState({
            option: {
              color: ['#3398DB'],
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: data.data.time,
                  axisTick: {
                    alignWithLabel: true
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: 'kwh',
                  type: 'bar',
                  barWidth: '60%',
                  data: data.data.kwh
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
        <Tabs defaultActiveKey="1" onChange={(e) => this.change(e)}>
          <TabPane tab="Electricity/kwh" key="1"></TabPane>
          <TabPane tab="Bill-Savings" key="2"></TabPane>
        </Tabs>
        <ReactEcharts option={this.state.option} />
      </div>
    );
  }

  // 路由跳转到main
  change(e) {
    this.props.history.push('/main')
  }
}
export default withRouter(Home)
