import React, {useEffect, useState} from 'react'
import './App.css'
import Table from './components/Table'
import axios from 'axios'
import moment from 'moment'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      const result = await axios("https://recruitment.hal.skygate.io/companies");
      const newData = await getAdditionalData(result.data)
      setData(newData)
    })()
  }, [])

  const getAdditionalData = async (data) => {
    let dataToDisplay = data
    const prepareRequests = dataToDisplay.map(item => axios.get('https://recruitment.hal.skygate.io/incomes/' + item.id) )

    await axios.all(prepareRequests).then(axios.spread((...responses) => {
        const transformedResponse = responses.map(item => {
            const incomes = item.data.incomes
            let totalIncome = 0
            let lastMonthTotalIncome = 0
            let averageIncome = 0
            let lastMonthData = incomes.filter(item => {
                const currentMonth = moment().subtract(1, 'month').month()
                return moment(item.date).month() === currentMonth
            })
            lastMonthData.forEach(item => lastMonthTotalIncome = lastMonthTotalIncome + Number(item.value))
            incomes.forEach(item => totalIncome = totalIncome + Number(item.value)) //I am not using Array.reduce because its performance is lower than forEach.
            averageIncome = totalIncome / incomes.length
            return {id: item.data.id, totalIncome: Number(totalIncome.toFixed(2)), averageIncome: Number(averageIncome.toFixed(2)), lastMonthTotalIncome: Number(lastMonthTotalIncome.toFixed(2))}
        })

       dataToDisplay = dataToDisplay.map(item => {
           const relevantTransformedItem = transformedResponse.find(transformed => transformed.id === item.id)
           return {...item, ...relevantTransformedItem}
       })

    }))
    return dataToDisplay
  }

  return (
    <div className="App">
        <Table 
          headings={['id', 'name', 'city', 'total income', 'average income', 'last month income']}
          paginate
          data={data}
          />
    </div>
  );
}

export default App;

