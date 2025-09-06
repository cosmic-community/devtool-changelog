import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-900 text-secondary-300 border-t border-secondary-800">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="bg-primary-600 rounded-xl p-3 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">DevTool</h3>
                  <p className="text-sm text-secondary-400 font-medium">Developer Platform</p>
                </div>
              </div>
              <p className="text-secondary-400 max-w-lg leading-relaxed text-base">
                Empowering developers with powerful tools and seamless workflows. 
                Stay updated with our latest features and improvements.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-white font-bold text-lg">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-secondary-400 hover:text-white transition-colors duration-200 text-base">
                    Changelog
                  </Link>
                </li>
                <li>
                  <a 
                    href="https://docs.devtool.com" 
                    className="text-secondary-400 hover:text-white transition-colors duration-200 text-base"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a 
                    href="https://api.devtool.com" 
                    className="text-secondary-400 hover:text-white transition-colors duration-200 text-base"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.devtool.com" 
                    className="text-secondary-400 hover:text-white transition-colors duration-200 text-base"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-6">
              <h4 className="text-white font-bold text-lg">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://github.com/devtool/devtool" 
                    className="text-secondary-400 hover:text-white transition-colors duration-200 text-base"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a 
                    href="https://community.devtool.com" 
                    className="text-secondary-400 hover:text-white transition-colors duration-200 text-base"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a 
                    href="https://devtool.com/blog" 
                    className="text-secondary-400 hover:text-white transition-colors duration-200 text-base"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a 
                    href="https://status.devtool.com" 
                    className="text-secondary-400 hover:text-white transition-colors duration-200 text-base"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Status Page
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-800 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <p className="text-secondary-400 text-base">
              © {currentYear} DevTool. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              <div className="flex items-center space-x-6">
                <a 
                  href="https://devtool.com/privacy" 
                  className="text-secondary-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </a>
                <a 
                  href="https://devtool.com/terms" 
                  className="text-secondary-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Terms of Service
                </a>
              </div>
              <div className="flex items-center space-x-5">
                <a 
                  href="https://twitter.com/devtool" 
                  className="text-secondary-400 hover:text-white transition-colors duration-200 p-2 hover:bg-secondary-800 rounded-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a 
                  href="https://linkedin.com/company/devtool" 
                  className="text-secondary-400 hover:text-white transition-colors duration-200 p-2 hover:bg-secondary-800 rounded-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}