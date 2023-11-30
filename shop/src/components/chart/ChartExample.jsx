import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";

const options = {
    chart: {
        title: "상품별 댓글수"
    },
};


const ChartExample = () => {
    const [data, setData] = useState([]);

    const getData = async() => {
        const res = await axios.get("/shop/chart1");
        //console.log(res.data);
        var rows = [];
        rows.push(['상품코드', '댓글수']);

        res.data.forEach(row=>{
            rows.push([`[${row.pid}]`, row.cnt]);
        });
        setData(rows);
    }

    useEffect(()=> {
        getData();
    }, []);


    return (
        <div className='p-5'>
            <Chart
                chartType="Bar"
                width="100%" height="400px"
                data={data}
                options={options} />
            <Chart
                chartType="Line"
                width="100%" height="400px"
                data={data}
                options={options} />
            <Chart
                chartType="PieChart"
                width="100%" height="400px"
                data={data}
                options={options} />
        </div>
    );
};

export default ChartExample