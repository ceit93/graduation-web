export default function ({ store, redirect }) {
  // redirect the user to /profile
  if (store.$auth.loggedIn)
    return redirect('/profile')
}
