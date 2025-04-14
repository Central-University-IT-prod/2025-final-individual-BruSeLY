import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import { Notifications } from '@mantine/notifications'
import { DatesProvider } from '@mantine/dates';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';

const theme = createTheme({
  primaryColor: 'violet'
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}> 
      <DatesProvider settings={{ locale: 'ru', firstDayOfWeek: 0, weekendDays: [0], timezone: 'UTC' }}>
        <Notifications position='top-center' limit={3}/>
        <App />
      </DatesProvider>
    </MantineProvider>
  </StrictMode>,
)
