import React, { useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend,
CategoryScale,
LinearScale,
BarElement
} from "chart.js";

ChartJS.register(
ArcElement,
Tooltip,
Legend,
CategoryScale,
LinearScale,
BarElement
);

function App() {

const [principal,setPrincipal] = useState(500000)
const [rate,setRate] = useState(8)
const [tenure,setTenure] = useState(5)
const [dark,setDark] = useState(false)

const monthlyRate = rate / 12 / 100
const months = tenure * 12

const emi =
(principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
(Math.pow(1 + monthlyRate, months) - 1)

const totalPayment = emi * months
const totalInterest = totalPayment - principal


const pieData = {
labels:["Principal","Interest"],
datasets:[
{
data:[principal,totalInterest],
backgroundColor:["#36A2EB","#FF6384"]
}
]
}

const barData = {
labels:["Principal","Interest"],
datasets:[
{
label:"Loan Comparison",
data:[principal,totalInterest],
backgroundColor:["#4CAF50","#FF9800"]
}
]
}


let balance = principal
const schedule=[]

for(let i=1;i<=months;i++){

const interest = balance * monthlyRate
const principalPaid = emi - interest
balance -= principalPaid

schedule.push({
month:i,
interest:interest.toFixed(2),
principal:principalPaid.toFixed(2),
balance:balance.toFixed(2)
})

}

const toggleTheme=()=>{
setDark(!dark)
}

return(

<div style={{
fontFamily:"Arial",
padding:"40px",
textAlign:"center",
background: dark ? "#121212" : "linear-gradient(120deg,#4facfe,#00f2fe)",
minHeight:"100vh",
color: dark ? "white":"black"
}}>

<h1>Loan EMI Calculator Dashboard</h1>

<button
onClick={toggleTheme}
style={{
padding:"10px 20px",
borderRadius:"8px",
border:"none",
cursor:"pointer",
marginBottom:"20px"
}}
>
{dark ? "Light Mode":"Dark Mode"}
</button>

<div style={{
display:"flex",
justifyContent:"center",
gap:"30px",
flexWrap:"wrap"
}}>

<div style={{
background:"white",
padding:"25px",
borderRadius:"15px",
width:"320px"
}}>

<h2>Loan Details</h2>

<label>Loan Amount</label>
<input
type="range"
min="10000"
max="2000000"
step="10000"
value={principal}
onChange={(e)=>setPrincipal(Number(e.target.value))}
style={{width:"100%"}}
/>
<p>₹ {principal}</p>

<label>Interest Rate (%)</label>
<input
type="range"
min="1"
max="20"
step="0.1"
value={rate}
onChange={(e)=>setRate(Number(e.target.value))}
style={{width:"100%"}}
/>
<p>{rate}%</p>

<label>Loan Tenure (Years)</label>
<input
type="range"
min="1"
max="30"
value={tenure}
onChange={(e)=>setTenure(Number(e.target.value))}
style={{width:"100%"}}
/>
<p>{tenure} Years</p>

</div>


<div style={{
background:"white",
padding:"25px",
borderRadius:"15px",
width:"320px"
}}>

<h2>Loan Summary</h2>

<p><b>Monthly EMI</b></p>
<p>₹ {emi.toFixed(2)}</p>

<p><b>Total Interest</b></p>
<p>₹ {totalInterest.toFixed(2)}</p>

<p><b>Total Payment</b></p>
<p>₹ {totalPayment.toFixed(2)}</p>

</div>

</div>


<div style={{
display:"flex",
justifyContent:"center",
gap:"40px",
flexWrap:"wrap",
marginTop:"40px"
}}>

<div style={{
background:"white",
padding:"20px",
borderRadius:"15px",
width:"400px"
}}>

<h2>Loan Breakdown</h2>
<Pie data={pieData}/>

</div>

<div style={{
background:"white",
padding:"20px",
borderRadius:"15px",
width:"400px"
}}>

<h2>Principal vs Interest</h2>
<Bar data={barData}/>

</div>

</div>


<div style={{
background:"white",
padding:"20px",
borderRadius:"15px",
marginTop:"40px"
}}>

<h2>EMI Payment Schedule (First 12 Months)</h2>

<table style={{
width:"100%",
borderCollapse:"collapse"
}}>

<thead>
<tr>
<th>Month</th>
<th>Interest</th>
<th>Principal</th>
<th>Balance</th>
</tr>
</thead>

<tbody>

{schedule.slice(0,12).map((row)=>(
<tr key={row.month}>
<td>{row.month}</td>
<td>{row.interest}</td>
<td>{row.principal}</td>
<td>{row.balance}</td>
</tr>
))}

</tbody>

</table>

</div>

</div>

)
}

export default App
