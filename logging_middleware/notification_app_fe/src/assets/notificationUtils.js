export function getTopPriorityNotifications(rawNotifications, limit = 10) {
  if (!rawNotifications || !Array.isArray(rawNotifications)) {
    return [];
  }

  const sortedMessages = [...rawNotifications].sort((msgA, msgB) => {
    const weightA = getPriorityWeight(msgA.Type);
    const weightB = getPriorityWeight(msgB.Type);

    if (weightA !== weightB) {
      return weightA - weightB;
    }

    const dateA = new Date(msgA.Timestamp || 0);
    const dateB = new Date(msgB.Timestamp || 0);
    
    return dateB - dateA;
  });

  return sortedMessages.slice(0, limit);
}

function getPriorityWeight(type) {
  if (!type) return 99;
  
  const normalizedType = type.toLowerCase().trim();

  switch (normalizedType) {
    case 'placement':
      return 1;
    case 'result':
      return 2;
    case 'event':
      return 3;
    default:
      return 99;
  }
}