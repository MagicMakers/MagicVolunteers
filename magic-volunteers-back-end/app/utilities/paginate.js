const paginate = (items, req, take = 10, skip = 0) => {
  take = parseInt(take);
  skip = parseInt(skip);

  const numberOfPages = Math.ceil(items.length / take);
  const currentPage = skip === 0 ? 1 : skip > items.length - take ? numberOfPages : Math.ceil(skip / take + 1);
  const results = items.slice(skip, + skip + take);

  // 23 => 3 pages, skip = 20, take = 10
  // 23 => skip = 15, take = 5 => 5 pages, currentpage = 4
  let fullUrl = req.protocol + "://" + req.get('host') + req.originalUrl;
  if (fullUrl.indexOf('take') === -1){
    fullUrl = fullUrl.indexOf('?') === -1 ? fullUrl.concat(`?take=${take}`) : fullUrl.concat(`&take=${take}`);
  }

  if (fullUrl.indexOf('skip') === -1){
    fullUrl = fullUrl.indexOf('?') === -1 ? fullUrl.concat(`?skip=${skip}`) : fullUrl.concat(`&skip=${skip}`);
  }

  const prev = skip >= take ? fullUrl.replace(`skip=${skip}`, `skip=${skip - take}`) : null;
  const next = skip < take * (numberOfPages-1) ? fullUrl.replace(`skip=${skip}`, `skip=${skip + take}`) : null;

  return {
    pagination: {
      numberOfPages,
      currentPage,
      links: {
        self: fullUrl,
        prev,
        next
      }
    },
    results
  };
};

module.exports = { paginate };
