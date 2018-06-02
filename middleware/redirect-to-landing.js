export default function ({ store, redirect }) {
  // redirect the user to /landing
  if (store.$auth.loggedIn)
    return redirect('/landing')
}
