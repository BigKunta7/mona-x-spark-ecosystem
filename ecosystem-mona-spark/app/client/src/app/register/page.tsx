import AuthForm from '@/components/auth/AuthForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">MONA x SPARK</h1>
          <p className="text-gray-300">Rejoignez l'écosystème créatif</p>
        </div>
        
        <AuthForm mode="register" />
        
        <div className="text-center mt-6">
          <p className="text-gray-300">
            Déjà un compte ?{' '}
            <a href="/login" className="text-purple-400 hover:text-purple-300 transition-colors">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 