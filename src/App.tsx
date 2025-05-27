import React from 'react'
import { DataGrid } from './components/DataGrid'
import './App.css'

// Sample data for testing
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, department: 'Engineering' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, department: 'Design' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, department: 'Marketing' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 28, department: 'Engineering' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 32, department: 'Sales' },
]

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 80,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    size: 150,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 200,
  },
  {
    accessorKey: 'age',
    header: 'Age',
    size: 80,
  },
  {
    accessorKey: 'department',
    header: 'Department',
    size: 150,
  },
]

function App() {
  return (
    <div className="app">
      <h1>@abaktiar/datagrid Demo</h1>
      <div className="demo-container">
        <DataGrid
          data={sampleData}
          columns={columns}
          enableSorting={true}
          enableFiltering={true}
          enablePagination={true}
          enableRowSelection={true}
        />
      </div>
    </div>
  )
}

export default App
