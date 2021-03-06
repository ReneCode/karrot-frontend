const Login = () => import('@/pages/Login')
const LoginTitle = () => import('@/components/Login/LoginTitle')
const VerifyMailTitle = () => import('@/components/Login/VerifyMailTitle')
const PasswordResetTitle = () => import('@/components/Login/PasswordResetTitle')
const Signup = () => import('@/pages/Signup')
const SignupTitle = () => import('@/components/Login/SignupTitle')
const PasswordReset = () => import('@/pages/PasswordReset')
const VerifyMail = () => import('@/pages/VerifyMail')

export default [
  {
    name: 'login',
    path: '/login',
    meta: {
      requireLoggedOut: true,
      breadcrumbs: [
        { translation: 'LOGIN.TITLE', route: { name: 'login' } },
      ],
    },
    components: {
      default: Login,
      header: LoginTitle,
    },
  },
  {
    name: 'passwordreset',
    path: '/passwordreset',
    meta: {
      requireLoggedOut: true,
      breadcrumbs: [
        { translation: 'PASSWORDRESET.TITLE', route: { name: 'passwordreset' } },
      ],
    },
    components: {
      default: PasswordReset,
      header: PasswordResetTitle,
    },
  },
  {
    name: 'verifymail',
    path: '/verify-mail',
    meta: {
      requireLoggedIn: true,
      breadcrumbs: [
        { translation: 'VERIFYMAIL.TITLE', route: { name: 'verifymail' } },
      ],
    },
    components: {
      default: VerifyMail,
      header: VerifyMailTitle,
    },
  },
  {
    name: 'signup',
    path: '/signup',
    meta: {
      requireLoggedOut: true,
      breadcrumbs: [
        { translation: 'SIGNUP.TITLE', route: { name: 'signup' } },
      ],
    },
    components: {
      default: Signup,
      header: SignupTitle,
    },
  },
]
