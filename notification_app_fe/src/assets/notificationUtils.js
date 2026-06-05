export function getTopPriorityNotifications(rawNotifications) {
  if (!rawNotifications || rawNotifications.length === 0) {
    return [];
  }

  let listToSort = rawNotifications.slice();

  listToSort.sort((msgA, msgB) => {
    let weightA = getPriorityWeight(msgA.Type);
    let weightB = getPriorityWeight(msgB.Type);

    if (weightA !== weightB) {
      return weightA - weightB;
    }
    
    let dateA = new Date(msgA.Timestamp || 0);
    let dateB = new Date(msgB.Timestamp || 0);
    return dateB - dateA;
  });

  return listToSort.slice(0, 10);
}

export function getFilteredNotifications(rawNotifications, options) {
  let opts = options || {};
  let page = opts.page || 1;
  let limit = opts.limit || 10;
  let type = opts.type || '';

  if (!rawNotifications) {
    return { data: [], totalPages: 0 };
  }

  let filtered = [];

  if (type !== '') {
    filtered = rawNotifications.filter(item => {
      return item.Type && item.Type.toLowerCase() == type.toLowerCase();
    });
  } else {
    filtered = rawNotifications.slice();
  }

  filtered.sort((a, b) => {
    return new Date(b.Timestamp || 0) - new Date(a.Timestamp || 0);
  });

  let start = (page - 1) * limit;
  let end = start + limit;
  let result = filtered.slice(start, end);

  let total = Math.ceil(filtered.length / limit);

  return {
    data: result,
    totalPages: total
  };
}

function getPriorityWeight(type) {
  if (!type) {
    return 99;
  }
  
  let t = type.toLowerCase(); 
  
  if (t === "placement") return 1;
  if (t === "result") return 2;
  if (t === 'event') return 3;
  
  return 99;
}