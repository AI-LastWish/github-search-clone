import { NextRouter } from "next/router";

const filterSearch = (router: NextRouter, page: string | string[] | undefined, keyword: string | string[] | undefined) => {

  const path = router.pathname;
  const query = router.query;

  if (page) query.page = page;
  query.keyword = keyword;

  router.push({
    pathname: path,
    query: query
  })
}

export default filterSearch

export const changeTab = (router: NextRouter, username: string, tab: string) => {
  const path = router.pathname;
  const query = router.query;

  query.username = username
  query.tab = tab

  router.push({
    pathname: path,
    query: query
  })
}