import  { useState, useEffect } from 'react';
import { getTopPriorityNotifications } from './notificationUtils';

export default function PriorityInbox() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = {
          
  "notifications": [
    {
      "ID": "ffbb9010-1a1d-46ed-93fe-93adcae76dff",
      "Type": "Event",
      "Message": "tech-fest",
      "Timestamp": "2026-06-04 11:30:16"
    },
    {
      "ID": "55ec51ef-e988-40e8-9c8c-fdbcaa692f95",
      "Type": "Event",
      "Message": "farewell",
      "Timestamp": "2026-06-04 20:00:01"
    },
    {
      "ID": "793d3b9a-3cf3-4be1-a290-93b7cdb8335a",
      "Type": "Placement",
      "Message": "Berkshire Hathaway Inc. hiring",
      "Timestamp": "2026-06-04 09:59:46"
    },
    {
      "ID": "6356106b-c567-4ad7-8adf-8a5936f4f6fe",
      "Type": "Event",
      "Message": "cult-fest",
      "Timestamp": "2026-06-04 23:29:31"
    },
    {
      "ID": "34267259-a55e-48c5-9e07-25d7dd035639",
      "Type": "Result",
      "Message": "internal",
      "Timestamp": "2026-06-05 04:29:16"
    },
    {
      "ID": "68386e81-ea3e-4984-a325-12efa0f64b89",
      "Type": "Placement",
      "Message": "Amazon.com Inc. hiring",
      "Timestamp": "2026-06-05 01:59:01"
    },
    {
      "ID": "9aaa718a-b33d-41e0-82d8-400d36993dda",
      "Type": "Placement",
      "Message": "TSMC hiring",
      "Timestamp": "2026-06-04 20:28:46"
    },
    {
      "ID": "3e07a027-beff-479f-9332-58239daaf8f3",
      "Type": "Event",
      "Message": "farewell",
      "Timestamp": "2026-06-04 20:58:31"
    },
    {
      "ID": "29539ed5-50eb-4d4b-a5b3-44d07e0d9f65",
      "Type": "Placement",
      "Message": "Tesla Inc. hiring",
      "Timestamp": "2026-06-04 19:58:16"
    },
    {
      "ID": "a17228b3-733b-43e1-ab6c-d43c30344198",
      "Type": "Result",
      "Message": "external",
      "Timestamp": "2026-06-04 08:58:01"
    },
    {
      "ID": "9bb9ee92-5717-4eb1-b72d-c66c4686b30b",
      "Type": "Result",
      "Message": "external",
      "Timestamp": "2026-06-04 21:57:46"
    },
    {
      "ID": "c8f00c39-6ec5-489c-9f2e-0b8b2ab8432a",
      "Type": "Event",
      "Message": "induction",
      "Timestamp": "2026-06-04 20:57:31"
    },
    {
      "ID": "4d350d1a-40f1-48b3-bda2-1b668c16d3d8",
      "Type": "Placement",
      "Message": "Apple Inc. hiring",
      "Timestamp": "2026-06-04 06:57:16"
    },
    {
      "ID": "56415257-1726-4a04-94dd-fa8722803e41",
      "Type": "Event",
      "Message": "induction",
      "Timestamp": "2026-06-04 07:27:01"
    },
    {
      "ID": "e82f55b2-f32c-4a6d-8415-4d35f5649d90",
      "Type": "Event",
      "Message": "farewell",
      "Timestamp": "2026-06-04 17:26:46"
    },
    {
      "ID": "e7cfa5eb-b71c-40be-bba6-7a308202d90d",
      "Type": "Result",
      "Message": "external",
      "Timestamp": "2026-06-04 20:26:31"
    },
    {
      "ID": "8af83320-99e4-40cc-b9d9-8f44ec45659a",
      "Type": "Event",
      "Message": "farewell",
      "Timestamp": "2026-06-04 08:26:16"
    },
    {
      "ID": "88baf0f1-7a50-4b41-92e0-2c44fd227bc1",
      "Type": "Placement",
      "Message": "Alphabet Inc. Class C hiring",
      "Timestamp": "2026-06-04 19:56:01"
    },
    {
      "ID": "5578a365-c7c2-47c4-b593-f167f6f2f53b",
      "Type": "Result",
      "Message": "mid-sem",
      "Timestamp": "2026-06-05 04:25:46"
    },
    {
      "ID": "46afe70d-8b86-4d06-9d7b-bddfbbd4fd26",
      "Type": "Event",
      "Message": "cult-fest",
      "Timestamp": "2026-06-04 19:55:31"
    }
  ]
}
 const priorityItems = getTopPriorityNotifications(response.notifications, 10);
        setNotifications(priorityItems);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <h3 style={{ borderBottom: '2px solid #333', paddingBottom: '8px' }}>
        Priority Inbox
      </h3>
      
      {notifications.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>No updates available.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {notifications.map((item) => (
            <div 
              key={item.ID} 
              style={{
                padding: '14px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: item.Type?.toLowerCase() === 'placement' ? '#fff5f5' : '#ffffff'
              }}
            >
              <span style={{
                fontSize: '11px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: item.Type?.toLowerCase() === 'placement' ? '#d9534f' : '#333'
              }}>
                [{item.Type}]
              </span>
              <p style={{ margin: '5px 0 0 0', fontWeight: '500' }}>{item.Message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}