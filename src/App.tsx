import { ErrorBoundary, useErrorHandler } from 'react-error-boundary'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { HTTPError } from 'ky'
import { isApiErrorRes, isHTTPError } from './api/errors'
import ErrorFallback from './ErrorFallback'
import Home from './pages/Home'
import TodosPage from './pages/Todos'
import SearchPage from './pages/Search'

const AppRouter = () => {
  const handleError = useErrorHandler()
  const { enqueueSnackbar } = useSnackbar()
  return (
    <SWRConfig
      value={{
        onError: async (error) => {
          if (error instanceof HTTPError) {
            const res = await error.response.clone()
            const resJson = await res.json()
            if (isApiErrorRes(resJson) && res.status === 400) {
              enqueueSnackbar('BadRequest: ${error.message}', {
                variant: 'error',
              })
              return
            }
          }
          handleError(error)
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </SWRConfig>
  )
}

function App() {
  return (
    <div className="App">
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        autoHideDuration={3000}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AppRouter />
        </ErrorBoundary>
      </SnackbarProvider>
    </div>
  )
}

export default App
