// pages/_app.js
/* eslint-disable react/prop-types */
import PlausibleProvider from 'next-plausible'

export default function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="pi.avanto.tk">
      <Component {...pageProps} />
    </PlausibleProvider>
  )
}
