export default ({ router }) => {
  router.addRoutes([
    { path: '/projects/', redirect: '/examples/' },
    { path: '/docs/', redirect: '/docs/two/' }
  ])
}
