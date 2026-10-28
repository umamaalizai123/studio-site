import { useState } from 'react'
import { authClient } from '../auth-client'

export default function AuthSection() {
  const { data: session, isPending } = authClient.useSession()
  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setBusy(true)

    const result =
      mode === 'signup'
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password })

    setBusy(false)

    if (result.error) {
      setError(result.error.message || 'Something went wrong')
    } else {
      setPassword('')
    }
  }

  const inputClass =
    'w-full rounded-lg border border-rosegold/60 bg-white px-3 py-2'

  return (
    <section id="account" className="px-[5%] py-12">
      <h2 className="mb-6 text-2xl font-bold text-berry">Your account</h2>

      {isPending && <p>Checking your sign-in...</p>}

      {!isPending && session && (
        <p className="font-semibold text-berry">
          You are signed in as {session.user.name} ({session.user.email}).
        </p>
      )}

      {!isPending && !session && (
        <form
          onSubmit={handleSubmit}
          className="max-w-md rounded-2xl border border-rosegold/40 bg-white p-6 shadow-sm"
        >
          <h3 className="mb-4 text-xl font-bold text-berry">
            {mode === 'signup' ? 'Create an account' : 'Sign in'}
          </h3>

          {mode === 'signup' && (
            <div className="mb-4">
              <label htmlFor="name" className="mb-1 block font-semibold">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="mb-1 block font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && (
            <p role="alert" className="mb-4 font-semibold text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-berry px-5 py-3 font-bold text-white disabled:opacity-60"
          >
            {busy ? 'Please wait...' : mode === 'signup' ? 'Sign up' : 'Sign in'}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode(mode === 'signup' ? 'signin' : 'signup')
              setError('')
            }}
            className="mt-4 w-full text-center text-sm font-semibold text-berry underline"
          >
            {mode === 'signup'
              ? 'Already have an account? Sign in'
              : 'New here? Create an account'}
          </button>
        </form>
      )}
    </section>
  )
}