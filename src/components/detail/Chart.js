import React from 'react'
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './Chart.css';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            days: 1,
            chartDays: [{ label: "24 Hours", value: 1 }, { label: "30 Days", value: 30 }, { label: "3 Months", value: 90 }, { label: "1 Year", value: 365 }]
        }
    }

    componentDidMount() {
        const {coinId} = this.props;

        this.fetchChartData(coinId, this.state.days);
    }

    fetchChartData(currencyId, days) {

        axios.get(`https://api.coingecko.com/api/v3/coins/${currencyId}/market_chart?vs_currency=usd&days=${days}`)
            .then(response => {
                this.setState({ chartData: response.data.prices })
            })
    }

    render() {
        const { chartData, days, chartDays } = this.state;

        return (
            <div className='chart'>
                <div className='days-buttons'>
                    {
                        chartDays.map((day) => (
                            <button 
                                key={day.value} 
                                onClick={() => this.setState({days: day.value}, this.fetchChartData(this.props.coinId, day.value)) } 
                                className='days-button'
                                selected={day.value === days}
                            >
                                {day.label}
                            </button>
                        ))
                    }
                </div>
                <Line
                    data={{
                        labels: chartData.map((el) => {
                        let date = new Date(el[0]);
                        let time =
                            date.getHours() > 12
                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                            : `${date.getHours()}:${date.getMinutes()} AM`;
                        return days === 1 ? time : date.toLocaleDateString();
                        }),

                        datasets: [
                        {
                            data: chartData.map((price) => price[1]),
                            label: `Price ( Past ${days} Days ) in USD`,
                            borderColor: "#1E5F74",
                        },
                        ],
                    }}
                    options={{
                        elements: {
                        point: {
                            radius: 1,
                        },
                        },
                        legend: {
                            labels: {
                                fontColor: "white",
                                fontSize: 18
                            }
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontColor: "#808080",
                                    fontSize: 14,
                                    stepSize: 10,
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontColor: "#808080",
                                    fontSize: 14,
                                    stepSize: 1,
                                }
                            }]
                        }
                    }}
                />
                </div>
        )
    }
}

export default Chart
