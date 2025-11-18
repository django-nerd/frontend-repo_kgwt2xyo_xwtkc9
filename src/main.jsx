import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import HorizontalBattlePass from './components/HorizontalBattlePass'
import VerticalBattlePass from './components/VerticalBattlePass'
import Layout from './components/Layout'
import './index.css'

function withLayout(child) {
  return <Layout>{child}</Layout>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/horizontal" element={withLayout(<HorizontalBattlePass />)} />
        <Route path="/vertical" element={withLayout(<VerticalBattlePass />)} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
