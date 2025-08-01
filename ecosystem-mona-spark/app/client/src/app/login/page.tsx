import AuthForm from '@/components/auth/AuthForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">MONA x SPARK</h1>
          <p className="text-gray-300">Connectez-vous à votre compte</p>
        </div>
        
        <AuthForm mode="login" />
        
        <div className="text-center mt-6">
          <p className="text-gray-300">
            Pas encore de compte ?{' '}
            <a href="/register" className="text-purple-400 hover:text-purple-300 transition-colors">
              S'inscrire
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 