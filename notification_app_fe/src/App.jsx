// import React;
import PriorityInbox from './assets/priorityInbox';

export default function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5', 
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        fontFamily: 'sans-serif' 
      }}>
        <h1 style={{ color: '#222', margin: '0 0 5px 0' }}>Campus Updates</h1>
        <p style={{ color: '#666', margin: 0 }}>Stay informed with real-time notifications</p>
      </header>

      <main>
        <PriorityInbox />
      </main>
    </div>
  );
}