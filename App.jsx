import { useState } from "react";

function App() {

const [loan,setLoan] = useState(500000)
const [rate,setRate] = useState(8)
const [years,setYears] = useState(5)

const monthlyRate = rate/12/100
const months = years*12

const emi =
(loan * monthlyRate * Math.pow(1+monthlyRate,months)) /
(Math.pow(1+monthlyRate,months)-1)

const totalPayment = emi * months
const interest = totalPayment - loan

return (

<div style={{padding:"40px",fontFamily:"Arial"}}>

<h1>Loan EMI Calculator</h1>

<label>Loan Amount</label>
<br/>

<input
type="number"
value={loan}
onChange={(e)=>setLoan(Number(e.target.value))}
/>

<br/><br/>

<label>Interest Rate</label>
<br/>

<input
type="number"
value={rate}
onChange={(e)=>setRate(Number(e.target.value))}
/>

<br/><br/>

<label>Years</label>
<br/>

<input
type="number"
value={years}
onChange={(e)=>setYears(Number(e.target.value))}
/>

<h2>Monthly EMI: ₹ {emi.toFixed(2)}</h2>

<h3>Total Interest: ₹ {interest.toFixed(2)}</h3>

<h3>Total Payment: ₹ {totalPayment.toFixed(2)}</h3>

</div>

)

}

export default App
