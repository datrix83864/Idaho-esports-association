import '@styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SSRProvider } from 'react-bootstrap';

function Application({ Component, pageProps }) {
  return (
    <>
    <head>
        <script
          async
          src="https://widgets.givebutter.com/latest.umd.cjs?acct=4Ci9x4it4GfVvNf9&p=other"
        ></script>
      </head>
  <SSRProvider>
    <Component {...pageProps} />
  </SSRProvider>
  </>
  )
}

export default Application
