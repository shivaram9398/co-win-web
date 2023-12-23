import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByGender = props => {
  const {data} = props
  console.log(data)

  return (
    <>
      <h1>Vaccination by gender</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            cx="50%"
            cy="60%"
            data={data}
            startAngle={0}
            endAngle={180}
            innerRadius="30%"
            outerRadius="60%"
            dataKey="count"
          >
            <Cell name="Male" fill="#fecba6" />
            <Cell name="Female" fill="#b3d23f" />
            <Cell name="Others" fill="#a44c9e" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            horizontalAlign="middle"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}

export default VaccinationByGender
