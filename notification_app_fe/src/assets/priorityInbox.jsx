import { useState, useEffect } from 'react';
import { getTopPriorityNotifications, getFilteredNotifications } from './notificationUtils';

const MOCK_DATA = {
  "notifications": [
    { "ID": "1", "Type": "Event", "Message": "Annual Hackathon Registration Open", "Timestamp": "2026-06-05 10:00:00" },
    { "ID": "2", "Type": "Placement", "Message": "Uber CTC breakdown & PPT details", "Timestamp": "2026-06-05 10:45:00" },
    { "ID": "3", "Type": "Result", "Message": "Re-evaluation results for Phase 2", "Timestamp": "2026-06-04 09:15:00" },
    { "ID": "4", "Type": "Placement", "Message": "De Shaw interview shortlists uploaded", "Timestamp": "2026-06-05 08:30:00" },
    { "ID": "5", "Type": "Event", "Message": "Guest lecture by Alumni on System Design", "Timestamp": "2026-06-03 14:00:00" },
    { "ID": "6", "Type": "Result", "Message": "Semester 6 Grade Sheets available", "Timestamp": "2026-06-05 07:00:00" },
    { "ID": "7", "Type": "Placement", "Message": "Microsoft Off-Campus Recruitment Schedule", "Timestamp": "2026-06-05 11:00:00" },
    { "ID": "8", "Type": "Result", "Message": "Re-exam Internal Marks Published", "Timestamp": "2026-06-04 15:30:00" },
    { "ID": "9", "Type": "Event", "Message": "Inter-College Sports Meet Registration", "Timestamp": "2026-06-05 06:15:00" },
    { "ID": "10", "Type": "Event", "Message": "Robotics Club Core Committee Auditions", "Timestamp": "2026-06-05 05:00:00" },
    { "ID": "11", "Type": "Event", "Message": "E-Cell Startup Pitch Workshop", "Timestamp": "2026-06-05 04:30:00" },
    { "ID": "12", "Type": "Event", "Message": "Fine Arts Club Orientation", "Timestamp": "2026-06-05 02:00:00" }
  ]
};

export default function PriorityInbox() {
  const [activeTab, setActiveTab] = useState('priority'); 
  const [priorityData, setPriorityData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(4); 
  const [typeFilter, setTypeFilter] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const [viewedIds, setViewedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('viewed_notifications');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!MOCK_DATA || !MOCK_DATA.notifications) {
          throw new Error("No data found");
        }

        const topPriority = getTopPriorityNotifications(MOCK_DATA.notifications);
        setPriorityData(topPriority);

        const { data, totalPages: pages } = getFilteredNotifications(MOCK_DATA.notifications, {
          page,
          limit,
          type: typeFilter
        });
        
        setAllData(data);
        setTotalPages(pages);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, typeFilter, limit]);

  const handleMarkAsViewed = (id) => {
    if (viewedIds.includes(id)) return;
    const updated = [...viewedIds, id];
    setViewedIds(updated);
    localStorage.setItem('viewed_notifications', JSON.stringify(updated));
  };

  if (error) {
    return (
      <div>
        <h4>Error</h4>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (loading) return <div>Loading updates...</div>;

  const currentList = activeTab === 'priority' ? priorityData : allData;

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('priority')}>
          Top Priority {activeTab === 'priority' && '*'}
        </button>
        <button onClick={() => setActiveTab('all')}>
          All Updates {activeTab === 'all' && '*'}
        </button>
      </div>

      {activeTab === 'all' && (
        <div style={{ margin: '10px 0' }}>
          {['', 'placement', 'result', 'event'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setTypeFilter(cat);
                setPage(1);
              }}
              style={{ fontWeight: typeFilter === cat ? 'bold' : 'normal' }}
            >
              {cat === '' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div style={{ margin: '10px 0' }}>
        {currentList.length === 0 ? (
          <p>No notifications here.</p>
        ) : (
          currentList.map((item) => {
            const isViewed = viewedIds.includes(item.ID);
            return (
              <div 
                key={item.ID}
                onClick={() => handleMarkAsViewed(item.ID)}
                style={{ 
                  borderBottom: '1px solid gray', 
                  padding: '10px 0',
                  opacity: isViewed ? 0.6 : 1 
                }}
              >
                <div>
                  <b>[{item.Type.toUpperCase()}]</b> {item.Timestamp}
                  {!isViewed && ' (NEW)'}
                </div>
                <p style={{ margin: '5px 0' }}>
                  {item.Message}
                </p>
              </div>
            );
          })
        )}
      </div>

      {activeTab === 'all' && totalPages > 1 && (
        <div>
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            Prev
          </button>
          <span> Page {page} of {totalPages} </span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}