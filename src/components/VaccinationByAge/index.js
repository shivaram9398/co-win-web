import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByAge = props => {
  const {data} = props
  return (
    <>
      <h1>Vaccination by Age</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={1000} height={300}>
          <Pie
            cx="50%"
            cy="30%"
            data={data}
            startAngle={0}
            endAngle={360}
            outerRadius="60%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#fecba6" />
            <Cell name="44-60" fill="#b3d23f" />
            <Cell name="Above 60" fill="#a44c9e" />
          </Pie>
          <Legend
            iconType="circle"
            layout="vertical"
            verticalAlign="middle"
            align="ceter"
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}

export default VaccinationByAge
