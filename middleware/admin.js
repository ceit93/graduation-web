export default function ({ store, redirect }) {
  // redirect the user to /profile
  if (!store.$auth.loggedIn || !store.$auth.user.is_admin)
    return redirect('/profile')
}
