import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import './App.css'

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-system-bg text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-extrabold tracking-widest text-system-accent">SYSTEM</Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/" className={({isActive})=>`hover:text-system-accent ${isActive? 'text-system-accent' : 'text-white/70'}`}>Dashboard</NavLink>
            <NavLink to="/log" className={({isActive})=>`hover:text-system-accent ${isActive? 'text-system-accent' : 'text-white/70'}`}>Log</NavLink>
            <NavLink to="/foods" className={({isActive})=>`hover:text-system-accent ${isActive? 'text-system-accent' : 'text-white/70'}`}>Foods</NavLink>
            <NavLink to="/plan" className={({isActive})=>`hover:text-system-accent ${isActive? 'text-system-accent' : 'text-white/70'}`}>Plan</NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        {children}
      </main>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="system-panel p-5 col-span-2">
        <h2 className="text-xl font-bold mb-2">Daily Calories</h2>
        <p className="text-white/70">Track your intake and remaining target.</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="system-panel p-4">
            <div className="text-white/60 text-xs">Consumed</div>
            <div className="text-2xl font-bold">0 kcal</div>
          </div>
          <div className="system-panel p-4">
            <div className="text-white/60 text-xs">Target</div>
            <div className="text-2xl font-bold">-- kcal</div>
          </div>
          <div className="system-panel p-4">
            <div className="text-white/60 text-xs">Remaining</div>
            <div className="text-2xl font-bold">-- kcal</div>
          </div>
        </div>
      </div>
      <div className="system-panel p-5">
        <h2 className="text-xl font-bold mb-2">Today's Exercise</h2>
        <p className="text-white/70">Suggested routine based on your goal.</p>
        <video className="mt-3 w-full rounded-lg border border-white/10" controls poster="/placeholder.png">
          <source src="/exercise.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

function Log() {
  return (
    <div className="system-panel p-5">
      <h2 className="text-xl font-bold mb-2">Add to Daily Log</h2>
      <div className="grid md:grid-cols-3 gap-3">
        <input className="system-panel px-3 py-2" placeholder="Food name" />
        <input className="system-panel px-3 py-2" placeholder="Quantity (e.g., 2 sandwiches or 150 g)" />
        <button className="system-button">Add</button>
      </div>
      <div className="mt-4 text-white/70">No entries yet.</div>
    </div>
  )
}

function Foods() {
  return (
    <div className="system-panel p-5">
      <h2 className="text-xl font-bold mb-2">Food Search</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input className="system-panel px-3 py-2 md:col-span-3" placeholder="Search foods (e.g., sandwich, dal, rice)" />
        <button className="system-button">Search</button>
      </div>
      <div className="mt-4 text-white/70">Results will appear here.</div>
    </div>
  )
}

function Plan() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="system-panel p-5">
        <h2 className="text-xl font-bold mb-2">Profile & BMI</h2>
        <div className="grid grid-cols-2 gap-3">
          <input className="system-panel px-3 py-2" placeholder="Age" />
          <input className="system-panel px-3 py-2" placeholder="Gender" />
          <input className="system-panel px-3 py-2" placeholder="Height (cm)" />
          <input className="system-panel px-3 py-2" placeholder="Weight (kg)" />
          <select className="system-panel px-3 py-2 col-span-2">
            <option value="maintain">Maintain</option>
            <option value="loss">Lose Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
          <button className="system-button col-span-2">Calculate</button>
        </div>
      </div>
      <div className="system-panel p-5">
        <h2 className="text-xl font-bold mb-2">Daily Target</h2>
        <div className="text-white/70">Your recommended calories: -- kcal</div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/log" element={<Log/>} />
          <Route path="/foods" element={<Foods/>} />
          <Route path="/plan" element={<Plan/>} />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}
