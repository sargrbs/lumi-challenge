import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastNotification } from './presentation/components/toast-notification'
import App from './presentation/components/app'
import { ClerkProvider } from '@clerk/clerk-react'
import './styles/global.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const localization = {
  locale: 'pt-BR',
  socialButtonsBlockButton: 'Continuar com {{provider}}',
  formFieldLabel__emailAddress: 'Endereço de e-mail',
  formFieldLabel__password: 'Senha',
  formFieldAction__forgotPassword: 'Esqueceu a senha?',
  formButtonPrimary: 'Entrar',
  footerActionLink__signUp: 'Criar uma conta',
  signIn: {
    start: {
      title: 'Entre na sua conta',
      subtitle: 'para acessar o Lumi - Challenge',
      actionText: 'Não tem uma conta?',
    },
  },
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/login"
      localization={localization}
    >
      <ToastNotification />
      <App />
    </ClerkProvider>
  </StrictMode>
)
